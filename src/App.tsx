import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './styles/global.css';
import './styles/components.css';
import './styles/motion.css';
import { ThemeProvider } from './providers/ThemeProvider';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { CursorProvider } from './providers/CursorProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { ChatWidget } from './components/ChatWidget';
import { Preloader } from './sections/Preloader';

function RouteEffects() {
  const { pathname, hash } = useLocation();
  // Reset scroll on route change (but honor in-page hash targets).
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <CursorProvider>
          <Preloader />
          <RouteEffects />
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main">
            <Outlet />
          </main>
          <Footer />
          <StickyCTA />
          <ChatWidget />
        </CursorProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
