import { useEffect, useRef } from 'react';

// One shared IntersectionObserver for every reveal on the page — far cheaper
// than an observer (or a ScrollTrigger) per element. Elements are revealed by
// adding `is-visible` imperatively (post-hydration), so React never reconciles
// the class away and the "content visible by default" fail-safe holds.

type El = HTMLElement;

let observer: IntersectionObserver | null = null;
const revealed = new WeakSet<El>();

function ensureObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as El;
          el.classList.add('is-visible');
          revealed.add(el);
          obs.unobserve(el);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  return observer;
}

export function useReveal<T extends El = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed.has(el)) return;

    const obs = ensureObserver();
    if (!obs) {
      el.classList.add('is-visible');
      return;
    }
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  return ref;
}
