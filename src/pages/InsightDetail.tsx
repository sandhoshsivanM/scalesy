import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { insights } from '@/data/insights';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { TickedRule } from '@/components/ui/TickedRule';
import { formatDate } from '@/lib/format';
import NotFound from './NotFound';

export default function InsightDetail() {
  const { slug } = useParams();
  const i = insights.findIndex((p) => p.slug === slug);
  if (i === -1) return <NotFound />;
  const post = insights[i];
  const next = insights[(i + 1) % insights.length];

  return (
    <>
      <Seo
        title={`${post.title} — Scalesy`}
        description={post.excerpt}
        path={`/insights/${post.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          datePublished: post.date,
          articleSection: post.category,
          description: post.excerpt,
          author: { '@type': 'Organization', name: 'Scalesy' },
        }}
      />
      <article className="article">
        <header className="page-head wrap">
          <Link to="/insights" className="link-underline article__back">
            ← All insights
          </Link>
          <Reveal>
            <Eyebrow index="—">
              {post.category} · {post.readingTime}
            </Eyebrow>
          </Reveal>
          <SplitTextReveal as="h1" className="article__title" lines={[post.title]} />
          <Reveal as="p" className="article__date text-secondary" delay={140}>
            {formatDate(post.date)}
          </Reveal>
          <TickedRule className="page-head__rule" />
        </header>

        <div className="wrap">
          <div className="article__body measure">
            {post.body.map((para, idx) => (
              <Reveal as="p" className="article__para" delay={idx * 40} key={idx}>
                {para}
              </Reveal>
            ))}
          </div>

          <div className="article__next">
            <Link to={`/insights/${next.slug}`} className="project-next__link">
              <span className="project-next__label">Next insight</span>
              <span className="project-next__name">{next.title}</span>
              <span className="project-next__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
