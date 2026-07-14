// Post-build HTML fixups for every prerendered page:
//  1) Hoist <meta charset="utf-8"> to be the first child of <head>. react-helmet
//     injects its tags at the top of <head>, which otherwise pushes the charset
//     past the 1024-byte limit Lighthouse checks.
//  2) Emit dist/404.html (GitHub Pages SPA fallback) from the home shell.
import { readdirSync, readFileSync, writeFileSync, statSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

const CHARSET = '<meta charset="utf-8">';
for (const file of htmlFiles(DIST)) {
  let html = readFileSync(file, 'utf8');
  // Drop any existing charset meta (helmet-injected or template), then reinsert
  // it as the very first thing inside <head>.
  html = html.replace(/<meta[^>]+charset=[^>]*>/gi, '');
  html = html.replace(/<head>/i, `<head>${CHARSET}`);
  writeFileSync(file, html);
}

// SPA fallback for deep links on GitHub Pages.
copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'));

// Sitemap derived from the prerendered pages. BASE mirrors the deploy path.
const ORIGIN = 'https://sandhoshsivanm.github.io';
const BASE = (process.env.PUBLIC_BASE || '/').replace(/\/$/, '');
const urls = htmlFiles(DIST)
  .filter((f) => !f.endsWith('404.html'))
  .map((f) => f.slice(DIST.length).replace(/index\.html$/, '').replace(/\.html$/, ''))
  .map((p) => `${ORIGIN}${BASE}${p === '/' ? '/' : p}`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url><loc>${u}</loc></url>`)
  .join('\n')}\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log('[postbuild] charset hoisted, 404.html + sitemap.xml written for', urls.length, 'pages');
