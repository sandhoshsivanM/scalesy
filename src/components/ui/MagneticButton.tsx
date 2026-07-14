import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useCursor } from '@/providers/CursorProvider';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** internal route (Link) */
  to?: string;
  /** external / mailto / tel */
  href?: string;
  strength?: number;
  ariaLabel?: string;
  cursorLabel?: string;
}

/**
 * A CTA/link with a subtle magnetic pull toward the pointer (desktop, fine
 * pointer, no reduced-motion only — the hook is a no-op otherwise). Renders a
 * router <Link> for `to`, an <a> for `href`.
 */
export function MagneticButton({
  children,
  className,
  to,
  href,
  strength = 0.35,
  ariaLabel,
  cursorLabel,
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, { strength });
  const { setCursor } = useCursor();

  const hoverProps = {
    onMouseEnter: () => setCursor(cursorLabel ? 'label' : 'view', cursorLabel),
    onMouseLeave: () => setCursor('default'),
  };

  if (to) {
    return (
      <Link ref={ref} to={to} className={className} aria-label={ariaLabel} {...hoverProps}>
        {children}
      </Link>
    );
  }
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
      {...hoverProps}
    >
      {children}
    </a>
  );
}
