import { useEffect, type RefObject } from 'react';
import type { gsap as GsapType, ScrollTrigger as STType } from '@/lib/motion/registerGsap';

interface SceneCtx {
  gsap: typeof GsapType;
  ScrollTrigger: typeof STType;
  el: HTMLElement;
}

/**
 * Create a GSAP ScrollTrigger scene bound to `ref`, with leak-proof cleanup via
 * gsap.context().revert(). GSAP is dynamically imported so it stays out of the
 * LCP-critical bundle. The scene never runs under reduced-motion; the caller's
 * markup must remain fully legible without it. `deps` re-run the scene.
 */
export function useScrollScene(
  ref: RefObject<HTMLElement>,
  setup: (ctx: SceneCtx) => void,
  deps: unknown[] = [],
  { disabled = false }: { disabled?: boolean } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const { registerGsap } = await import('@/lib/motion/registerGsap');
      if (cancelled) return;
      const { gsap, ScrollTrigger } = registerGsap();
      ctx = gsap.context(() => setup({ gsap, ScrollTrigger, el }), el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, ...deps]);
}
