# Feature Catalog

**Status:** Draft v1  
**Owner:** Product  
**Last Updated:** 2026-07-26

---

## Authentication

### Email / Password Sign-Up
- **Description:** Standard email and password registration with confirmation flow. Passwords hashed with bcrypt. Rate-limited to prevent brute-force attacks.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — every SaaS needs it. Buyers expect this as table stakes.

### OAuth (Google, GitHub)
- **Description:** One-click sign-in via Google and GitHub providers. Account linking when a user signs in with OAuth after registering via email.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — improves conversion rates at sign-up. Most competitors offer this.

### Magic Link / Passwordless
- **Description:** Send a one-time sign-in link via email. No password required. Useful for quick access flows.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — nice-to-have that differentiates from basic starter kits.

### Session Management
- **Description:** Secure HTTP-only cookie sessions with configurable TTL. Session invalidation on password change. Active sessions list with device info and revoke capability.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — security-conscious buyers look for this. Many cheaper starters omit session visibility.

### Multi-Factor Authentication (MFA)
- **Description:** TOTP-based two-factor authentication via authenticator apps. Recovery codes provided on setup.
- **Priority:** P2 (Future)
- **Marketplace Value:** Medium — enterprise buyers will pay more for this. Can justify a higher price tier.

### Forgot / Reset Password
- **Description:** Email-based password reset flow with expiring tokens. Rate-limited by user and IP.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — expected in any auth system.

### Email Verification
- **Description:** Verify email on registration with resend capability. Unverified users have restricted access. Configurable grace period.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — prevents fake sign-ups. Essential for production SaaS.

## Dashboard

### Main Analytics View
- **Description:** Aggregated metrics — MRR, active users, new sign-ups, recent activity feed. Filterable by date range. Data sourced from real API endpoints (not mock data).
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — buyers want to see a real dashboard, not empty shells.

### Organization Switcher
- **Description:** Dropdown to switch between workspaces/orgs the user belongs to. Shows role badge. Seamless context switch without full page reload.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — core differentiator vs. single-tenant starters. Team model is a major selling point.

### Quick Action Bar
- **Description:** Command palette (Cmd+K) for navigation shortcuts, invite members, create projects, etc.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — polish feature that signals quality.

### Onboarding Wizard
- **Description:** First-run experience — collect company name, invite teammates, configure payment method, set preferences. Progress saved per step.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** High — reduces churn for end-customers. Buyers appreciate lower user abandonment.

### Notification Feed
- **Description:** In-app notification center with read/unread state, category filters, and a bell icon in the nav. Real-time via server-sent events or polling fallback.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — expected in modern SaaS. Not a dealbreaker at launch.

### User Profile Page
- **Description:** Edit name, avatar, email. Change password. Manage connected OAuth accounts. Delete account with confirmation.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — basic user self-service reduces support burden.

### Theme Toggle (Dark Mode)
- **Description:** Light/dark/system theme switcher persisted to user preferences. Respects OS-level preference by default.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — expected in 2025+. Cheap to implement but buyers notice its absence.

## Admin

### Admin Dashboard
- **Description:** High-level platform metrics: total users, total orgs, MRR, churn rate, recent sign-ups. Accessible only to users with `admin` role.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** High — buyers running B2B SaaS need visibility into their tenant base.

### User Management
- **Description:** Search, filter, and paginate all platform users. View user details, org memberships, subscription status. Suspend, ban, or delete users. Impersonation capability with audit trail.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** High — essential for support and compliance teams.

### Organization Management
- **Description:** View all orgs, their plan tier, member count, creation date. Suspend or delete orgs. Transfer ownership.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** High — admins need to manage tenants at scale.

### Audit Log
- **Description:** Immutable log of security and admin actions: user creation/deletion, role changes, payment events, login attempts. Filterable by action type, user, date range.
- **Priority:** P2 (Future)
- **Marketplace Value:** Medium — SOC 2 / compliance buyers require this. Niche but high willingness to pay.

### Feature Flag Management
- **Description:** Toggle features per environment or per org. Roll out gradually. Kill switch for problematic features without deploy.
- **Priority:** P2 (Future)
- **Marketplace Value:** Medium — signals maturity. Larger teams will pay more for this.

## Users

### Team Invites
- **Description:** Invite users to an org via email. Invite token with expiration. Resend and revoke capabilities. Role selection at invite time.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — core team feature. Directly enables the collaboration use case.

### Role-Based Access Control (RBAC)
- **Description:** Predefined roles: Owner, Admin, Member, Viewer. Granular permission set per role. Extensible — developers can add custom roles. Enforced at API route and UI level.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — multi-tenant SaaS without RBAC is not sellable to B2B customers.

### Org Member Management
- **Description:** List all org members with roles. Change roles. Remove members. Transfer ownership. Leave org flow.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — buyers need to administer their teams out of the box.

### User Preferences
- **Description:** Per-user settings: locale, timezone, notification preferences (email vs in-app), theme.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — shows attention to user experience detail.

## Billing

### Stripe Checkout Integration
- **Description:** Redirect to Stripe hosted checkout for subscription purchase. Success/cancel URLs handled. Product and price IDs configured via environment variables.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — monetization is the reason buyers build SaaS. Must work flawlessly.

### Subscription Management (Customer Portal)
- **Description:** Stripe Customer Portal for plan changes, payment method updates, invoice history. No need to build UI for subscription management.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — reduces support burden. Buyers expect self-service billing.

### Webhook Handler
- **Description:** Stripe webhook receiver with signature verification. Handles events: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`. Idempotency key support.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — the hardest part of Stripe integration to get right. Massive time-saver for buyers.

### Plan Configuration
- **Description:** Define subscription plans via Stripe dashboard or config file. Plans map to tiers (Free, Pro, Enterprise) with feature access controlled in code. Proration handled by Stripe.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — flexible pricing models increase the kit's addressable market.

### Usage-Based Billing
- **Description:** Track usage metrics (API calls, storage, seats) and report to Stripe for metered billing. Usage dashboard per org.
- **Priority:** P2 (Future)
- **Marketplace Value:** High — unlocks API and platform business models. Can command premium pricing.

### Invoice History
- **Description:** Display past invoices within the app. Link to Stripe-hosted PDFs. Sync status from Stripe webhooks.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — expected but can be deferred post-launch.

### Trial Management
- **Description:** Free trial period configurable per plan. Starts on registration or on plan selection. Trial end warning emails. Auto-convert or lock on expiry.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — important for conversion optimization.

## Notifications

### Email Notification Templates
- **Description:** Transactional emails: welcome, email verification, password reset, invite, payment failure, trial ending. Built with React Email for easy customization. Sent via Resend.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — buyers would otherwise spend days setting up email templates.

### In-App Notifications
- **Description:** Notification center with bell icon. Read / unread state. Click to navigate to relevant context. Mark all as read.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — reduces email fatigue for end users.

### Notification Preferences
- **Description:** Per-user opt-in/out for each notification category (billing, invites, product updates). Channel preference (email, in-app).
- **Priority:** P2 (Future)
- **Marketplace Value:** Low-Medium — nice-to-have. Important for compliance (GDPR marketing consent).

## Developer Experience

### One-Command Setup
- **Description:** `npx create-saas-app my-project` or `git clone` + `npm install` + `npm run dev`. Automated environment setup with `drizzle-kit push` for DB schema.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — first impression matters. A frictionless setup is the #1 review driver on marketplaces.

### Environment Configuration
- **Description:** Single `.env.example` with all required variables documented. Runtime validation on startup. Clear error messages for missing config.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — reduces support tickets. Buyers hate hunting for config values.

### Seed Data Scripts
- **Description:** `npm run seed` creates demo org, admin user, sample data. Buyer can evaluate the product immediately without manual setup.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — demo-ability drives purchases on Codester. Screenshots alone don't sell.

### TypeScript Everywhere
- **Description:** Full type coverage. Shared types between frontend and backend. Strict mode enabled. No `any` types in critical paths.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — signals quality. TypeScript adoption is near-universal for professional Next.js development.

### ESLint + Prettier Config
- **Description:** Pre-configured linting and formatting. Consistent code style out of the box. Husky pre-commit hooks for lint-staged.
- **Priority:** P0 (Launch)
- **Marketplace Value:** Medium — expected in any professional starter. Buyers notice when it's absent.

### Testing Setup
- **Description:** Vitest for unit tests, Playwright for E2E tests. Example tests for auth flow and billing webhook. `npm run test` ready.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — serious buyers look for this. Many cheaper starters skip testing.

### Commit Convention (Conventional Commits)
- **Description:** Repository follows conventional commits. Changelog auto-generated. Clear git history for buyers to understand changes.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Low — internal quality metric. Positive signal during code review.

### Docker Compose for Local Dev
- **Description:** `docker-compose.yml` with Postgres, Redis (if needed), and app service. One command to spin up full stack.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — valued by developers who prefer containerized development.

## Deployment

### Vercel Deployment Guide
- **Description:** Step-by-step guide — connect repo, set env vars, configure Postgres (Neon/Supabase), deploy. One-click deploy button in README.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — most buyers deploy to Vercel. Must be trivial.

### Docker Deployment Guide
- **Description:** Multi-stage Dockerfile for production. Docker Compose for production stack (app + DB + proxy). Deploy to any VPS or cloud provider.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — expands addressable market beyond Vercel users.

### Environment Variable Checklist
- **Description:** Complete list of all env vars, their purpose, where to get them (Stripe dashboard, Resend, GitHub OAuth app, etc.), and example values.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — reduces setup time and support requests.

### Database Migration Workflow
- **Description:** Drizzle Kit migration pipeline. `npm run db:generate`, `npm run db:migrate`, `npm run db:push`. Documented rollback procedure.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — schema changes are inevitable. Buyers need a safe, documented migration path.

## API

### RESTful API Routes
- **Description:** Next.js App Router API handlers for all resources. Consistent error response format (`{ error: string, code: string }`). Proper HTTP status codes.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — buyers extend the API immediately. Good patterns teach correct Next.js API design.

### API Key Authentication
- **Description:** Generate and revoke API keys per user or per org. Rate-limit by key. Keys stored hashed. Scoped to specific permissions.
- **Priority:** P2 (Future)
- **Marketplace Value:** High — unlocks headless/integration use cases. Premium feature.

### Rate Limiting
- **Description:** Per-user/IP rate limiting on API routes with configurable thresholds. Returns `429 Too Many Requests` with `Retry-After` header.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** High — production necessity. Prevents abuse and runaway costs.

### Webhook Receiver (Extensible)
- **Description:** Generic webhook endpoint for third-party integrations. Signature verification pattern reusable for any provider (not just Stripe).
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — buyers building integrations need this pattern documented.

### API Documentation (OpenAPI)
- **Description:** OpenAPI/Swagger spec for public API routes. Interactive playground via Swagger UI or Scalar.
- **Priority:** P2 (Future)
- **Marketplace Value:** Medium — signals API-first design. Buyers reselling API access require this.

## Documentation

### README
- **Description:** Project overview, quick start, prerequisites, environment setup, deployment guide, tech stack summary, license information. Badges for build status, license, etc.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — first page a buyer sees on GitHub/Codester. Must be polished and comprehensive.

### Architecture Overview
- **Description:** High-level architecture diagram (ASCII or Mermaid), data flow description, folder structure explanation, decision records for major technology choices.
- **Priority:** P0 (Launch)
- **Marketplace Value:** Medium — serious buyers read this before purchase. Signals engineering quality.

### Setup Guide
- **Description:** Detailed instructions from clone to running app. Includes prereqs (Node, pnpm, Postgres), Stripe product/price setup, OAuth app creation, Resend API key setup.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — directly impacts time-to-first-value. Most common source of buyer frustration.

### Deployment Guide
- **Description:** Separate guides for Vercel and Docker deployment. Environment variable reference. Post-deployment verification steps.
- **Priority:** P0 (Launch)
- **Marketplace Value:** High — buyers need to go live. A missing deployment guide kills sales.

### Customization Guide
- **Description:** How to rebrand (colors, logo, favicon, fonts), add new pages, modify auth flows, add custom roles. Common customization scenarios with before/after code.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — enables buyers to make the product their own. Reduces support requests.

### FAQ / Troubleshooting
- **Description:** Common issues, error messages, and their solutions. Community-contributed fixes curated by maintainers.
- **Priority:** P1 (Post-launch)
- **Marketplace Value:** Medium — reduces support burden. Buyers appreciate self-service help.

### Change Log
- **Description:** Version history with semantic versioning. Breaking changes clearly marked. Migration guides between major versions.
- **Priority:** P0 (Launch)
- **Marketplace Value:** Medium — signals active maintenance. Buyers trust products with documented history.

## Future Features

### SSO / SAML
- **Description:** Enterprise single sign-on via SAML or OIDC. Supports Okta, Azure AD, Google Workspace. Org-level SSO enforcement.
- **Priority:** P2 (Future)
- **Marketplace Value:** High — unlocks enterprise deals. Can be an upsell tier.

### Custom Domains per Workspace
- **Description:** Map custom domain to org workspace. SSL certificate provisioning via Let's Encrypt. Domain verification flow.
- **Priority:** P2 (Future)
- **Marketplace Value:** High — common B2B requirement. Enables white-label positioning.

### Multi-Region / Data Residency
- **Description:** Deploy to multiple regions with data locality. Database per region. User routed to nearest region.
- **Priority:** P2 (Future)
- **Marketplace Value:** Medium — compliance-driven (GDPR, LGPD, etc.). Niche but high willingness to pay.

### Mobile SDK / API Client
- **Description:** Auto-generated TypeScript client for the API. React Native hooks for common operations.
- **Priority:** P2 (Future)
- **Marketplace Value:** Low-Medium — broadens use cases but significant investment.

### Automated E2E Test Suite
- **Description:** Comprehensive Playwright tests covering auth flows, billing cycles, team management, admin actions. CI pipeline integration.
- **Priority:** P2 (Future)
- **Marketplace Value:** Medium — de-risks upgrades for buyers. Few competitors ship serious test suites.

### Admin Impersonation
- **Description:** Admin can log in as any user for support purposes. Full audit trail. Session isolation. View-only mode option.
- **Priority:** P2 (Future)
- **Marketplace Value:** Medium — critical for customer support teams.

### Export / Import (Data Portability)
- **Description:** Org data export (CSV/JSON). Bulk user import via CSV. GDPR data export request handler.
- **Priority:** P2 (Future)
- **Marketplace Value:** Medium — compliance and user convenience feature.

---

## Feature Priority Summary

| Tier | Count | Characteristics |
|---|---|---|
| **P0 (Launch)** | ~25 | Essential for a sellable v1. Missing any = bad reviews. |
| **P1 (Post-launch)** | ~15 | Important for retention and polish. Adds in first 3 months. |
| **P2 (Future)** | ~10 | Unlocks enterprise/high-tier pricing. Roadmap items. |
