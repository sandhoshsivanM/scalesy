import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Home from './pages/Home';

// Detail pages are lazy so they stay out of the home bundle; vite-react-ssg
// still prerenders each enumerated path (see includedRoutes in main.tsx).
// React Router's `lazy` expects a `Component` export, so map each default.
const lazy = (loader: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await loader()).default,
});

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, Component: Home },
      { path: 'work', lazy: lazy(() => import('./pages/Work')) },
      { path: 'work/:slug', lazy: lazy(() => import('./pages/WorkDetail')) },
      { path: 'insights', lazy: lazy(() => import('./pages/Insights')) },
      { path: 'insights/:slug', lazy: lazy(() => import('./pages/InsightDetail')) },
      { path: 'contact', lazy: lazy(() => import('./pages/ContactPage')) },
      { path: '*', lazy: lazy(() => import('./pages/NotFound')) },
    ],
  },
];
