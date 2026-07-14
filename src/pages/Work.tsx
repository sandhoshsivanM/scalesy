import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { work } from '@/data/work';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { TickedRule } from '@/components/ui/TickedRule';
import { useReveal } from '@/hooks/useReveal';
import type { WorkProject } from '@/data/types';

export default function Work() {
  return (
    <>
      <Seo
        title="Work — Scalesy"
        description="Selected engagements across South India — brand strategy, identity, and measurable growth."
        path="/work"
      />
      <header className="page-head wrap">
        <Reveal>
          <Eyebrow index="—">Selected Work</Eyebrow>
        </Reveal>
        <SplitTextReveal as="h1" className="page-head__title" lines={['Work built', 'to be measured.']} />
        <Reveal as="p" className="page-head__lead measure" delay={160}>
          A small number of engagements, chosen because the thinking behind them still holds up.
        </Reveal>
        <TickedRule className="page-head__rule" />
      </header>

      <section className="section work-index">
        <div className="wrap">
          <div className="work-index__list">
            {work.map((p, i) => (
              <WorkRow key={p.slug} p={p} alt={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function WorkRow({ p, alt }: { p: WorkProject; alt: boolean }) {
  const imgRef = useReveal<HTMLAnchorElement>();
  return (
    <article className={`work-item ${alt ? 'work-item--alt' : ''}`.trim()}>
      <Link className="work-item__media img-reveal" to={`/work/${p.slug}`} aria-label={`View ${p.name}`} ref={imgRef}>
        <img src={p.image} alt={`${p.name} — ${p.industry}`} loading="lazy" width="1600" height="1067" />
      </Link>
      <Reveal className="work-item__meta">
        <p className="work-item__tag">{p.industry}</p>
        <p className="work-item__result">{p.outcome}</p>
        <h3 className="work-item__name">{p.name}</h3>
        <p className="work-item__excerpt text-secondary">{p.excerpt}</p>
        <dl className="work-item__facts">
          <div>
            <dt>Services</dt>
            <dd>{p.services.join(', ')}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{p.year}</dd>
          </div>
        </dl>
        <Link className="cta work-item__cta" to={`/work/${p.slug}`}>
          <span>View Project</span>
          <span className="cta__arrow" aria-hidden="true">
            →
          </span>
          <span className="cta__bar" />
        </Link>
      </Reveal>
    </article>
  );
}
