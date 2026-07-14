import { useEffect, useRef } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { MeasureScale } from '@/components/graphics/MeasureScale';
import { getMotionState } from '@/lib/motion/MotionConfig';

const steps = [
  { n: '01', title: 'Discover', body: 'We learn the business before the brand — the economics, the audience, the constraints no one wrote down.' },
  { n: '02', title: 'Strategize', body: 'We decide what to do and, harder, what to refuse. The strategy is a short document you could defend under questioning.' },
  { n: '03', title: 'Create', body: 'The making begins only once the thinking is settled. Every craft decision inherits a reason from the strategy.' },
  { n: '04', title: 'Launch', body: 'We ship with intent — sequenced, instrumented, and ready to be read rather than merely admired.' },
  { n: '05', title: 'Measure', body: 'We watch the small set of numbers that actually govern decisions, and ignore the ones that only flatter.' },
  { n: '06', title: 'Scale', body: 'What works is compounded deliberately. Growth built on understanding is the only kind that holds.' },
];

// The Growth Framework — sticky intro (CSS) + a gold spine that draws down the
// step column as you scroll (GSAP scrub). Reduced-motion / mobile fall back to
// staggered reveals with a static spine.
export function GrowthFramework({ index = '06' }: { index?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const spineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const spine = spineRef.current;
    if (!list || !spine || getMotionState().reducedMotion) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const { registerGsap } = await import('@/lib/motion/registerGsap');
      if (cancelled) return;
      const { gsap } = registerGsap();
      ctx = gsap.context(() => {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: list,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.5,
            },
          },
        );
      }, list);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="section framework" id="framework" aria-labelledby="framework-label">
      <div className="wrap framework__inner">
        <aside className="framework__intro">
          <div className="framework__intro-inner">
            <Reveal>
              <Eyebrow index={index} id="framework-label">
                Growth Framework
              </Eyebrow>
            </Reveal>
            <Reveal as="h2" className="framework__title" delay={60}>
              A method that earns its confidence, in that order.
            </Reveal>
            <Reveal as="p" className="framework__note text-secondary" delay={120}>
              Six stages. None skipped, none reordered.
            </Reveal>
            <div className="framework__scale">
              <MeasureScale from={1} to={6} />
            </div>
          </div>
        </aside>

        <div className="framework__body">
          <svg className="framework__spine" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <line className="framework__spine-bg" x1="1" y1="0" x2="1" y2="100" />
            <line ref={spineRef} className="framework__spine-fill" x1="1" y1="0" x2="1" y2="100" />
          </svg>
          <ol className="framework__list" ref={listRef}>
            {steps.map((s, i) => (
              <Reveal as="li" className="fstep" delay={i * 50} key={s.n}>
                <span className="fstep__n">{s.n}</span>
                <div className="fstep__content">
                  <h3 className="fstep__title">{s.title}</h3>
                  <p className="fstep__body text-secondary">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
