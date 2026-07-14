import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';

// vite-react-ssg entry. Prerenders every route (see ssgOptions.includedRoutes
// in vite.config.ts) to static HTML, then hydrates.
export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL });
