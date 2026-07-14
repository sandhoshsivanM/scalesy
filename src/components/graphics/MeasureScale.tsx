interface MeasureScaleProps {
  from?: number;
  to?: number;
  className?: string;
}

// Vertical precision scale — a ruler edge with graduated ticks and numerals.
export function MeasureScale({ from = 1, to = 6, className = '' }: MeasureScaleProps) {
  const count = to - from + 1;
  const majors = Array.from({ length: count }, (_, i) => from + i);
  const minors = Array.from({ length: (count - 1) * 4 }, (_, i) => i);

  return (
    <div className={`scale ${className}`.trim()}>
      <svg viewBox="0 0 120 520" className="scale__svg" role="img" aria-label="A precise measuring scale">
        <line className="scale__spine" x1="30" y1="20" x2="30" y2="500" />
        {minors.map((i) => {
          const y = 20 + ((500 - 20) / minors.length) * (i + 0.5);
          return <line className="scale__minor" key={`mn${i}`} x1="30" y1={y} x2="44" y2={y} />;
        })}
        {majors.map((n, i) => {
          const y = 20 + ((500 - 20) / (count - 1)) * i;
          return (
            <g key={`mj${n}`}>
              <line className="scale__major" x1="30" y1={y} x2="62" y2={y} />
              <text className="scale__num" x="74" y={y + 5}>{`0${n}`}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
