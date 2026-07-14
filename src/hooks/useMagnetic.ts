import { useEffect, type RefObject } from 'react';
import { getMotionState, canUseCursor } from '@/lib/motion/MotionConfig';

interface MagneticOptions {
  strength?: number;
  /** px padding around the element that counts as the magnetic field. */
  padding?: number;
}

// Magnetic pull toward the pointer, transform-only, spring-back on leave. No-op
// on touch / coarse pointer / reduced-motion. Uses a small internal lerp on rAF.
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T>,
  { strength = 0.35, padding = 24 }: MagneticOptions = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canUseCursor(getMotionState())) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let active = false;

    const render = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1 || active) {
        raf = requestAnimationFrame(render);
      } else {
        el.style.transform = '';
        raf = 0;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const withinX = e.clientX >= r.left - padding && e.clientX <= r.right + padding;
      const withinY = e.clientY >= r.top - padding && e.clientY <= r.bottom + padding;
      if (!withinX || !withinY) {
        active = false;
        tx = 0;
        ty = 0;
        kick();
        return;
      }
      active = true;
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      tx = mx * strength;
      ty = my * strength;
      kick();
    };

    const onLeave = () => {
      active = false;
      tx = 0;
      ty = 0;
      kick();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [ref, strength, padding]);
}
