import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Lenis } from '@/lib/motion/lenis';
import { getMotionState } from '@/lib/motion/MotionConfig';

interface SmoothScrollApi {
  /** Lenis instance, or null under reduced-motion / touch. */
  lenis: Lenis | null;
  /** Scroll to an element/selector/offset, degrading gracefully without Lenis. */
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
  /** Pause / resume scrolling (used by preloader + mobile menu). */
  stop: () => void;
  start: () => void;
  ready: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { reducedMotion, isTouch } = getMotionState();
    // Native scroll (with ScrollTrigger still available) under reduced-motion or
    // touch — exactly the original build's decision.
    if (reducedMotion || isTouch) {
      setReady(true);
      return;
    }

    let disposed = false;
    let cleanupFns: Array<() => void> = [];

    (async () => {
      const [{ createLenis }, { registerGsap }] = await Promise.all([
        import('@/lib/motion/lenis'),
        import('@/lib/motion/registerGsap'),
      ]);
      if (disposed) return;

      const { gsap, ScrollTrigger } = registerGsap();
      const lenis = createLenis();
      lenisRef.current = lenis;

      // Lenis scroll → keep ScrollTrigger in sync.
      const onScroll = () => ScrollTrigger.update();
      lenis.on('scroll', onScroll);

      // GSAP ticker owns the single RAF loop; it drives Lenis.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanupFns = [
        () => lenis.off('scroll', onScroll),
        () => gsap.ticker.remove(tick),
        () => lenis.destroy(),
        () => {
          lenisRef.current = null;
        },
      ];
      setReady(true);
    })();

    return () => {
      disposed = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | HTMLElement | number, offset = -90) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as never, { offset });
        return;
      }
      // Fallback: native.
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    [],
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    if (!lenisRef.current) document.documentElement.classList.add('lenis-stopped');
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.classList.remove('lenis-stopped');
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo, stop, start, ready }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll(): SmoothScrollApi {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    // Safe no-op outside the provider (e.g. isolated tests).
    return {
      lenis: null,
      scrollTo: () => {},
      stop: () => {},
      start: () => {},
      ready: false,
    };
  }
  return ctx;
}
