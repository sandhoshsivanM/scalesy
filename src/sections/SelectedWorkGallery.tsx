import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { featuredWork } from '@/data/work';
import type { WorkProject } from '@/data/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { useReveal } from '@/hooks/useReveal';
import { useCursor } from '@/providers/CursorProvider';
import { getMotionState } from '@/lib/motion/MotionConfig';

interface GalleryProps {
  index?: string;
}

// Selected Work — a pinned horizontal filmstrip on desktop, a vertical stack on
// mobile / reduced-motion. GSAP scrubs the track's X against scroll while the
// section is pinned; gsap.matchMedia owns breakpoint teardown.
export function SelectedWorkGallery({ index = '05' }: GalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { setCursor } = useCursor();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || getMotionState().reducedMotion) return;

    let mm: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const { registerGsap } = await import('@/lib/motion/registerGsap');
      if (cancelled) return;
      const { gsap } = registerGsap();
      mm = gsap.matchMedia();
      mm.add('(min-width: 861px)', () => {
        const distance = () => track.scrollWidth - window.innerWidth * 0.92;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.scrollTrigger?.kill();
      });
    })();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  return (
    <section className="work-gallery" id="work" aria-labelledby="work-label" ref={sectionRef}>
      <div className="work-gallery__viewport">
        <div className="wrap work-gallery__head">
          <Reveal>
            <Eyebrow index={index} id="work-label">
              Selected Work
            </Eyebrow>
          </Reveal>
          <Reveal as="p" className="work-gallery__note text-secondary measure-narrow" delay={80}>
            A small number of engagements, chosen because the thinking behind them still holds up.
          </Reveal>
        </div>

        <div className="work-gallery__track" ref={trackRef}>
          {featuredWork.map((p, i) => (
            <WorkPanel key={p.slug} p={p} n={i + 1} onCursor={setCursor} />
          ))}
          <ViewAllPanel />
        </div>
      </div>
    </section>
  );
}

function WorkPanel({
  p,
  n,
  onCursor,
}: {
  p: WorkProject;
  n: number;
  onCursor: (m: 'view' | 'default', label?: string) => void;
}) {
  const imgRef = useReveal<HTMLDivElement>();
  return (
    <article className="work-panel">
      <Link
        to={`/work/${p.slug}`}
        className="work-panel__link"
        aria-label={`View ${p.name}`}
        onMouseEnter={() => onCursor('view', 'View')}
        onMouseLeave={() => onCursor('default')}
      >
        <div className="work-panel__media img-reveal" ref={imgRef}>
          <img src={p.image} alt={`${p.name} — ${p.industry}`} width="1600" height="1067" loading="lazy" />
          <span className="work-panel__n">{String(n).padStart(2, '0')}</span>
        </div>
        <div className="work-panel__meta">
          <span className="work-panel__tag">{p.industry}</span>
          <h3 className="work-panel__result">{p.outcome}</h3>
          <span className="work-panel__name text-secondary">{p.name}</span>
          <span className="work-panel__services text-secondary">{p.services.join(' · ')}</span>
        </div>
      </Link>
    </article>
  );
}

function ViewAllPanel() {
  return (
    <article className="work-panel work-panel--all">
      <Link to="/work" className="work-panel__all-link">
        <span className="work-panel__all-label">The full index</span>
        <span className="work-panel__all-cta cta">
          <span>View all work</span>
          <span className="cta__arrow" aria-hidden="true">
            →
          </span>
          <span className="cta__bar" />
        </span>
      </Link>
    </article>
  );
}
