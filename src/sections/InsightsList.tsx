import { Link } from 'react-router-dom';
import { insights } from '@/data/insights';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { formatDate } from '@/lib/format';

interface InsightsListProps {
  index?: string;
  limit?: number;
  showHead?: boolean;
}

export function InsightsList({ index = '08', limit, showHead = true }: InsightsListProps) {
  const items = limit ? insights.slice(0, limit) : insights;
  return (
    <section className="section insights" id="insights" aria-labelledby="insights-label">
      <div className="wrap">
        {showHead && (
          <div className="insights__head">
            <Reveal>
              <Eyebrow index={index} id="insights-label">
                Insights
              </Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <Link to="/insights" className="cta insights__all">
                <span>All insights</span>
                <span className="cta__arrow" aria-hidden="true">
                  →
                </span>
                <span className="cta__bar" />
              </Link>
            </Reveal>
          </div>
        )}

        <div className="insights__grid">
          {items.map((post, i) => (
            <Reveal as="article" className="insight-card" delay={i * 70} key={post.slug}>
              <Link to={`/insights/${post.slug}`} className="insight-card__link">
                <div className="insight-card__meta">
                  <span className="insight-card__cat">{post.category}</span>
                  <span className="insight-card__dot" aria-hidden="true">
                    ·
                  </span>
                  <span className="insight-card__time">{post.readingTime}</span>
                </div>
                <h3 className="insight-card__title">{post.title}</h3>
                <p className="insight-card__excerpt text-secondary">{post.excerpt}</p>
                <span className="insight-card__date text-secondary">{formatDate(post.date)}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
