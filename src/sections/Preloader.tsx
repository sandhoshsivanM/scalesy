import { useEffect, useState } from 'react';
import { getMotionState } from '@/lib/motion/MotionConfig';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';

type State = 'init' | 'active' | 'exiting' | 'gone';

// Branded intro. Client-only: renders nothing during SSR so the prerendered
// HTML stays clean (great for LCP/SEO and no-JS users — no black overlay ever
// gets stranded). On the client's first visit it fades a mark in, expands a
// gold measurement line, then lifts a curtain. Reduced-motion / return visits
// skip it. It sits over an already-painted Hero, so it never delays LCP.
export function Preloader() {
  const { stop, start } = useSmoothScroll();
  const [state, setState] = useState<State>('init');

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
    const CURTAIN = 1100;
    const started = performance.now();
    let exitTimer = 0;
    let goneTimer = 0;
    let capTimer = 0;

    const finish = () => {
      setState('gone');
      start();
    };

    const beginExit = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_BEAT - elapsed);
      exitTimer = window.setTimeout(() => {
        setState('exiting');
        start();
        goneTimer = window.setTimeout(() => setState('gone'), CURTAIN);
      }, wait);
    };

    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    if (fontsReady) fontsReady.then(beginExit).catch(beginExit);
    else beginExit();

    capTimer = window.setTimeout(finish, HARD_CAP);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(goneTimer);
      clearTimeout(capTimer);
      start();
    };
  }, [stop, start]);

  if (state === 'init' || state === 'gone') return null;

  return (
    <div className="preloader" data-hidden={state === 'exiting' ? 'true' : undefined} role="presentation">
      <div className="preloader__inner">
        <span className="preloader__mark logo">
          SCALESY<span className="logo__dot" aria-hidden="true">.</span>
        </span>
        <div className="preloader__line" />
        <span className="preloader__label">Measure · Scale · Grow</span>
      </div>
    </div>
  );
}
