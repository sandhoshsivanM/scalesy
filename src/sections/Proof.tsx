import { proof } from '@/data/proof';
import type { ProofFigure } from '@/data/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Parallax } from '@/components/ui/Parallax';
import { GrowthPlot } from '@/components/graphics/GrowthPlot';
import { useCountUp } from '@/hooks/useCountUp';

function Figure({ f }: { f: ProofFigure }) {
  const { ref, display } = useCountUp({
    target: f.count ?? 0,
    pad: f.pad,
    prefix: f.prefix,
    suffix: f.suffix,
  });
  return (
    <li className="figure">
      {f.count != null ? (
        <span className="figure__value" ref={ref as React.RefObject<HTMLSpanElement>}>
          {display}
        </span>
      ) : (
        <span className="figure__value">{f.value}</span>
      )}
      <span className="figure__label">{f.label}</span>
      <span className="figure__sub text-secondary">{f.sub}</span>
    </li>
  );
}

export function Proof() {
  return (
    <section className="section proof" aria-label="How we work">
      <div className="wrap proof__inner">
        <div className="proof__text">
          <Reveal>
            <Eyebrow index="—">Proof</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="proof__title">
            Not louder marketing. A system you can measure.
          </Reveal>
          <Reveal as="ul" className="proof__figures" delay={120}>
            {proof.figures.map((f) => (
              <Figure f={f} key={f.label} />
            ))}
          </Reveal>
        </div>

        <Parallax className="proof__figure" speed={0.07}>
          <GrowthPlot />
        </Parallax>
      </div>
    </section>
  );
}
