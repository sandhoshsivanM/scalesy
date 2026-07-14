// Single source of truth for motion capability. Every provider/hook reads from
// here — no scattered matchMedia calls. SSR-safe (returns "static" defaults on
// the server, updates live on the client via media-query listeners).

export interface MotionState {
  reducedMotion: boolean;
  isTouch: boolean;
  canHover: boolean;
  prefersFine: boolean;
}

const SSR_DEFAULT: MotionState = {
  reducedMotion: false,
  isTouch: false,
  canHover: true,
  prefersFine: true,
};

const isBrowser = typeof window !== 'undefined' && typeof window.matchMedia === 'function';

const queries = isBrowser
  ? {
      reduce: window.matchMedia('(prefers-reduced-motion: reduce)'),
      coarse: window.matchMedia('(pointer: coarse)'),
      hover: window.matchMedia('(hover: hover)'),
      fine: window.matchMedia('(pointer: fine)'),
    }
  : null;

function read(): MotionState {
  if (!queries) return SSR_DEFAULT;
  return {
    reducedMotion: queries.reduce.matches,
    isTouch: queries.coarse.matches,
    canHover: queries.hover.matches,
    prefersFine: queries.fine.matches,
  };
}

let current: MotionState = read();
const listeners = new Set<(s: MotionState) => void>();

function refresh() {
  current = read();
  listeners.forEach((fn) => fn(current));
}

if (queries) {
  Object.values(queries).forEach((mq) => {
    // Safari <14 uses addListener; modern uses addEventListener.
    if (mq.addEventListener) mq.addEventListener('change', refresh);
    else mq.addListener(refresh);
  });
}

export function getMotionState(): MotionState {
  return current;
}

export function subscribeMotion(fn: (s: MotionState) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Convenience: is elaborate desktop motion allowed right now? */
export function canAnimate(s: MotionState = current): boolean {
  return !s.reducedMotion;
}

/** Convenience: should the custom cursor / magnetic layer run? */
export function canUseCursor(s: MotionState = current): boolean {
  return s.prefersFine && s.canHover && !s.reducedMotion && !s.isTouch;
}
