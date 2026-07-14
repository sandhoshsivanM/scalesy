import { useEffect, useState } from 'react';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';

// Boolean scroll-past-threshold flag for the header state. Reads from Lenis's
// scroll event when present, else native scroll. Flips a boolean (no per-pixel
// style writes) — mirrors initHeader() from the Astro build.
export function useScrolled(threshold = 8): boolean {
  const { lenis } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    if (lenis) {
      lenis.on('scroll', onScroll);
      return () => lenis.off('scroll', onScroll);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lenis, threshold]);

  return scrolled;
}
