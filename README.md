# Microsite template

Starter for RMP client campaign microsites: **Astro + React + Tailwind v4**, static, deployed on Vercel, no CMS.

It standardises the plumbing (installs, config, headers, analytics, forms, open/closed states), not the look. Every site is client-branded, so restyle everything freely after forking.

## Start a new site

1. **Fork** this repo in Bitbucket as `<client>-<year>` (e.g. `dwp-2027`), then clone it.
2. `nvm use && npm ci`
3. Edit **`campaign.config.ts`**: name, dates, forms, nav, GTM.
4. Edit **`src/styles/theme.css`**: client colours and fonts from Figma. Delete the demo palettes at the bottom.
5. Change the dev port in `package.json` (`--port 30xx`) and add it to the local runner.
6. `npm run dev` → http://localhost:3011
7. Build the pages. Delete `src/pages/kit.astro` when you don't need it.
8. Create a Vercel project from the repo (framework preset: Astro). Every branch gets a preview URL PMs can comment on.
9. Before launch, work through **`LAUNCH-CHECKLIST.md`**.

## What's where

| Path | What |
| --- | --- |
| `campaign.config.ts` | Dates, forms, nav, links, GTM, closed-page copy. Typed and validated at build. |
| `src/styles/theme.css` | Client theme tokens (Tailwind v4 `@theme`) |
| `src/content/*.json` + `src/content.config.ts` | Page copy (FAQs, steps, prizes...) as typed content collections |
| `src/components/starters/` | Header, Footer, Button, Card, Section: starting points, restyle freely |
| `src/components/embeds/` | TypeformModal, ConnectForm (RMP Connect), HubspotForm, YouTube (lite) |
| `src/components/CampaignForm.astro` | `<CampaignForm name="enter" />` renders whichever provider the config says |
| `src/components/ClosedPage.astro` | The closed state; the home page switches to it after `closesAt` |
| `src/components/wow/` | Countdown, StatCounter, LogoMarquee, Spotlight cards, confetti, BrandSwitcher (demo) |
| `src/pages/kit.astro` | Live catalogue of all of the above (noindex) |
| `vercel.json` | CSP + security headers, caching, redirects |
| `bitbucket-pipelines.yml` | `astro check` + build on every PR |

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Local dev server on port 3011 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run ci` | Type check + build (what the pipeline runs) |

## Notes

- **Phases are decided at build time.** Static pages don't change on their own; when `opensAt` or `closesAt` passes, redeploy (or set a Vercel deploy hook on a schedule).
- **Adding a third-party embed?** Add its hosts to the CSP in `vercel.json` (see `formHosts` in `src/lib/campaign.ts`), or it will be blocked.
- **Images:** put them in `src/assets/` and use Astro's `<Image />` so they're resized and converted to WebP at build.
- **Freezing a finished site:** replace the pages with `ClosedPage` (or static copies of pages that must stay public), add redirects, set the repo to read-only.
- **Improving the template:** make the change here; new forks get it. Running sites only take it if you merge from this repo as `upstream`.
