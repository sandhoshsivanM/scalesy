// Prefix PUBLIC asset URLs (og-image, brand marks referenced in JS/meta) with
// the deploy base. React Router nav is basename-relative via <Link>, so nav
// links do NOT need this — only public/ assets that aren't import-fingerprinted.
const BASE = import.meta.env.BASE_URL; // always ends with "/"

export function asset(path = '/'): string {
  const root = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE; // "" or "/scalesy"
  if (!path || path === '/') return root + '/';
  return root + (path.startsWith('/') ? path : '/' + path);
}

// Absolute origin for canonical / OG tags at build time.
export const SITE_ORIGIN = 'https://sandhoshsivanm.github.io';
