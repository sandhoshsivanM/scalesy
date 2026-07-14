import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { work } from '@/data/work';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { useReveal } from '@/hooks/useReveal';
import NotFound from './NotFound';

export default function WorkDetail() {
  const { slug } = useParams();
  const coverRef = useReveal<HTMLElement>();
  const i = work.findIndex((p) => p.slug === slug);
  if (i === -1) return <NotFound />;
  const project = work[i];
  const next = work[(i + 1) % work.length];

  return (
    <>
      <Seo
        title={`${project.name} — Scalesy`}
        description={project.excerpt}
        path={`/work/${project.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          about: project.industry,
          dateCreated: project.year,
          description: project.excerpt,
        }}
      />
      <article className="project">
        <header className="project-head wrap">
          <Link to="/work" className="link-underline project-head__back">
            ← All work
          </Link>
          <Reveal>
            <Eyebrow index="—">
              {project.industry} · {project.year}
            </Eyebrow>
          </Reveal>
          <SplitTextReveal as="h1" className="project-head__title" lines={[project.name]} />
          <Reveal as="p" className="project-head__intro measure" delay={160}>
            {project.intro}
          </Reveal>
          <Reveal as="dl" className="project-head__facts" delay={220}>
            <div>
              <dt>Industry</dt>
              <dd>{project.industry}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>{project.services.join(', ')}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </Reveal>
        </header>

        <div className="wrap">
          <figure className="project-cover img-reveal" ref={coverRef}>
            <img src={project.image} alt={`${project.name} — ${project.industry}`} width="1600" height="900" />
          </figure>
        </div>

        <div className="wrap">
          <div className="project-body">
            {project.sections.map((s, idx) => (
              <Reveal as="section" className="project-block" delay={idx * 60} key={s.heading}>
                <h2 className="project-block__heading">{s.heading}</h2>
                <p className="project-block__body">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="wrap project-next">
          <Link to={`/work/${next.slug}`} className="project-next__link">
            <span className="project-next__label">Next project</span>
            <span className="project-next__name">{next.name}</span>
            <span className="project-next__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </article>
    </>
  );
}
