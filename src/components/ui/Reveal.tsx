import { createElement, type ElementType, type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
  'aria-hidden'?: boolean;
}

/**
 * Fade-and-rise on viewport entry. Port of the Astro Reveal.astro. Content is
 * visible by default; the hidden→shown transition only engages under
 * html.motion-ready (JS present + motion allowed).
 */
export function Reveal({ as = 'div', delay = 0, className, children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      className,
      'data-reveal': '',
      style: delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined,
      ...rest,
    },
    children,
  );
}
