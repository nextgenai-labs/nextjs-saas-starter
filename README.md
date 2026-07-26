# Next.js SaaS Starter

**Auth · Teams · Billing · Admin — Production-ready, full source code included.**

Build and launch your subscription SaaS in days, not months. This starter kit eliminates the undifferentiated heavy lifting so you can focus on what makes your product unique.

---

## Current Status: Project Foundation

This repository is under active development. The project foundation is in place:

- [x] pnpm workspaces monorepo
- [x] Turborepo build system
- [x] TypeScript strict mode (shared tsconfigs)
- [x] ESLint 9 flat config with TypeScript, React, and Next.js rules
- [x] Prettier with Tailwind CSS plugin
- [x] Husky pre-commit hooks with lint-staged
- [x] Commitlint (conventional commits)
- [x] Changesets for versioning
- [x] EditorConfig
- [x] GitHub Actions CI (lint, typecheck, format, build)
- [x] Folder structure scaffolded

## Project Structure

```
nextjs-saas-starter/
├── apps/
│   └── web/                    # Next.js application (in progress)
├── packages/
│   ├── config/                 # Shared configurations
│   │   ├── tsconfig/           # TypeScript config presets
│   │   └── package.json
│   ├── types/                  # Shared TypeScript types
│   ├── ui/                     # Shared UI components (placeholder)
│   └── utils/                  # Shared utilities (placeholder)
├── docs/                       # Product and planning documentation
├── scripts/                    # Build and utility scripts
├── .github/workflows/          # CI pipeline
├── .husky/                     # Git hooks
├── .changeset/                 # Version management
└── .editorconfig
```

## Tech Stack

| Layer           | Choice                     |
| --------------- | -------------------------- |
| Framework       | Next.js 15 (App Router)    |
| Language        | TypeScript (strict mode)   |
| Database        | PostgreSQL                 |
| ORM             | Drizzle ORM                |
| Auth            | NextAuth v5 (Auth.js)      |
| Payments        | Stripe                     |
| Email           | Resend                     |
| UI              | Tailwind CSS 4 + shadcn/ui |
| Testing         | Vitest + Playwright        |
| Package manager | pnpm 9                     |
| Build system    | Turborepo 2                |

## Quick Start

```bash
git clone <your-repo-url>
cd nextjs-saas-starter
pnpm install
pnpm dev
```

## Scripts

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | Start development server (all apps) |
| `pnpm build`        | Build all apps and packages         |
| `pnpm lint`         | Run ESLint across the project       |
| `pnpm format`       | Format all files with Prettier      |
| `pnpm format:check` | Check formatting without writing    |
| `pnpm typecheck`    | Run TypeScript type checking        |
| `pnpm clean`        | Clean all build artifacts           |
| `pnpm test`         | Run tests                           |

## Documentation

| Document                                | Description                                    |
| --------------------------------------- | ---------------------------------------------- |
| [Product Overview](docs/01-product.md)  | Vision, target customers, competitive analysis |
| [Feature Catalog](docs/02-features.md)  | Complete feature list with priorities          |
| [Architecture](docs/03-architecture.md) | System design, data flow, ADRs                 |
| [Tech Stack](docs/04-tech-stack.md)     | Technology choices and rationale               |
| [Roadmap](docs/05-roadmap.md)           | Release plan and future features               |

## Committing

This project uses conventional commits. Commit messages must follow the format:

```
type(scope): description

feat:     new feature
fix:      bug fix
docs:     documentation
style:    formatting, code style
refactor: code change that neither fixes nor adds
perf:     performance improvement
test:     adding or fixing tests
build:    build system or dependencies
ci:       CI configuration
chore:    maintenance tasks
```

## License

This is a commercial product, not open-source software. Licenses are available at three tiers:

| License    | Price | Best For                                 |
| ---------- | ----- | ---------------------------------------- |
| Standard   | $59   | Single developer, unlimited projects     |
| Extended   | $149  | Up to 5 developers, unlimited projects   |
| Enterprise | $499  | Unlimited developers, white-label rights |

All purchases include 12 months of updates and support. See [docs/06-pricing.md](docs/06-pricing.md) for details.

---

_Not affiliated with Vercel Inc. or the Next.js project. Built by NextGenAI Labs._
