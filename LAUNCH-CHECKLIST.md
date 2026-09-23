# Launch checklist

Copy into the site's Productive task and tick off before going live.

## Config
- [ ] `campaign.config.ts`: name, tagline, description, `opensAt` / `closesAt` (with timezone offset)
- [ ] Real `gtmId` (and `cookiebotId` if the client uses Cookiebot)
- [ ] Every form in `forms` points at the live form, not a test one
- [ ] `theme.css` matches the Figma file (colours, fonts, radius)

## Content
- [ ] All copy signed off by the PM (comments on the preview resolved)
- [ ] Terms and privacy pages contain the client's approved text
- [ ] Images have meaningful `alt` text; decorative ones have `alt=""`
- [ ] `public/og.png` replaced with the campaign share image (1200×630)

## Behaviour
- [ ] Each form submits and lands on the right thank-you page
- [ ] Coming-soon / open / closed states checked (`/closed` previews the last one)
- [ ] No console errors, including CSP errors, on every page
- [ ] 404 page works; old campaign URLs redirect (`vercel.json` → `redirects`)

## Quality
- [ ] Checked at 1440px, 768px and 375px wide
- [ ] Lighthouse: performance and accessibility 90+
- [ ] Keyboard only: menu, forms and modals usable; focus visible

## Go live
- [ ] Custom domain connected in Vercel, HTTPS working
- [ ] `main` deployed to production; smoke-test the live URL
- [ ] Site added/updated on the Microsites Board
