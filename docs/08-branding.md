# Branding Guidelines

**Status:** Draft v1  
**Owner:** Product  
**Last Updated:** 2026-07-26

---

## 1. Product Name

**Next.js SaaS Starter**

- **Trademark status:** Not registered (common descriptive name). Filed as a product name in marketplace listings, not a legal trademark.
- **Tagline options:**
  - *"Launch your SaaS. Skip the boilerplate."*
  - *"The production-grade Next.js starter for serious SaaS builders."*
  - *"Auth, teams, billing — done for you."*
- **URL:** `nextjs-saas-starter.com` (or similar — redirects to marketplace or product page)

### Name Rationale

We chose a descriptive, SEO-friendly name over a branded name (e.g., "LaunchKit", "SaaSForge") because:

1. **SEO.** "Next.js SaaS Starter" ranks for the exact search query buyers use. A branded name would require separate brand-building.
2. **Clarity.** Buyers immediately know what the product is. No explanation needed.
3. **Marketplace discoverability.** Codester and similar platforms are search-driven. The name matches the search query.

**Trade-off:** A descriptive name is harder to trademark and harder to build brand equity around. We compensate with consistent visual branding and a strong product identity.

---

## 2. Visual Identity

### Logo

- **Style:** Minimalist, text-based wordmark. No icon required.
- **Typography:** Inter or system sans-serif, bold weight.
- **Color:** Single color (#0f172a — slate-900) on light backgrounds, white on dark.
- **Format:** SVG + PNG. No transparency issues.
- **Variants:** Full logo, logo mark (if we introduce an icon later).

### Color Palette

| Role | Hex | Tailwind | Usage |
|---|---|---|---|
| **Primary** | `#2563eb` | blue-600 | Buttons, links, active states |
| **Primary hover** | `#1d4ed8` | blue-700 | Button hover, link hover |
| **Background** | `#ffffff` | white | Page backgrounds |
| **Surface** | `#f8fafc` | slate-50 | Card backgrounds |
| **Border** | `#e2e8f0` | slate-200 | Borders, dividers |
| **Text primary** | `#0f172a` | slate-900 | Headings, body text |
| **Text secondary** | `#64748b` | slate-500 | Subtle text |
| **Success** | `#16a34a` | green-600 | Billing active, confirmed |
| **Warning** | `#d97706` | amber-600 | Trial ending, warnings |
| **Error** | `#dc2626` | red-600 | Errors, payment failures |
| **Dark surface** | `#1e293b` | slate-800 | Dark mode card backgrounds |
| **Dark bg** | `#0f172a` | slate-900 | Dark mode page backgrounds |

### Typography

- **Headings:** Inter (sans-serif), variable weight 600-800
- **Body:** Inter, regular weight 400
- **Monospace:** JetBrains Mono or Fira Code, for code blocks
- **Fallback:** system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto

### Spacing

- Base unit: 4px (Tailwind default)
- Consistent spacing scale: `py-12`, `px-6`, `gap-4`, etc.
- No custom spacing overrides unless absolutely necessary

---

## 3. Brand Voice & Tone

### Principles

- **Professional, not corporate.** We write like an experienced developer explaining a concept to a peer. No jargon for jargon's sake. No marketing fluff.
- **Confident, not arrogant.** We know our product is good. We let the features and code speak. We don't bash competitors by name.
- **Clear, not clever.** Every sentence serves a purpose. We avoid puns, wordplay, and forced humor.
- **Helpful, not salesy.** Documentation and copy focus on solving the buyer's problem. Benefits before features.

### Voice Examples

| Situation | Good | Bad |
|---|---|---|
| Feature description | "Pre-built Stripe webhook handler with signature verification and idempotency — the hardest part of billing, done for you." | "Our revolutionary Stripe integration will transform your billing workflow!" |
| Problem statement | "Writing auth, teams, and billing from scratch takes 3-6 weeks. This starter gives you back that time." | "Are you tired of boilerplate? We were too. That's why we built this." |
| Call to action | "Buy the starter. Get back to building your product." | "Don't miss out on this incredible opportunity! Buy now!" |

### Do Not

- Use emoji in professional documentation
- Use ALL CAPS for emphasis
- Make exaggerated claims ("the best", "the fastest", "#1")
- Reference competitors by name in marketing copy (internal docs only)
- Use gender-specific language when unnecessary ("they" over "he/she")

---

## 4. Screenshot & Demo Guidelines

### Branding in Screenshots

- Use the default theme colors (blue primary, slate grays)
- Use placeholder company names: "Acme Corp", "Globex", "Initech"
- Use placeholder user names: "Alex Johnson", "Sam Rivera", "Jordan Chen"
- Use placeholder email addresses: `alex@acme.com`, `sam@globex.com`
- Do NOT use: real company names, real people's names, real email addresses, trademarked logos

### Demo Instance

- Maintain a live demo at `demo.nextjs-saas-starter.com` (or similar)
- Demo is reset every 24 hours
- Pre-seeded with: demo org, 3 sample users, active subscription (Stripe test mode)
- Demo credentials provided in README and marketplace listing

### Screenshots for Marketplace

- Minimum 6, maximum 12
- Resolution: 1920×1080px (16:9)
- Format: JPG, quality 85%
- File naming: `01-dashboard.jpg`, `02-billing.jpg`, etc.
- No browser chrome (crop to viewport)
- Consistent lighting and color grading

---

## 5. Assets Checklist

| Asset | Format | Status |
|---|---|---|
| Logo (light bg) | SVG, PNG | To create |
| Logo (dark bg) | SVG, PNG | To create |
| Favicon | ICO, SVG | To create |
| OG image (1200×630px) | PNG | To create |
| Social media banner (1500×500px) | PNG | To create |
| Codester thumbnail (590×300px) | JPG | To create |
| Screenshot template (1920×1080px) | PSD/Sketch | To create |
| Product mockup (browser frame) | PSD/Sketch | To create |

---

## 6. Logo, Trademark & Attribution

- We do not register a trademark for "Next.js SaaS Starter" (descriptive name).
- We do register `nextjs-saas-starter.com` and related social handles.
- Marketplace listings must include a clear "Not affiliated with Vercel Inc. or the Next.js project" disclaimer.

### Attribution in Buyer Projects

Buyers are NOT required to:
- Keep a "Powered by" badge in their application
- Link back to our website
- Include our branding in any way

The starter is a white-label product. Buyers own 100% of the output.
