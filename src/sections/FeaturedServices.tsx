import { Link } from 'react-router-dom';
import { services } from '@/data/services';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { useCursor } from '@/providers/CursorProvider';

// Editorial service list — no cards, no icons. Row hover lifts the title and
// draws a gold rule; the summary reveals alongside.
export function FeaturedServices({ index = '04' }: { index?: string }) {
  const { setCursor } = useCursor();
  return (
    <section className="section services" id="services" aria-labelledby="services-label">
      <div className="wrap">
        <div className="services__head">
          <Reveal>
            <Eyebrow index={index} id="services-label">
              Services
            </Eyebrow>
          </Reveal>
          <Reveal as="p" className="services__note text-secondary measure-narrow" delay={80}>
            Seven disciplines, held to one editorial standard. Engaged together, they compound.
          </Reveal>
        </div>

        <ol className="services__list">
          {services.map((s, i) => (
            <Reveal
              as="li"
              className="service-row"
              delay={i * 40}
              key={s.title}
            >
              <Link
                to="/contact"
                className="service-row__link"
                onMouseEnter={() => setCursor('view', 'Enquire')}
                onMouseLeave={() => setCursor('default')}
              >
                <span className="service-row__n">{`0${i + 1}`}</span>
                <span className="service-row__title">{s.title}</span>
                <span className="service-row__summary text-secondary">{s.summary}</span>
                <span className="service-row__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
