# Deploy runbook — Workplace Janitorial Services static site

This site lives in `site/`. Host it on GitHub Pages, free of charge,
under the repository's default GitHub Pages URL or a custom domain.

---

## One-time repo setup

1. **Repo settings → Pages**
   - Source: **GitHub Actions** (not "Deploy from a branch").
   - The bundled workflow `.github/workflows/deploy-site.yml` will
     publish from the `site/dist/` artifact it builds.
2. **Custom domain (optional)**
   - Create `site/public/CNAME` containing one line, e.g.
     ```
     workplacejanitorial.ca
     ```
   - At your DNS provider, point that domain's `A` records at
     GitHub Pages (`185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`) and add a `CNAME`
     record for `www.` → `<your-org>.github.io`.
   - Back in repo **Settings → Pages**, enter the custom domain and
     check **Enforce HTTPS**.

## Wiring the contact form (optional, recommended)

The site ships with a Formspree-ready form. To make it actually deliver
email instead of falling back to `mailto:`:

1. Sign up at <https://formspree.io/> (free tier is enough).
2. Create a form, copy its endpoint slug (looks like `xyzabcde`).
3. In GitHub repo **Settings → Secrets and variables → Actions**,
   add a secret:
   - Name: `PUBLIC_FORMSPREE_ID`
   - Value: the slug
4. Re-run the workflow. From now on, form submissions email whichever
   inbox you tied to that Formspree form.

If you'd rather skip Formspree entirely, the form falls back to
opening the visitor's mail client addressed to
`info@workplacejanitorial.ca`. That works on day one, no signup
required — but convert forms now are stronger than mailto links.

## Environment variables that matter

| Name                  | Why                                            | Where to set                       |
|-----------------------|------------------------------------------------|------------------------------------|
| `PUBLIC_FORMSPREE_ID` | Id for contact form POST endpoint              | Repo secret → Actions → env        |
| (none required)       | Everything else reads from `site/src/lib/brand.ts` | n/a                            |

If you fork or spin a sister site, edit `site/src/lib/brand.ts`
exactly once. JSON-LD, OG tags, the phone CTA, and every page pick
it up.

## Building locally

```bash
cd site
corepack enable pnpm
pnpm install
pnpm run dev          # http://localhost:4321
pnpm run build        # produces ./dist
pnpm run preview      # preview the production build
```

## Editing copy

- **Brand identity** (name, address, phone, email, hours, social):
  `site/src/lib/brand.ts`
- **Services data** (slug, summary, includes, pricing):
  `site/src/content/services.ts`
- **Testimonials**:
  `site/src/content/testimonials.ts`
- **FAQ**:
  `site/src/content/faqs.ts`
- **Colour / typography tokens** (whole-site re-theme):
  `site/src/styles/tokens.css`

After any edit, the next push to `main` rebuilds the site through
the GitHub Actions workflow and publishes automatically.

## Troubleshooting

| Symptom                                        | Cause / fix                                                          |
|------------------------------------------------|----------------------------------------------------------------------|
| Workflow fails with `Cannot find module 'pnpm'`| A `pnpm-lock.yaml` was committed but `pnpm` is unavailable on the runner. Either remove the lockfile or convert the workflow to `npm install`. |
| 404 on every route after deploy                | `trailingSlash` mismatch — verify `site/astro.config.mjs` value matches the URL layout you expect. |
| Contact form POSTs return 404                 | `PUBLIC_FORMSPREE_ID` secret was not set; the form fell back to mailto. |
| Custom domain shows "not secure"               | DNS not yet propagated. Pages will issue a cert once it's stable (~15 min). |
| Lighthouse mobile score drops under 95        | Tailwind purge cache stale — delete `site/.astro/` and rebuild. |

## Where everything ships

After a successful merge the site is published at:

```
https://<your-org>.github.io/<repo>/                # until CNAME is set
https://workplacejanitorial.ca/                     # after CNAME is set
```

No backend, no cron jobs, no environment drift. Edit, merge, ship.
