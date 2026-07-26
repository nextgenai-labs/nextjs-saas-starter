# Architecture

**Status:** Draft v1  
**Owner:** Engineering  
**Last Updated:** 2026-07-26

---

## 1. High-Level Architecture

The system follows a **monolithic Next.js App Router** architecture with logical separation of concerns. All code lives in a single deployable unit, which is the correct choice for a starter kit targeting small teams and indie founders. Microservices would add deployment and operational complexity that buyers of a starter kit explicitly want to avoid.

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                           │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTPS
                         ▼
┌──────────────────────────────────────────────────────────┐
│                    Vercel / Docker                        │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Next.js App Router                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │  │
│  │  │  Pages   │  │  API     │  │  Middleware     │  │  │
│  │  │ (RSC)    │  │  Routes  │  │  (Auth, Log)   │  │  │
│  │  └──────────┘  └──────────┘  └────────────────┘  │  │
│  └────────────────────────────────────────────────────┘  │
│                           │                               │
└───────────────────────────┼───────────────────────────────┘
                            │
          ┌─────────────────┼──────────────────┐
          ▼                 ▼                   ▼
┌─────────────────┐ ┌──────────────┐ ┌──────────────────┐
│   PostgreSQL    │ │    Redis     │ │   Stripe API     │
│  (Neon / RDS)   │ │ (optional)   │ │                  │
│                 │ │              │ │                  │
│  - Users        │ │  - Sessions  │ │  - Checkout      │
│  - Orgs         │ │  - Rate      │ │  - Subscriptions │
│  - Memberships  │ │    Limits    │ │  - Webhooks      │
│  - Subscriptions│ │  - Cache     │ │  - Customer Port.│
│                 │ │              │ │                  │
└─────────────────┘ └──────────────┘ └──────────────────┘
                                              │
                                              ▼
                                     ┌──────────────────┐
                                     │  Resend API      │
                                     │  (Email)         │
                                     └──────────────────┘
```

**Rationale for monolithic Next.js:**

- Single deployable artifact — maximum simplicity for buyers
- Server Components eliminate the need for a separate BFF layer
- API routes co-located with pages for cohesive feature organization
- Buyers can split into separate services later if needed; the module boundaries support this

## 2. Multi-Tenancy Model

We use a **shared database with row-level tenant isolation**. This is the pragmatic choice for a starter kit: dedicated databases per tenant add operational overhead without proportional benefit at the scale our buyers will operate at.

### Entity Hierarchy

```
Platform (root)
   └── Organization (tenant boundary)
          ├── Memberships (user + role)
          ├── Subscription (Stripe)
          ├── Projects (optional buyer extension)
          └── Settings
```

### Tenant Isolation Strategy

- Every resource table has an `organization_id` foreign key
- All queries are scoped via middleware that extracts org context from the session
- A reusable `withOrg` query wrapper prevents accidental cross-org data leaks
- RBAC enforced at both the API route level and the UI component level

### Why Not Postgres Row-Level Security (RLS)?

RLS via Supabase or raw Postgres is a valid alternative, but we chose application-level enforcement because:

1. **Portability.** RLS ties you to Postgres. If a buyer wants MySQL or SQLite for testing, RLS doesn't travel.
2. **Debuggability.** Application-level scoping is visible in code. RLS failures produce opaque errors.
3. **Familiarity.** Every Next.js developer understands middleware + query scoping. RLS is an additional concept to learn.

## 3. Application Layers

### 3.1 Presentation Layer (Pages)

- React Server Components for data-fetching pages (dashboard, settings)
- Client Components for interactive elements (forms, dropdowns, toggles)
- `layout.tsx` for persistent UI shell (sidebar, header)
- Loading states via `loading.tsx` and error boundaries via `error.tsx`

**Key pattern:** Pages fetch data in Server Components and pass props down. Client Components are leaves in the component tree, not orchestrators.

### 3.2 API Layer (Routes)

- All API routes under `app/api/`
- Consistent response envelope: `{ data?: T, error?: { message: string, code: string } }`
- Status codes: 200/201 for success, 400 for validation, 401 for unauthenticated, 403 for unauthorized, 404 for not found, 429 for rate-limited, 500 for server errors
- Middleware handles: session check, org context injection, rate limiting (P1)

### 3.3 Service Layer

- Business logic extracted into `lib/services/`
- Services are plain TypeScript modules — no classes, no DI containers
- Each service accepts a database transaction handle for composability
- Example boundary: `createCheckoutSession` in billing service coordinates Stripe API + DB subscription record creation

### 3.4 Data Access Layer

- Drizzle ORM with typed schema definitions
- Repository-style helpers for common queries (e.g., `getOrgMembers`, `findUserByEmail`)
- Raw SQL via Drizzle's `sql` template tag for complex reporting queries
- Migrations managed via Drizzle Kit — generate, migrate, push workflows

## 4. Authentication Flow

```
Request ──► Middleware ──► Session Check
                │
         ┌──────┴──────┐
         ▼              ▼
    Authenticated    Unauthenticated
         │                 │
         ▼                 ▼
    Extract User      Redirect to
    & Org Context     /auth/login
         │
         ▼
    Route Handler
```

- **Session storage:** Database sessions (default) with Redis adapter available as optional upgrade
- **Token format:** JWT for API routes, opaque session cookie for pages
- **NextAuth v5** handles the OAuth dance, credential validation, and session lifecycle
- **Middleware** runs on every request, attaches `userId` and `orgId` to request headers for downstream use

## 5. Billing Flow

```
User clicks "Upgrade" ──► Create Stripe Checkout Session
         │                         │
         ▼                         ▼
Save pending_subscription    Redirect to Stripe
record in DB                     │
                                 ▼
                         Customer completes payment
                                 │
                                 ▼
                    Stripe sends webhook to /api/webhooks/stripe
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
          Verify Signature  Idempotency   Update DB
                             Check       Subscription
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
               Send email   Update user    Redirect user
               (Resend)     metadata       to dashboard
```

- Webhook handler is **idempotent** — Stripe events can arrive multiple times
- **Signature verification** is mandatory; no request without a valid Stripe signature is processed
- **Async processing** — webhooks are handled inline (no queue for v1). A job queue (Bull/PgBoss) can be added by buyers for high-volume scenarios
- **Subscription status** is mirrored in the local DB for fast reads and offline capability

## 6. Key Architectural Decisions (ADRs)

### ADR-001: Drizzle ORM over Prisma

- **Decision:** Use Drizzle ORM
- **Rationale:** Lighter bundle, SQL-like syntax closer to the metal, faster migration pipeline. Prisma's abstraction layer and slower migration speed add friction for experienced SQL developers.
- **Trade-off:** Drizzle has a smaller community and fewer learning resources. Buyers unfamiliar with SQL may prefer Prisma's schema DSL.
- **Mitigation:** Drizzle's API closely mirrors SQL, so the learning curve is shallow for experienced developers. We provide extensive comments and examples.

### ADR-002: NextAuth v5 over Custom Auth

- **Decision:** Use NextAuth v5 (Auth.js)
- **Rationale:** Battle-tested, supports 80+ providers, built-in session management, active maintenance. Building custom auth is the #1 source of security vulnerabilities.
- **Trade-off:** NextAuth is opinionated about database schema and session strategy. Custom flows (e.g., org-level SSO) require adapter-level work.
- **Mitigation:** We wrap NextAuth in our own service layer so that swapping the auth provider later does not cascade through the codebase.

### ADR-003: Stripe for Payments

- **Decision:** Use Stripe as the sole payment processor
- **Rationale:** Market leader, excellent API and docs, built-in customer portal (reduces UI work), webhook infrastructure, global availability.
- **Trade-off:** Stripe's fees (2.9% + $0.30) are higher than some alternatives. Stripe is not available in all countries (e.g., some Middle East and African markets).
- **Mitigation:** We abstract payment operations behind a `paymentService` interface. A motivated buyer can implement a Lemon Squeezy or Paddle adapter with localized effort.

### ADR-004: Server Components by Default

- **Decision:** Use React Server Components for all data-fetching pages
- **Rationale:** Smaller client bundles, direct database access without API route indirection, automatic streaming.
- **Trade-off:** Server Components cannot use hooks or browser APIs. Interactive pieces must be extracted into Client Components.
- **Mitigation:** We establish a clear pattern: Server Components fetch and render, Client Components handle interaction. This is documented in the customization guide.

### ADR-005: Shared Database, Row-Level Tenant Isolation

- **Decision:** Single PostgreSQL database with `organization_id` scoping
- **Rationale:** Simplest operational model for a starter kit. Dedicated databases per tenant add cost and complexity without proportional benefit at the target scale (10-10,000 users).
- **Trade-off:** A noisy-neighbor tenant can impact database performance for others. Harder to offer data residency guarantees per tenant.
- **Mitigation:** We document the migration path to dedicated databases for buyers who outgrow shared-DB architecture.

## 7. Folder Structure

```
src/
├── app/                    # Next.js App Router pages and API routes
│   ├── (auth)/             # Auth pages (login, register, reset-password)
│   ├── (dashboard)/        # Dashboad layout and pages
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── billing/
│   ├── (admin)/            # Admin panel (P1)
│   ├── api/                # API routes
│   │   ├── auth/           # Auth endpoints
│   │   ├── billing/        # Stripe checkout, portal, webhooks
│   │   └── members/        # Team management
│   └── layout.tsx
├── components/             # Shared React components
│   ├── ui/                 # shadcn/ui primitives
│   ├── forms/              # Form components
│   └── layout/             # Sidebar, header, nav
├── lib/                    # Business logic and utilities
│   ├── auth/               # NextAuth config, adapters, helpers
│   ├── billing/            # Stripe client, webhook handlers, plan config
│   ├── db/                 # Drizzle schema, queries, migrations
│   ├── email/              # React Email templates (P1)
│   └── utils/              # Shared utilities (rate limit, validation, etc.)
├── hooks/                  # Shared React hooks
├── types/                  # Shared TypeScript types
├── styles/                 # Global CSS, Tailwind config
└── middleware.ts           # Next.js middleware (auth, org context, rate limit)
```

## 8. Security Architecture

| Layer | Mechanism |
|---|---|
| **Transport** | HTTPS enforced; HSTS headers |
| **Authentication** | NextAuth with database sessions; rate-limited login; account lockout after N failures |
| **Authorization** | RBAC enforced at API route level via `authorize(role)` helper; UI-level via `can()` component |
| **Input validation** | Zod schemas on all API inputs; type coercion rejected |
| **CSRF** | Next.js built-in CSRF protection via server actions; double-submit cookie pattern for API routes |
| **XSS** | React JSX escaping; Content-Security-Policy headers; no `dangerouslySetInnerHTML` |
| **SQL injection** | Parameterized queries via Drizzle; no raw string interpolation in SQL |
| **Rate limiting** | Upstash Ratelimit or in-memory (dev); configurable per-route thresholds |
| **Webhook security** | Stripe signature verification; payload size limits; IP allowlist optional |
| **Session management** | HTTP-only cookies; configurable TTL; forced re-auth on sensitive actions |
| **Secrets** | All secrets via environment variables; `.env.example` with no real values; documented sources |
| **Dependencies** | Renovate/Dependabot for automated updates; weekly review cycle; Snyk or similar for vulnerability scanning |

## 9. Performance Considerations

- **Database connection pooling:** Use connection pooling (PgBouncer via Neon, or pg-pool) for production. Single connection per request is a common pitfall.
- **Caching strategy:** In-memory cache for plan definitions and static content. Redis for session caching and rate limit counters. Consider SWR/React Cache for expensive queries.
- **Image optimization:** Next.js Image component with remote pattern allowlist. Use a CDN for user-uploaded content.
- **Bundle size:** Server Components reduce client bundle. Client Components use dynamic import with `next/dynamic` for heavy dependencies.
- **Edge functions:** Middleware runs on Edge Runtime for low-latency auth checks. Heavy computation stays on Node.js runtime.
