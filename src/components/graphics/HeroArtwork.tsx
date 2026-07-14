import { useReveal } from '@/hooks/useReveal';

// The cinematic hero measurement artwork. A blueprint-style precision field:
// a faint measured grid, a graduated left scale, an ascending gold line that
// draws in, plotted nodes, and floating precision labels. Hairline gold only —
// no fills, gradients, or glow. Everything is transform/stroke based and the
// draw-in is CSS-driven off `.hero-art.is-visible` (reduced-motion safe).

const pts: Array<[number, number]> = [
  [70, 470],
  [190, 424],
  [300, 372],
  [410, 300],
  [520, 208],
  [615, 96],
];
const poly = pts.map((p) => p.join(',')).join(' ');

export function HeroArtwork() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="hero-art" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 680 560" className="hero-art__svg" role="presentation">
        {/* measured grid */}
        <g className="hero-art__grid">
          {[104, 178, 252, 326, 400, 474].map((y) => (
            <line key={`h${y}`} x1="60" y1={y} x2="648" y2={y} />
          ))}
          {[190, 300, 410, 520].map((x) => (
            <line key={`v${x}`} x1={x} y1="40" x2={x} y2="520" />
          ))}
        </g>

        {/* axes */}
        <line className="hero-art__axis" x1="60" y1="40" x2="60" y2="520" />
        <line className="hero-art__axis" x1="60" y1="520" x2="648" y2="520" />

        {/* left graduated scale */}
        <g className="hero-art__scale">
          {[520, 446, 372, 298, 224, 150, 76].map((y, i) => (
            <g key={`s${y}`}>
              <line x1="52" y1={y} x2="60" y2={y} />
              <text x="44" y={y + 4} className="hero-art__num">{`0${i}`}</text>
            </g>
          ))}
        </g>

        {/* baseline x ticks */}
        <g className="hero-art__scale">
          {pts.map((p, i) => (
            <g key={`x${i}`}>
              <line x1={p[0]} y1="520" x2={p[0]} y2="528" />
              <text x={p[0]} y="544" className="hero-art__num hero-art__num--x">{`0${i + 1}`}</text>
            </g>
          ))}
        </g>

        {/* the growth line + nodes */}
        <polyline className="hero-art__line" points={poly} pathLength={1} />
        <g className="hero-art__nodes">
          {pts.map((p, i) => (
            <rect key={`n${i}`} x={p[0] - 4} y={p[1] - 4} width="8" height="8" style={{ '--i': i } as React.CSSProperties} />
          ))}
        </g>

        {/* scanning vertical guide */}
        <line className="hero-art__scan" x1="0" y1="40" x2="0" y2="520" />
      </svg>

      {/* floating precision labels */}
      <span className="hero-art__label hero-art__label--a">
        <span className="hero-art__label-k">Δ Growth</span>
        <span className="hero-art__label-v">+3.4×</span>
      </span>
      <span className="hero-art__label hero-art__label--b">
        <span className="hero-art__label-k">Confidence</span>
        <span className="hero-art__label-v">measured</span>
      </span>
      <span className="hero-art__label hero-art__label--c">Fig. 01 — Scale, plotted</span>
    </div>
  );
}
