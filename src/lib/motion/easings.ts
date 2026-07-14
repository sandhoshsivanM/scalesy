// The single brand easing curve, mirrored across CSS (--ease), GSAP (CustomEase
// 'brand'), and Framer Motion. cubic-bezier(0.22, 0.61, 0.36, 1).
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
export const EASE_CSS = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

// Framer Motion transition presets built on the brand curve.
export const spring = { type: 'spring', stiffness: 420, damping: 34, mass: 0.9 } as const;
export const tween = (duration = 0.7, delay = 0) =>
  ({ duration, delay, ease: EASE }) as const;
