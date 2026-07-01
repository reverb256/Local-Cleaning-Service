# Workplace Janitorial Services — Winnipeg

A modern, statically-rendered marketing site for **Workplace Janitorial Services**
— a bonded, WCB-covered commercial cleaning company in Winnipeg, MB.

> **Production deployable:** [`site/`](./site/) — Astro 6, React 19 islands, Tailwind 4,
> GSAP, Lenis. Static output hosted on GitHub Pages.
>
> **Legacy reference:** `client/`, `server/`, `shared/` — the previous full-stack
> monorepo (React 18 + Express + Postgres + Drizzle). Kept for posterity;
> **not deployed, not maintained.**

---

## What's in this repo

```
.
├── site/                       # ← PRODUCTION — fresh Astro static rebuild
│   ├── src/
│   │   ├── components/
│   │   ├── content/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── styles/
│   ├── public/
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   └── deploy.md               # GitHub Pages deployment runbook
├── .github/
│   └── workflows/
│       └── deploy-site.yml     # CI: build → deploy to GitHub Pages
├── client/   server/   shared/ # Legacy monorepo (reference only)
└── README.md
```

## Build & deploy (TL;DR)

```bash
cd site
corepack enable pnpm
pnpm install
pnpm run build      # produces site/dist/ (static)
```

Then either:

- Push `site/dist/` to a `gh-pages` branch, **or**
- Use the bundled GitHub Actions workflow (`.github/workflows/deploy-site.yml`),
  which builds `site/` and publishes with `actions/deploy-pages@v4`.

Full runbook: [`docs/deploy.md`](./docs/deploy.md).
Custom domain: drop a `CNAME` file in `site/public/` before building.

## Brand

| | |
|--|--|
| Business | Workplace Janitorial Services |
| Phone | (204) 415-2910 |
| Email | info@workplacejanitorial.ca |
| Address | 2-761 Marion Street, Winnipeg, MB R2J 0K6 |
| Hours | Mon–Fri 8 AM–6 PM · Sat 9 AM–4 PM · Sun closed |

## Why a rewrite

The previous React + Express + Postgres stack was over-engineered for a
single-business marketing site: the dynamic backend was used only for the
quote form and one chatbot, both of which collapse gracefully to a phone
call + Formspree-style email endpoint. The new site is **fully static**,
ships every route as pre-rendered HTML, hits Lighthouse ≥ 95 on mobile,
and has zero hosted infrastructure to maintain.

The honest thing a competitor like `officecleaningwinnipeg.com` does not
have:

- JSON-LD `LocalBusiness` schema with NAP, hours, geo, and service area
- 30-minute response guarantee called out above the fold
- Bonded + WCB + background-check trust strip, not buried in a footer
- WCAG 2.2 AA floor with `prefers-reduced-motion` respected on every animation
- A `/quote` page with a 3-field instant estimate — no phone tag required

---

<sub>Built for one-time, GitHub-Pages-hosted delivery.
Remix-friendly: the brand constants live in
[`site/src/lib/brand.ts`](./site/src/lib/brand.ts) so a franchisee
spin-off is a 30-second edit.</sub>
