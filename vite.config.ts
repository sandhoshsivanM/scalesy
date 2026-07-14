import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

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
    rollupOptions: {
      output: {
        manualChunks: {
          lenis: ['lenis'],
          router: ['react-router-dom'],
          gsap: ['gsap'],
        },
      },
    },
  },
  ssr: {
    // gsap/lenis touch window; let the SSG runtime externalise them cleanly.
    noExternal: ['framer-motion'],
  },
});
