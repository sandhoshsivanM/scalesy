import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'dark' | 'light';

interface ThemeApi {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeApi | null>(null);

function readDomTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Read the theme the pre-paint inline script already applied — never re-derive
  // it, so hydration stays clean.
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(readDomTheme());
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('scalesy-theme', next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeApi {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: 'dark', toggle: () => {} };
  return ctx;
}
