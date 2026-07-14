import { useReveal } from '@/hooks/useReveal';

interface GrowthPlotProps {
  label?: boolean;
  className?: string;
}

// Measurement-inspired brand graphic: a precision plot with a tick grid and an
// ascending gold line that draws in on reveal (stroke-dashoffset). Hairline gold
// only — no fills, gradients, or glow.
const pts: Array<[number, number]> = [
  [40, 372],
  [110, 338],
  [180, 300],
  [250, 232],
  [320, 150],
  [380, 72],
];
const poly = pts.map((p) => p.join(',')).join(' ');

export function GrowthPlot({ label = true, className = '' }: GrowthPlotProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className={`plot ${className}`.trim()} ref={ref} data-reveal-plot>
      <svg viewBox="0 0 400 460" className="plot__svg" role="img" aria-label="Growth plotted against precise measurement">
        <g className="plot__grid">
          {[80, 152, 224, 296, 368].map((y) => (
            <line key={y} x1="40" y1={y} x2="392" y2={y} />
          ))}
        </g>
        <line className="plot__axis" x1="40" y1="40" x2="40" y2="400" />
        <line className="plot__axis" x1="40" y1="400" x2="392" y2="400" />
        <g className="plot__ticks">
          {pts.map((p, i) => (
            <g key={`t${i}`}>
              <line x1={p[0]} y1="400" x2={p[0]} y2="408" />
              <text x={p[0]} y="424" className="plot__num">{`0${i + 1}`}</text>
            </g>
          ))}
        </g>
        <g className="plot__ticks">
          {[400, 328, 256, 184, 112, 40].map((y) => (
            <line key={`y${y}`} x1="32" y1={y} x2="40" y2={y} />
          ))}
        </g>
        <polyline className="plot__line" points={poly} pathLength={1} />
        <g className="plot__nodes">
          {pts.map((p, i) => (
            <rect key={`n${i}`} x={p[0] - 3.5} y={p[1] - 3.5} width="7" height="7" />
          ))}
        </g>
      </svg>
      {label && (
        <div className="plot__caption">
          <span>Fig. 01</span>
          <span>Growth, measured</span>
        </div>
      )}
    </div>
  );
}
