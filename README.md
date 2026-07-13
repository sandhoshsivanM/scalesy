# Scalesy

Editorial marketing & branding studio website — dark, premium, Swiss-grid.
Built with [Astro](https://astro.build) (static, ships near-zero JavaScript).

**Live:** https://sandhoshsivanm.github.io/scalesy

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output -> dist/
npm run preview
```

## Structure

- `src/pages` — routes: home, `/work` (+ project pages), `/insights` (+ articles), `/contact`
- `src/components` — sections (Hero, Manifesto, Services, SelectedWork, Process, Testimonials, …) + Header/Footer/Logo
- `src/data` — content: `work.js`, `insights.js`, `services.js`, `testimonials.js`, `clients.js`, `bookingForm.js`
- `src/styles/global.css` — design tokens & system
- `src/scripts/main.js` — scroll reveals, testimonial rotator, mobile menu, booking form
- `public/brand` — logo mark, favicons, social image
- `public/fonts` — Neue Montreal (display face)

## Booking form

The `/contact` form posts to a Google Form (submissions email the studio + log to a
Sheet). It runs in demo mode until configured — see [`GOOGLE_FORM_SETUP.md`](GOOGLE_FORM_SETUP.md).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`PUBLIC_BASE=/scalesy` and publishes to GitHub Pages. Paths are base-aware
(`src/lib/paths.js`), so the same source runs at the domain root locally and
under `/scalesy` in production.
