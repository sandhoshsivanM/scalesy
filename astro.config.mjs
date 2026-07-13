import { defineConfig } from 'astro/config';

// SCALESY — static editorial site. Ships zero JS by default.
// `base` is injected at build time (PUBLIC_BASE) so the same source can serve
// from the domain root locally and from /scalesy on GitHub Pages.
const BASE = process.env.PUBLIC_BASE || '/';

export default defineConfig({
  site: 'https://sandhoshsivanm.github.io',
  base: BASE,
  trailingSlash: 'ignore',
  compressHTML: true,
});
