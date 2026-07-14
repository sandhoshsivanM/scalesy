// Central GSAP setup — registered once, lazily, on the client. Keeps GSAP out
// of the SSR bundle and out of the LCP-critical path (imported dynamically by
// scenes after first paint).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from './easings';

let registered = false;

export function registerGsap() {
  if (registered || typeof window === 'undefined') return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);
  // Mirror the brand cubic-bezier as a named ease usable in tweens.
  gsap.defaults({ ease: `cubic-bezier(${EASE.join(',')})`, duration: 0.8 });
  registered = true;
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
