import { useEffect, useRef, useState } from 'react';
import { getMotionState } from '@/lib/motion/MotionConfig';

interface CountUpOptions {
  target: number;
  pad?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

// rAF easeOutCubic count-up, triggered once when the element enters view.
// Port of initCounters() from the Astro build. Reduced-motion → final value.
export function useCountUp({ target, pad = 0, prefix = '', suffix = '', duration = 1400 }: CountUpOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const decimals = String(target).split('.')[1]?.length ?? 0;

  const format = (v: number) => {
    let n = decimals ? v.toFixed(decimals) : String(Math.round(v));
    if (pad) n = n.padStart(pad, '0');
    return prefix + n + suffix;
  };

  const [display, setDisplay] = useState(() => format(0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (getMotionState().reducedMotion) {
        setDisplay(format(target));
        return;
      }
      let start: number | null = null;
      const step = (t: number) => {
        if (start === null) start = t;
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(format(target * eased));
        if (p < 1) requestAnimationFrame(step);
        else setDisplay(format(target));
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, pad, prefix, suffix, duration]);

  return { ref, display };
}
