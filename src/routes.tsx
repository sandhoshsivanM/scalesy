import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Home from './pages/Home';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

// Direct component routes (no React Router `lazy`) — vite-react-ssg still
// code-splits each route's bundle by module graph, and this avoids the
// data-router static-loader-data fetch path that broke hydration.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, Component: Home },
      { path: 'work', Component: Work },
      { path: 'work/:slug', Component: WorkDetail },
      { path: 'insights', Component: Insights },
      { path: 'insights/:slug', Component: InsightDetail },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFound },
    ],
  },
];
