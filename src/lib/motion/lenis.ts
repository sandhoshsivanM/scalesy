// Lenis smooth-scroll factory. Tuning matches the original Astro build
// (duration 1.05, smoothWheel). Instantiation + the RAF wiring live in
// SmoothScrollProvider so there is exactly one clock.
import Lenis from 'lenis';

export function createLenis(): Lenis {
  return new Lenis({
    duration: 1.05,
    smoothWheel: true,
    // Native momentum is better on touch; the provider only creates Lenis on
    // fine-pointer, no-reduced-motion devices, so this instance is desktop-only.
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
}

export type { Lenis };
