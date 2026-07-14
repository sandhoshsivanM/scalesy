interface TaglineProps {
  align?: 'start' | 'center';
  text?: string;
}

// "We scale brands digitally" in gold caps flanked by hairline rules.
export function Tagline({ align = 'start', text = 'We scale brands digitally' }: TaglineProps) {
  return (
    <p className={`tagline tagline--${align}`}>
      <span className="tagline__rule tagline__rule--lead" aria-hidden="true" />
      <span className="tagline__text">{text}</span>
      <span className="tagline__rule tagline__rule--trail" aria-hidden="true" />
    </p>
  );
}
