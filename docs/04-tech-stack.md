# Technology Stack

**Status:** Draft v1  
**Owner:** Engineering  
**Last Updated:** 2026-07-26

---

## 1. Core Stack

| Layer | Technology | Version | Justification |
|---|---|---|---|
| **Framework** | Next.js | 15.x (App Router) | Market-leading React framework. App Router provides RSC, streaming, middleware, and co-located API routes. Largest ecosystem and talent pool. |
| **Language** | TypeScript | 5.x | Non-negotiable for commercial software. Type safety, developer tooling, and ecosystem dominance. Strict mode enabled. |
| **Package manager** | pnpm | 9.x | Fastest package manager, disk-efficient with content-addressable store, strict dependency isolation. |
| **Database** | PostgreSQL | 16.x | Mature, feature-rich, excellent ecosystem. Neon, Supabase, RDS, and Docker all offer simple Postgres hosting. |
| **ORM** | Drizzle ORM | 0.38.x | SQL-like API, minimal abstraction, fast migrations, excellent TypeScript inference. Lighter than Prisma, more ergonomic than raw SQL. |
| **Authentication** | NextAuth v5 (Auth.js) | 5.x | Battle-tested, 80+ providers, built-in session management, Active maintenance by the community. |
| **Payments** | Stripe | Latest API | Market leader for SaaS payments. Customer Portal eliminates UI work. Webhook infrastructure is best-in-class. |
| **Email** | Resend | Latest API | Modern email API with React Email SDK integration. Simple, reliable, developer-friendly. |
| **UI framework** | Tailwind CSS | 4.x | Utility-first CSS. Consistent design tokens, zero runtime, excellent developer experience. |
| **Component library** | shadcn/ui | Latest | Copy-paste components built on Radix UI. Full customization, no npm dependency, tree-shakeable. |
| **Testing (unit)** | Vitest | 2.x | Fast, Jest-compatible API, native TypeScript support. Better performance and ESM support over Jest. |
| **Testing (E2E)** | Playwright | Latest | Reliable cross-browser testing, excellent CLI and VS Code integration, auto-waiting. |
| **Linting** | ESLint | 9.x | Industry standard. Flat config. |
| **Formatting** | Prettier | 3.x | Consistent code formatting. Zero configuration debates. |
| **Git hooks** | Husky + lint-staged | Latest | Pre-commit linting and formatting. Prevents bad commits. |

## 2. Technology Rationale

### Why Not Prisma?

Prisma is a valid choice and widely used. We chose Drizzle for three reasons:

1. **Performance.** Drizzle's thin layer over SQL means no query engine binary, faster cold starts on serverless, and lower memory usage.
2. **SQL fidelity.** Drizzle's API maps directly to SQL concepts. Developers who know SQL can predict what query Drizzle will generate. Prisma's abstraction layer can produce surprising SQL.
3. **Migration speed.** Drizzle Kit migrations run in milliseconds. Prisma migrations can take minutes on large datasets.

**Trade-off:** Prisma's schema DSL is more readable for non-SQL-experts. Drizzle requires familiarity with SQL patterns. We mitigate this with extensive schema comments and query examples.

### Why Not Supabase?

Supabase is an excellent platform, but bundling our starter with Supabase-specific auth and database features would create vendor lock-in. Buyers deploying to Neon, AWS RDS, or Railway would face unnecessary friction. Our approach: choose database-agnostic tools (Drizzle, NextAuth) that work with any Postgres provider.

### Why NextAuth v5 over Clerk / Auth0?

- **Clerk:** Excellent DX but proprietary lock-in. Buyers cannot fully own their auth infrastructure. Pricing scales with user count, which is unpredictable for a bootstrapped SaaS.
- **Auth0:** Enterprise-grade but complex and expensive for indie founders.
- **NextAuth v5:** Open source, self-hosted, supports 80+ providers. Buyers own their data and infrastructure. The trade-off is more setup effort, which we eliminate by pre-configuring it.

### Why Resend over SendGrid / SES?

- **SendGrid:** High deliverability but dated API, complex setup, frequent API changes.
- **AWS SES:** Cheap but painful setup (domain verification, DKIM, SPF, sandbox mode). Also vendor lock-in.
- **Resend:** Modern API, React Email SDK, generous free tier (100 emails/day), excellent deliverability out of the box.

## 3. Infrastructure Dependencies

| Service | Purpose | Cost at Launch | Buyers Can Replace With |
|---|---|---|---|
| **Neon (Postgres)** | Database | Free tier (0.5 GB) | Any Postgres provider (RDS, Supabase, Railway) |
| **Stripe** | Payments | Free (per-transaction fees) | Paddle, Lemon Squeezy (via adapter) |
| **Resend** | Transactional email | Free tier (100/day) | SendGrid, SES, Postmark |
| **Vercel** | Hosting (recommended) | Hobby tier (free) | Docker, Railway, Fly.io, AWS |

## 4. Dependency Management Policy

- **Pin major versions.** `^` ranges for patch and minor updates. Major versions pinned and upgraded deliberately.
- **Renovate bot.** Automated PRs for dependency updates. Weekly schedule. Group non-breaking updates.
- **Vulnerability scanning.** `npm audit` in CI. Snyk or Socket.dev for deep scanning. Fail build on critical/high severity.
- **Deprecation strategy.** When a dependency deprecates, we issue a migration guide in the changelog and support the old version for one minor release cycle.

## 5. Version Strategy for Third-Party Services

| Service | How We Track Updates |
|---|---|
| Next.js | Major versions: manual upgrade within 3 months of release. Patch: auto-merge via Renovate. |
| Drizzle ORM | Close tracking. Breaking changes are rare but communicated via changelog. |
| NextAuth v5 | Relatively stable. Major bumps require schema and adapter changes — documented in migration guides. |
| Stripe API | Stripe is backward-compatible. We pin the SDK version and upgrade on a quarterly basis. |
| Tailwind CSS | v4 is a major breaking change. We delay v4 adoption until the ecosystem stabilizes. |
| shadcn/ui | Not an npm dependency — buyers reinstall components during upgrades. We document the upgrade path. |

## 6. Rationale for Not Using

| Technology | Why Excluded |
|---|---|
| **Redux / Zustand** | Server Components + React state (URL params, context) cover 95% of state management needs in a SaaS app. Global stores add complexity without proportional benefit. |
| **tRPC** | Adds a significant abstraction layer. API Routes + RSC data fetching provide the same type safety with fewer concepts. Buyers can add tRPC themselves. |
| **GraphQL** | Overkill for a starter kit. REST + RSC cover the data fetching patterns a typical SaaS needs. GraphQL adds schema management, resolver complexity, and caching challenges. |
| **Redis (required)** | Optional for v1. Session caching and rate limiting work with in-memory storage. Redis becomes valuable at scale. We document how to add it. |
| **Docker Compose (required)** | Optional. The app runs with `npm run dev` + local Postgres. Docker Compose is documented as an alternative for buyers who prefer containerized development. |
| **Sentry / Error tracking** | Valuable but opinionated. We document how to add Sentry but don't bundle it. Buyers may prefer Highlight, Rollbar, or LogTail. |
