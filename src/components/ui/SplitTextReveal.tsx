import { createElement, type ElementType } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface SplitTextRevealProps {
  /** Each string is one line; rendered pre-split so it is SSR-safe + zero-cost. */
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Extra per-line stagger, ms. */
  stagger?: number;
  id?: string;
}

/**
 * Masked line-by-line reveal (the "Measure. / Scale. / Grow." wipe). Lines are
 * authored explicitly so there is no runtime measurement/splitting cost and the
 * markup hydrates cleanly. Each line's inner span translates up from 105%.
 */
export function SplitTextReveal({
  lines,
  as = 'h2',
  className,
  delay = 0,
  stagger = 90,
  id,
}: SplitTextRevealProps) {
  const ref = useReveal<HTMLElement>();
  return createElement(
    as,
    { ref, className, id, 'data-reveal-lines': '' },
    lines.map((line, i) => (
      <span className="line" key={i}>
        <span style={{ '--reveal-delay': `${delay + i * stagger}ms` } as React.CSSProperties}>
          {line}
        </span>
      </span>
    )),
  );
}
