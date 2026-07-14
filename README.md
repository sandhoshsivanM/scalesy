# Scalesy

Award-tier editorial marketing & branding studio website — dark-default (black + gold)
with a light theme, Swiss grid, and a measurement/precision visual language.

Built with **React + TypeScript + Vite + TailwindCSS**, prerendered to static HTML per
route via [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) (great SEO
+ LCP), with **GSAP ScrollTrigger**, **Lenis** smooth scroll, and **Framer Motion**.

**Live:** https://sandhoshsivanm.github.io/scalesy

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # prerendered static output -> dist/ (+ 404.html, sitemap.xml)
npm run preview
npm run typecheck
```

## Structure

- `src/pages` — route roots: `Home`, `Work` (+ `WorkDetail`), `Insights` (+ `InsightDetail`), `ContactPage`, `NotFound`. Each sets per-route SEO via `<Seo>`.
- `src/sections` — page bands: `Hero`, `Manifesto`, `FeaturedServices`, `System`, `SelectedWorkGallery`, `GrowthFramework`, `Testimonials`, `Contact`, `Preloader`, …
- `src/components` — shell + atoms (`Header`, `Footer`, `ChatWidget`, `ui/*`, `graphics/*`).
- `src/providers` — `ThemeProvider`, `SmoothScrollProvider` (one rAF clock: GSAP ticker → Lenis → ScrollTrigger), `CursorProvider`.
- `src/hooks` — `useReveal` (shared IntersectionObserver), `useScrollScene`, `useMagnetic`, `useCountUp`, …
- `src/lib/motion` — `MotionConfig` (single source of truth for reduced-motion / touch / pointer), `registerGsap`, `lenis`, `easings`.
- `src/data` — typed content: `work.ts`, `insights.ts`, `services.ts`, `system.ts`, `testimonials.ts`, `clients.ts`, `proof.ts`, `studio.ts`, `bookingForm.ts`.
- `src/styles` — `global.css` (design tokens + editorial primitives), `components.css` (section styles), `motion.css` (cursor/preloader/gallery), `fonts.css` (self-hosted Neue Montreal).

## Design system

Tailwind **consumes** the CSS-variable tokens in `global.css` (colors, fluid type
scale `text-step-*`, `ease-brand`) rather than replacing them — so utilities flip with
`[data-theme="light"]` and re-scope inside `.on-ink` bands automatically. Signature
primitives (`.eyebrow`, `.rule-ticked`, `.cta`, `.btn`, reveals) stay as authored CSS.

Motion is progressive enhancement: content is visible by default; a `motion-ready`
class (set pre-paint, skipped under reduced-motion) gates the hidden→reveal transition,
so a JS failure can never blank the page.

## Booking form

The `/contact` form posts to a Google Form (submissions email the studio + log to a
Sheet). It runs in demo mode until configured — see [`GOOGLE_FORM_SETUP.md`](GOOGLE_FORM_SETUP.md)
and fill in `src/data/bookingForm.ts`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run
build` with `PUBLIC_BASE=/scalesy` and publishes `dist/` to GitHub Pages. Vite's `base`
and React Router's `basename` are wired from the same env, so the same source runs at the
domain root locally and under `/scalesy` in production. `postbuild` hoists `<meta charset>`,
writes `404.html` (SPA fallback) and `sitemap.xml`.

## Lighthouse

Prerendered HTML + non-render-blocking fonts keep all four categories comfortably above
95 on both desktop and mobile (desktop 97 / 100 / 100 / 100; mobile 98 perf).
