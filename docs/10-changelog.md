# Changelog

**Status:** Active  
**Owner:** Engineering  
**Last Updated:** 2026-07-26

All notable changes to the Next.js SaaS Starter are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Version format:** `YYYY.MINOR.PATCH` (e.g., `2026.1.0`)

- `YYYY` — Year of release (calendar-based)
- `MINOR` — Feature release (incremented every 4-6 weeks)
- `PATCH` — Bug fix / security release (incremented as needed)

---

## [2026.1.0] — Unreleased

**Planned launch — Q4 2026**

### Added

- **Authentication**
  - Email/password registration and login
  - Google OAuth sign-in
  - GitHub OAuth sign-in
  - Forgot/reset password flow with email
  - Email verification with resend capability
  - Session management with HTTP-only cookies
  - Rate-limited login (brute-force protection)

- **Organizations & Teams**
  - Organization creation and CRUD
  - Organization switcher in global navigation
  - Team invite system (email-based, expiring tokens)
  - Role-based access control (Owner, Admin, Member, Viewer)
  - Member management (add, remove, change roles)
  - Leave organization flow

- **Billing (Stripe)**
  - Stripe Checkout session creation
  - Stripe Customer Portal integration
  - Webhook handler with signature verification
  - Webhook idempotency (duplicate event protection)
  - Subscription status sync in local database
  - Plan configuration via environment variables
  - Subscription management page (view current plan, change plan, cancel)
  - Plan upgrade/downgrade with proration

- **Dashboard & UI**
  - Landing page with hero, features, pricing sections
  - Dashboard shell with responsive sidebar navigation
  - Main analytics view (MRR, active users, new sign-ups)
  - User profile page (edit name, email, avatar, password)
  - Organization settings page
  - Team settings page
  - Billing settings page
  - Responsive design (mobile, tablet, desktop)

- **Developer Experience**
  - One-command local setup (`npm install && npm run dev`)
  - Environment configuration with runtime validation
  - Seed data script (demo organization + admin user)
  - Full TypeScript coverage with strict mode
  - ESLint + Prettier configuration
  - Drizzle ORM with typed schema definitions
  - Database migration workflow (generate, migrate, push)
  - `.env.example` with all variables documented

- **Documentation**
  - Comprehensive README with badges
  - Architecture overview with diagrams
  - Setup guide (from clone to running app)
  - Vercel deployment guide
  - Environment variable reference
  - FAQ / troubleshooting guide
  - Changelog

- **Marketplace**
  - Codester listing with screenshots and demo video
  - Standard, Extended, and Enterprise license files
  - Live demo environment

### Changed

- N/A — initial release.

### Fixed

- N/A — initial release.

### Security

- Password hashing with bcrypt (cost factor 12)
- CSRF protection via Next.js built-in mechanisms
- HTTP-only, secure, same-site cookies
- Stripe webhook signature verification
- Rate limiting on auth routes
- SQL injection protection via Drizzle parameterized queries
- No secrets in source code — all via environment variables

---

## [2026.2.0] — Planned (Q1 2027)

### Added

- Admin dashboard with platform-wide metrics
- User management (list, search, filter, suspend, delete)
- Organization management (list, view details, suspend)
- Email notification templates (React Email)
- Welcome email
- Password reset email
- Team invite email
- Payment failure notification
- Trial ending notification
- Dark mode toggle (light/dark/system)
- Onboarding wizard (first-run experience)
- Docker Compose for local development
- Invoice history page
- Trial management (configurable trial period, end warnings, auto-convert)
- Unit tests for auth and billing services (Vitest)
- E2E tests for auth and billing flows (Playwright)
- Docker deployment guide
- Customization guide (rebranding, adding pages, modifying auth)
- Conventional commits configuration

---

## [2026.3.0] — Planned (Q2 2027)

### Added

- Rate limiting on all public API routes
- Consistent error response format across all API endpoints
- Extensible webhook receiver pattern (non-Stripe integrations)
- OpenAPI/Swagger specification for public API routes
- Audit logging for admin and security actions
- Active session management page (view and revoke sessions)
- Content-Security-Policy headers
- Usage-based billing foundation (metered tracking)
- Comprehensive unit test suite (80%+ coverage target)
- CI pipeline with GitHub Actions

---

## [2027.1.0] — Planned (Q3-Q4 2027)

### Added

- SSO/SAML authentication (Okta, Azure AD, Google Workspace)
- Custom domains per workspace with SSL
- Multi-region deployment guide with data residency
- Admin impersonation with audit trail
- API key management (generate, revoke, scope)
- Feature flags per environment and per organization
- Data export (CSV, JSON) for GDPR compliance
- Bulk user import via CSV
- Automated E2E test suite running in CI
- Multi-stage Dockerfile for production
- Performance benchmarking guide

---

## Security Patches

| Date | Version | CVE | Description                       |
| ---- | ------- | --- | --------------------------------- |
| —    | —       | —   | No security patches released yet. |

---

## Maintenance Policy

- **Patch releases** (e.g., `2026.1.1`): Bug fixes and security updates. No breaking changes. Released within 48 hours for critical issues.
- **Minor releases** (e.g., `2026.2.0`): New features and improvements. May include small breaking changes, documented in the release notes. Released every 4-6 weeks.
- **Major releases** (e.g., `2027.1.0`): Large feature sets and framework upgrades. May include significant breaking changes. Migration guide provided. Released approximately annually.

### Backward Compatibility

- Minor and patch releases maintain backward compatibility with the previous minor version.
- Breaking changes are announced at least one minor release in advance.
- Deprecated features continue to work for one full minor release cycle before removal.

### Update Entitlement

- Purchasers receive all updates (major, minor, patch) for 12 months from purchase date.
- After 12 months, purchasers can buy a 12-month extension at 50% of current tier price.
- Security patches for critical CVEs are backported one major version for 6 months.
