import { studio } from '@/data/studio';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { useReveal } from '@/hooks/useReveal';

export function Studio({ index = '03' }: { index?: string }) {
  const imgRef = useReveal<HTMLDivElement>();
  return (
    <section className="section studio" id="studio" aria-labelledby="studio-label">
      <div className="wrap studio__inner">
        <div className="studio__media img-reveal" ref={imgRef}>
          <img src={studio.image} alt="The Scalesy studio" width="1400" height="1000" loading="lazy" />
        </div>

        <div className="studio__text">
          <Reveal>
            <Eyebrow index={index} id="studio-label">
              Studio
            </Eyebrow>
          </Reveal>
          {studio.statement.map((p, i) => (
            <Reveal as="p" className="studio__statement" delay={80 + i * 80} key={i}>
              {p}
            </Reveal>
          ))}
          <Reveal className="studio__sign" delay={280}>
            <span className="studio__signature">{studio.signature}</span>
            <span className="studio__founded text-secondary">{studio.founded}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
