import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { work } from './src/data/work';
import { insights } from './src/data/insights';

// SCALESY — Vite + React, prerendered per-route via vite-react-ssg.
// `base` is injected at build time (PUBLIC_BASE) so the same source serves from
// the domain root locally and from /scalesy on GitHub Pages — same contract the
// Astro build used.
const BASE = process.env.PUBLIC_BASE || '/';

export default defineConfig({
  base: BASE,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // gsap / lenis / route pages are split automatically via dynamic import();
    // no manualChunks (it conflicts with SSR externalization of those modules).
  },
  ssr: {
    // gsap/lenis touch window; let the SSG runtime externalise them cleanly.
    noExternal: ['framer-motion'],
  },
  ssgOptions: {
    script: 'async',
    formatting: 'none',
    // Analog of Astro getStaticPaths(): keep the static routes, drop dynamic /
    // catch-all patterns, and append one concrete path per project / insight.
    includedRoutes(paths) {
      const staticPaths = paths.filter((p) => !p.includes(':') && !p.includes('*'));
      const workPaths = work.map((p) => `/work/${p.slug}`);
      const insightPaths = insights.map((p) => `/insights/${p.slug}`);
      return [...new Set([...staticPaths, ...workPaths, ...insightPaths])];
    },
  },
});
