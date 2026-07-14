import { asset } from '@/lib/paths';
import { Tagline } from '@/components/ui/Tagline';
import { TickedRule } from '@/components/ui/TickedRule';
import { Reveal } from '@/components/ui/Reveal';
import { Parallax } from '@/components/ui/Parallax';

// Full-bleed dark brand band. `.on-ink` re-scopes tokens for either theme.
export function BrandMoment() {
  return (
    <section className="brand-moment on-ink" aria-label="Scalesy">
      <div className="wrap">
        <TickedRule />
        <Reveal className="brand-moment__inner">
          <Parallax as="div" className="brand-moment__mark-wrap" speed={0.14}>
            <img
              className="brand-moment__mark"
              src={asset('/brand/scalesy-mark.png')}
              alt="Scalesy mark"
              width="530"
              height="763"
              loading="lazy"
            />
          </Parallax>
          <p className="brand-moment__statement">Precision is the product.</p>
          <div className="brand-moment__tagline">
            <Tagline align="center" />
          </div>
        </Reveal>
        <TickedRule />
      </div>
    </section>
  );
}
