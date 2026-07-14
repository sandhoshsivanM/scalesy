import { useEffect, useState } from 'react';
import { getMotionState } from '@/lib/motion/MotionConfig';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';

// Branded intro. Black screen → mark fades in → gold measurement line expands →
// curtain lifts. First-visit only (sessionStorage). Renders over an
// already-painted Hero so it never delays LCP. Reduced-motion / return visits
// skip it entirely. On the server it renders nothing (SSG output stays clean).
export function Preloader() {
  const { stop, start } = useSmoothScroll();
  const [state, setState] = useState<'init' | 'active' | 'gone'>('init');

  useEffect(() => {
    const { reducedMotion } = getMotionState();
    let seen = false;
    try {
      seen = sessionStorage.getItem('scalesy-intro-seen') === '1';
    } catch {
      /* ignore */
    }
    if (reducedMotion || seen) {
      setState('gone');
      return;
    }

    setState('active');
    stop();
    try {
      sessionStorage.setItem('scalesy-intro-seen', '1');
    } catch {
      /* ignore */
    }

    const MIN_BEAT = 1200;
    const HARD_CAP = 2600;
    const started = performance.now();
    let hideTimer = 0;
    let doneTimer = 0;

    const beginExit = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_BEAT - elapsed);
      hideTimer = window.setTimeout(() => {
        setState('gone');
        start();
      }, wait);
    };

    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    if (fontsReady) {
      fontsReady.then(beginExit).catch(beginExit);
    } else {
      beginExit();
    }
    // Hard cap: never strand the user behind a slow font.
    doneTimer = window.setTimeout(() => {
      setState('gone');
      start();
    }, HARD_CAP);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
      start();
    };
  }, [stop, start]);

  if (state === 'init' || state === 'gone') {
    // Nothing rendered once gone; on very first client tick 'init' briefly holds
    // the overlay via CSS-less null — acceptable since Hero is already visible.
    if (state === 'gone') return null;
  }

  return (
    <div className="preloader" data-hidden={state === 'gone' ? 'true' : undefined} role="presentation">
      <div className="preloader__inner">
        <svg className="preloader__mark" viewBox="0 0 48 34" aria-hidden="true">
          <text
            x="0"
            y="26"
            fontFamily="var(--font-display)"
            fontSize="26"
            fontWeight="500"
            fill="#F5F4F0"
            letterSpacing="0.5"
          >
            S
          </text>
          <text x="20" y="26" fontFamily="var(--font-display)" fontSize="26" fontWeight="500" fill="#CFA94A">
            .
          </text>
        </svg>
        <div className="preloader__line" />
        <span className="preloader__label">Measure · Scale · Grow</span>
      </div>
    </div>
  );
}
