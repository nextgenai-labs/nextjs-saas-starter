# Marketplace Strategy

**Status:** Draft v1  
**Owner:** Product  
**Last Updated:** 2026-07-26

---

## 1. Target Marketplaces

| Marketplace            | Revenue Share                                 | Audience Fit                               | Priority                                                  |
| ---------------------- | --------------------------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| **Codester**           | 15-25%                                        | Developers, indie founders, small agencies | **Primary** — largest code marketplace, strong SaaS niche |
| **UIdeck**             | 20-25%                                        | Designers, frontend devs                   | Secondary — smaller audience, lower conversion            |
| **Gumroad**            | 3-5% + payment fees                           | Indie developers, direct-to-consumer       | Secondary — lower discoverability but higher margin       |
| **GitHub Marketplace** | N/A (not applicable for source code products) | N/A                                        | Not targeted — no commercial code support                 |
| **AppSumo**            | 70%+ (lifetime deals)                         | Deal-seekers, not our target               | Avoid — destroys perceived value                          |

### Primary Strategy: Codester-First

Codester is our primary distribution channel because:

1. **Audience alignment.** Codester buyers understand the value of boilerplate code. They are actively searching for "Next.js SaaS starter" and similar terms.
2. **Marketplace trust.** Codester handles payment processing, license key generation, and dispute resolution. Buyers trust the platform.
3. **Discoverability.** Codester has existing SEO for SaaS-related keywords. We benefit from their domain authority.
4. **Competitive density.** Codester hosts multiple competitors. A well-crafted listing can rank high with proper SEO and reviews.

---

## 2. Listing Requirements

### Codester-Specific Requirements

| Requirement          | Details                                                                             |
| -------------------- | ----------------------------------------------------------------------------------- |
| **Item name**        | Next.js SaaS Starter — Auth, Teams, Billing, and Admin                              |
| **Item description** | 500-1500 words, keyword-optimized                                                   |
| **Price**            | $59 (Standard) / $149 (Extended) / $499 (Enterprise)                                |
| **Screenshots**      | Minimum 6, maximum 12. 1920×1080px, JPG format.                                     |
| **Preview URL**      | Live demo site with seed data                                                       |
| **Documentation**    | PDF or linked web docs                                                              |
| **Support policy**   | 12 months included, via item comments + email                                       |
| **License**          | Standard / Extended / Enterprise                                                    |
| **Tags**             | nextjs, saas, starter, boilerplate, react, typescript, stripe, auth, teams, billing |

### Prohibited Content

- No fake reviews
- No misleading feature descriptions
- No trademarked logos in screenshots (placeholder branding only)
- No gated features (all P0 features must work in the demo)

---

## 3. Screenshots & Media

### Screenshot Checklist

| #   | Screen           | Content                                           |
| --- | ---------------- | ------------------------------------------------- |
| 1   | Landing page     | Hero section with headline, feature grid, pricing |
| 2   | Login page       | Email + Google/GitHub OAuth buttons               |
| 3   | Dashboard        | Analytics view with charts, MRR, active users     |
| 4   | Team management  | Member list with roles, invite button             |
| 5   | Billing          | Plan display, subscription status, upgrade button |
| 6   | Settings         | Profile editing, theme toggle                     |
| 7   | Mobile dashboard | Responsive view of dashboard                      |
| 8   | Admin panel (P1) | User list, org management (post-launch)           |

### Screenshot Guidelines

- Use the default theme (no custom branding in screenshots)
- Mock data that looks realistic but is clearly placeholder (e.g., "Acme Corp")
- No real email addresses, no real names
- Clean, well-lit, high contrast
- Annotations allowed (arrows, callouts) for feature highlights, but keep minimal

### Demo Video (2-3 minutes)

Script structure:

1. **Intro (15s):** "Meet our Next.js SaaS Starter — the fastest way to launch a subscription SaaS with teams, billing, and auth."
2. **Setup (30s):** Show `npm install && npm run dev`, env config, seed data
3. **Auth (20s):** Register with email, log in with Google
4. **Dashboard (20s):** Navigate dashboard, switch orgs
5. **Team (25s):** Invite member, show role badges
6. **Billing (25s):** Upgrade to Pro, visit Stripe Customer Portal
7. **Code (15s):** Show codebase structure, TypeScript types
8. **Outro (10s):** "Get the starter at [link]. 12 months of updates included."

---

## 4. Listing Copy

### Headline (primary)

> **Next.js SaaS Starter — Auth, Teams, Subscriptions & Admin Panel**

### Secondary Headline

> Build and launch your SaaS product in days, not months. Production-grade authentication, multi-tenant teams, Stripe billing, and a beautiful dashboard — all built with Next.js 15, TypeScript, and Drizzle ORM.

### Feature Bullets (front-load the most impactful)

- ✅ Email + Google + GitHub authentication out of the box
- ✅ Multi-tenant organization model with role-based access control
- ✅ Stripe subscriptions with checkout, customer portal, webhooks
- ✅ Production-ready dashboard with analytics
- ✅ Full TypeScript with strict mode, Drizzle ORM, pnpm
- ✅ One-command setup with seed data
- ✅ Vercel + Docker deployment guides
- ✅ 12 months of updates and priority support

### Call to Action

> **Get started today — no recurring fees, no hidden costs, full source code included.**

---

## 5. SEO Strategy

### On-Listing SEO

- Primary keyword: "Next.js SaaS starter"
- Secondary keywords: "React SaaS boilerplate", "Stripe subscription Next.js", "multi-tenant Next.js app", "Next.js auth starter", "Next.js team management"
- Use keywords naturally in the first 200 words of the description
- Tags: nextjs, saas, boilerplate, react, typescript, stripe, auth, teams, billing, startup, subscription

### Off-Listing SEO

- Product landing page on our domain (link to marketplace for purchase)
- Blog posts: "How to Build a Multi-Tenant SaaS with Next.js in 2026", "Why We Chose Drizzle ORM Over Prisma", "Setting Up Stripe Subscriptions in Next.js"
- GitHub Discussions / Reddit / Dev.to posts (helpful, not promotional)
- YouTube demo video (unlisted, linked from listing)
- Direct outreach to developer newsletters (swiftcodes, saasgrow, etc.)

---

## 6. Review Strategy

Reviews are the #1 conversion factor on Codester. We must actively manage them.

### Pre-Review (Launch)

- Reach out to 20-30 beta testers who purchased at a discount
- Ask for honest reviews in exchange for free Extended license upgrade
- Provide a review template (optional, not required)

### Post-Review

- Respond to every review within 48 hours
- Positive reviews: thank the reviewer, reference their specific compliment
- Negative reviews: apologize, identify the issue, offer a solution publicly, follow up privately
- Bug reports in reviews: fix within 1 week, update the reviewer, ask if they will update their review

### Review Volume Target

| Month            | Target Reviews |
| ---------------- | -------------- |
| Month 1 (launch) | 10-15          |
| Month 2-3        | 5-10/month     |
| Month 4-6        | 3-5/month      |
| Month 7+         | 1-3/month      |

---

## 7. Update & Maintenance Process

Marketplace customers expect active maintenance. We follow this process for each release:

1. **Develop** the release (feature branch, PR, review, test)
2. **Tag** the release (`v2026.1.0`)
3. **Update** the changelog
4. **Upload** the updated ZIP to the marketplace
5. **Notify** existing customers via marketplace messaging system
6. **Update** the listing description if new features warrant it
7. **Post** about the update on social media / newsletter

### Update Notification Timeline

- Patch (bug fix): notify immediately
- Minor (feature): notify at release, with teaser 1 week before
- Major (breaking): notify 1 month before, provide migration guide
- Security: notify immediately, patch within 48 hours

---

## 8. Competitor Monitoring

| Competitor       | What to Watch                                                |
| ---------------- | ------------------------------------------------------------ |
| **ShipFast**     | Pricing changes, new features, marketing campaigns           |
| **DivJoy**       | Next.js 15 adoption, pricing changes                         |
| **Nextify**      | New feature releases, community growth                       |
| **New entrants** | Monthly sweep of Codester for new "saas" + "nextjs" listings |

**Response time to competitive moves:** 2 weeks for pricing changes, 1 month for major feature gaps. We do not compete on price — we compete on quality and team model differentiation.
