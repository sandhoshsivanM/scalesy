// Prefix internal links and asset paths with the site base (import.meta.env.BASE_URL).
// Locally BASE_URL is "/", on GitHub Pages it is "/scalesy/". This keeps every
// href and src correct in both places.
const BASE = import.meta.env.BASE_URL; // always ends with "/"

export function withBase(path = '/') {
  const root = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE; // "" or "/scalesy"
  if (!path || path === '/') return root + '/';
  return root + (path.startsWith('/') ? path : '/' + path);
}
