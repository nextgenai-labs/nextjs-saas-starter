# Product Roadmap

**Status:** Draft v1  
**Owner:** Product  
**Last Updated:** 2026-07-26

---

## 1. Release Philosophy

We follow **calendar-based versioning** (YYYY.MINOR.PATCH) with semantic versioning for the code itself. Major releases align with Next.js major versions. Minor releases ship features. Patches fix bugs.

**Cadence:**

- Patch releases: as needed (security fixes within 48 hours)
- Minor releases: every 4-6 weeks
- Major releases: approximately annually (tied to Next.js majors)

**Support policy:** Purchasers receive all updates for 12 months from purchase date. After 12 months, they can renew at 50% of the current purchase price to receive another 12 months of updates.

---

## 2. v1.0 — Launch (Q4 2026)

**Theme:** Ship a complete, sellable product.

### Authentication

- [ ] Email / password registration and login
- [ ] OAuth (Google, GitHub)
- [ ] Forgot / reset password flow
- [ ] Email verification
- [ ] Session management with refresh tokens
- [ ] Rate-limited login (brute force protection)

### Organizations & Teams

- [ ] Organization creation and switching
- [ ] Team invites (email-based, token)
- [ ] Role-based access control (Owner, Admin, Member, Viewer)
- [ ] Member management (add, remove, change role)
- [ ] Organization switcher in navigation

### Billing

- [ ] Stripe Checkout session creation
- [ ] Stripe Customer Portal integration
- [ ] Webhook handler with signature verification and idempotency
- [ ] Plan configuration via environment variables
- [ ] Subscription status sync in local database
- [ ] Subscription management page (view plan, change, cancel)

### Dashboard & UI

- [ ] Landing page (marketing site)
- [ ] Dashboard shell with sidebar navigation
- [ ] Main analytics view (MRR, users, sign-ups)
- [ ] User profile page (edit name, email, avatar, password)
- [ ] Settings pages (org settings, billing)
- [ ] Responsive layout (mobile, tablet, desktop)

### Developer Experience

- [ ] One-command setup (`npm install && npm run dev`)
- [ ] Environment configuration with validation
- [ ] Seed data script (demo org + admin user)
- [ ] Full TypeScript coverage with strict mode
- [ ] ESLint + Prettier configuration
- [ ] Database migration workflow (generate, migrate, push)
- [ ] `.env.example` with all variables documented

### Documentation

- [ ] Comprehensive README
- [ ] Architecture overview
- [ ] Setup guide (from clone to running app)
- [ ] Deployment guide (Vercel)
- [ ] Environment variable reference
- [ ] FAQ / troubleshooting

### Marketplace Packaging

- [ ] Screenshots (dashboard, billing, settings, mobile)
- [ ] Demo video (2-3 minutes)
- [ ] Codester listing copy
- [ ] License files (Standard + Extended)

---

## 3. v1.1 — Polish & Admin (Q1 2027)

**Theme:** Add the admin layer and polish rough edges.

### Admin Panel

- [ ] Admin dashboard with platform metrics
- [ ] User management (list, search, suspend, delete)
- [ ] Organization management (list, view, suspend)
- [ ] Admin role enforcement

### Email Notifications

- [ ] Welcome email template
- [ ] Password reset email template
- [ ] Invite email template
- [ ] Payment failure email template
- [ ] Trial ending email template
- [ ] Built with React Email, sent via Resend

### Developer Experience

- [ ] Docker Compose for local development
- [ ] Unit tests for auth and billing services (Vitest)
- [ ] E2E tests for auth and billing flows (Playwright)
- [ ] Testing documentation and examples
- [ ] Conventional commits setup

### Billing Enhancements

- [ ] Invoice history page
- [ ] Trial management (start, end warnings, auto-convert)
- [ ] Plan upgrade/downgrade handling with proration

### UI Enhancements

- [ ] Dark mode toggle
- [ ] Theme persisted to user preferences
- [ ] Onboarding wizard (first-run flow)
- [ ] In-app notification feed (bell icon)

### Documentation

- [ ] Docker deployment guide
- [ ] Customization guide (rebranding, adding pages, modifying auth)
- [ ] Expanded troubleshooting

---

## 4. v1.2 — API & Production Hardening (Q2 2027)

**Theme:** Make the kit ready for API-first and high-traffic scenarios.

### API

- [ ] Rate limiting on all API routes (Upstash or in-memory)
- [ ] Consistent error response format across all endpoints
- [ ] Extensible webhook receiver pattern (for non-Stripe integrations)
- [ ] API documentation (OpenAPI spec)

### Security

- [ ] Audit logging for admin actions
- [ ] Session management page (active sessions, revoke)
- [ ] Content-Security-Policy headers

### Billing

- [ ] Usage-based billing foundation (track and report to Stripe)
- [ ] Add-on / metered pricing support

### Testing

- [ ] Comprehensive unit test suite (80%+ coverage on services)
- [ ] E2E tests for team management flows
- [ ] CI pipeline (GitHub Actions)

---

## 5. v2.0 — Enterprise (Q3-Q4 2027)

**Theme:** Unlock enterprise buyers with SSO, custom domains, and data portability.

### Enterprise Features

- [ ] SSO / SAML (Okta, Azure AD, Google Workspace)
- [ ] Custom domains per workspace
- [ ] Multi-region / data residency documentation
- [ ] Admin impersonation with audit trail
- [ ] API key management (generate, revoke, scope)
- [ ] Feature flags per environment and per org

### Platform

- [ ] Data export (CSV, JSON) for GDPR compliance
- [ ] Bulk user import via CSV
- [ ] Automated E2E test suite in CI
- [ ] Performance benchmarking guide

### Infrastructure

- [ ] Multi-stage Dockerfile for production
- [ ] Docker Compose for production stack
- [ ] Terraform / Pulumi deployment examples (optional)

---

## 6. v2.x — Ecosystem & Scale (2028+)

**Theme:** Expand the ecosystem and support larger deployments.

- [ ] React Native SDK / API client
- [ ] Webhook integration marketplace (Slack, Discord, etc.)
- [ ] White-label reseller mode (multi-tenant admin per reseller)
- [ ] GraphQL plugin (via Pothos or similar)
- [ ] One-click deploy to Railway / Fly.io / AWS
- [ ] Performance optimization guide for 100k+ users
- [ ] Translation / i18n framework integration

---

## 7. Maintenance & Long-Term Support

| Release       | Status  | Support Ends                 |
| ------------- | ------- | ---------------------------- |
| v1.0 (Launch) | Planned | 12 months after purchase     |
| v1.1          | Planned | 12 months after v1.1 release |
| v1.2          | Planned | 12 months after v1.2 release |
| v2.0          | Future  | 12 months after v2.0 release |

**Security patches:** Backported to the previous major version for 6 months after a new major release. Critical CVEs patched within 48 hours.

**Breaking changes:** Announced at least one minor release in advance. Migration guide provided. Major versions may require database migration or code changes.

---

## 8. What We Will NOT Build

- **No mobile apps.** This is a web-first responsive kit. No React Native, no Swift/Kotlin SDKs.
- **No no-code builder.** Buyers must know TypeScript.
- **No dedicated SaaS operation.** We sell source code, not a hosted service. No SLA, no uptime guarantees, no support tickets.
- **No custom development.** Buyers who need white-glove setup are outside our target market.
