import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'header' | 'footer';
}

// Live-text wordmark — crisp at any size, themeable, zero image weight.
export function Logo({ variant = 'header' }: LogoProps) {
  const content = (
    <span className="logo__word">
      SCALESY<span className="logo__dot" aria-hidden="true">.</span>
    </span>
  );
  if (variant === 'footer') {
    return <span className="logo logo--footer">{content}</span>;
  }
  return (
    <Link to="/" className="logo" aria-label="Scalesy — home">
      {content}
    </Link>
  );
}
