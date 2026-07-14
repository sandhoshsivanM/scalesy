import { Tagline } from '@/components/ui/Tagline';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { Reveal } from '@/components/ui/Reveal';
import { TickedRule } from '@/components/ui/TickedRule';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroArtwork } from '@/components/graphics/HeroArtwork';

const pills = ['Strategy before craft', 'A few engagements a year', 'Measurable by design'];

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="wrap hero__inner">
        <div className="hero__lead">
          <Reveal className="hero__eyebrow">
            <Tagline align="start" />
          </Reveal>

          <SplitTextReveal
            as="h1"
            className="hero__headline"
            lines={['Measure.', 'Scale.', 'Grow.']}
          />

          <Reveal as="p" className="hero__sub measure" delay={200}>
            A branding studio for companies that would rather be understood than merely seen. We do
            the thinking first — and let measurable growth follow from it.
          </Reveal>

          <Reveal as="ul" className="hero__pills" delay={280}>
            {pills.map((p) => (
              <li className="pill" key={p}>
                {p}
              </li>
            ))}
          </Reveal>

          <Reveal className="hero__actions" delay={340}>
            <MagneticButton to="/contact" className="btn" cursorLabel="Book">
              Book a Discovery Call{' '}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </MagneticButton>
            <MagneticButton to="/work" className="btn btn--ghost" cursorLabel="View">
              View our work
            </MagneticButton>
          </Reveal>

          <Reveal className="hero__meta" delay={400}>
            <span>Studio — Chennai, Tamil Nadu</span>
            <span>Working across South India</span>
            <span className="hero__meta-est">Est. MMXIX</span>
          </Reveal>
        </div>

        <Reveal className="hero__art-wrap" delay={160}>
          <HeroArtwork />
        </Reveal>
      </div>

      <div className="wrap hero__foot">
        <TickedRule className="hero__rule" />
        <a href="#manifesto" className="hero__scroll" aria-label="Scroll to explore">
          <span>Scroll</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
