# `site/` — Workplace Janitorial Services marketing site

Static Astro 6 site. Builds to `dist/` and ships to GitHub Pages.

## Run locally

```bash
corepack enable pnpm
pnpm install
pnpm run dev          # http://localhost:4321
pnpm run build        # produces ./dist
pnpm run preview      # preview the production build
```

## Project structure

```
src/
  components/
    layout/         BaseHead, Header, Footer, SkipLink (Astro)
    sections/       Hero, TrustBar, Services, Testimonials, FAQ, CtaRegion, ContactPanel
    ui/             PhoneLink.astro, Button.tsx, Reveal.tsx (React island)
    islands/        SmoothScroll.tsx (Lenis), QuoteCalculator.tsx, ContactForm.tsx
  content/          services.ts, testimonials.ts, faqs.ts  (plain TS data)
  lib/              cn.ts, brand.ts, seo.ts
  styles/           tokens.css (@theme), base.css (resets + globals + a11y)
  pages/            index, services, about, contact, quote, privacy
public/             favicon, manifest, robots, og-placeholder
```

## Brand tokens

All brand-side logic lives in [`src/lib/brand.ts`](./src/lib/brand.ts).
Change a brand value there once (name, address, phone, hours, social)
and every page picks it up — including the JSON-LD `LocalBusiness`
schema emitted by `BaseHead.astro`.

## Design tokens (Tailwind 4)

Visual tokens (color, type, radius, shadow, easing) live in
[`src/styles/tokens.css`](./src/styles/tokens.css) inside an `@theme {}`
block. Tailwind 4 reads those tokens and exposes them as utilities:

| Token                | Class example                 |
|----------------------|-------------------------------|
| `--color-brand-500`  | `bg-brand-500` `text-brand-500` `border-brand-500` |
| `--color-ink-700`    | `bg-ink-700` `text-ink-700`   |
| `--font-display`     | `font-display`                |
| `--font-body`        | `font-body` (default body)    |
| `--radius-card`      | `rounded-card`                |
| `--shadow-card`      | `shadow-card`                 |

To re-theme the site (e.g. for a Towne Criers franchise spin) — edit
`tokens.css` only. Nothing else needs to change.
