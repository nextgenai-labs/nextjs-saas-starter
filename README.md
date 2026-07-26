# Next.js SaaS Starter

**Auth · Teams · Billing · Admin — Production-ready, full source code included.**

Build and launch your subscription SaaS in days, not months. This starter kit eliminates the undifferentiated heavy lifting so you can focus on what makes your product unique.

---

## What You Get

- **Authentication** — Email/password, Google, GitHub. Session management, email verification, password reset. Built with NextAuth v5.
- **Multi-Tenant Teams** — Organizations, workspace switching, role-based access control (Owner, Admin, Member, Viewer), team invites.
- **Stripe Billing** — Checkout, Customer Portal, webhooks with signature verification and idempotency. Plans, upgrades, downgrades, cancellations, proration.
- **Dashboard & Settings** — Analytics view, user profile, org settings, billing management. Responsive design (mobile, tablet, desktop).
- **Admin Panel** (v1.1) — Platform-wide user and organization management.
- **Dark Mode** (v1.1) — Light/dark/system theme toggle.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Auth | NextAuth v5 (Auth.js) |
| Payments | Stripe |
| Email | Resend |
| UI | Tailwind CSS 4 + shadcn/ui |
| Testing | Vitest + Playwright |
| Package manager | pnpm |

## Quick Start

```bash
git clone <your-repo-url>
cd nextjs-saas-starter
cp .env.example .env.local
pnpm install
pnpm run db:push
pnpm run seed
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with the seeded admin account (credentials in `.env.example`).

## Screenshots

| Dashboard | Billing | Team Management |
|---|---|---|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

## Documentation

| Document | Description |
|---|---|
| [Product Overview](docs/01-product.md) | Vision, target customers, competitive analysis |
| [Feature Catalog](docs/02-features.md) | Complete feature list with priorities |
| [Architecture](docs/03-architecture.md) | System design, data flow, ADRs |
| [Tech Stack](docs/04-tech-stack.md) | Technology choices and rationale |
| [Roadmap](docs/05-roadmap.md) | Release plan and future features |
| [Setup Guide](docs/06-setup.md) | From clone to production deployment |
| [Deployment Guide](docs/07-deployment.md) | Vercel and Docker deployment |

*Full documentation is included with the purchase.*

## Who Is This For?

- **Indie founders** building a paid SaaS product solo
- **Small agencies** building client SaaS on a reliable foundation
- **Full-stack developers** who want production patterns without the boilerplate
- **Startup CTOs** who need to ship an MVP fast

## License

This is a commercial product, not open-source software. Licenses are available at three tiers:

| License | Price | Best For |
|---|---|---|
| Standard | $59 | Single developer, unlimited projects |
| Extended | $149 | Up to 5 developers, unlimited projects |
| Enterprise | $499 | Unlimited developers, white-label rights |

All purchases include 12 months of updates and support.

**[Purchase on Codester →]**(https://codester.com)

## Support

- Documentation included with purchase
- GitHub Issues for bug reports and feature requests
- Email support for Enterprise license holders
- Response time: within 48 hours (business days)

## Changelog

See [CHANGELOG.md](docs/10-changelog.md) for the full version history.

---

*Not affiliated with Vercel Inc. or the Next.js project. Built with ❤️ by NextGenAI Labs.*
