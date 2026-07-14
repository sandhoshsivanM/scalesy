import { useEffect, useRef, type ElementType, type ReactNode, createElement } from 'react';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';
import { getMotionState } from '@/lib/motion/MotionConfig';

interface ParallaxProps {
  speed?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

// Lightweight translate-only parallax, bound to Lenis scroll (or native).
// Viewport-culled, transform-only. Port of initParallax(). No-op under
// reduced-motion.
export function Parallax({ speed = 0.12, as = 'div', className, children }: ParallaxProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el || getMotionState().reducedMotion) return;

    const update = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}px, 0)`;
    };

    if (lenis) {
      lenis.on('scroll', update);
    } else {
      window.addEventListener('scroll', update, { passive: true });
    }
    window.addEventListener('resize', update);
    update();

    return () => {
      if (lenis) lenis.off('scroll', update);
      else window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [lenis, speed]);

  return createElement(as, { ref, className, 'data-parallax': speed }, children);
}
