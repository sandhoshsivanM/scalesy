import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';

const principles = [
  { k: 'A', t: 'Clarity over volume' },
  { k: 'B', t: 'Margin over vanity' },
  { k: 'C', t: 'Consequence over noise' },
];

export function Manifesto() {
  return (
    <section className="section manifesto" id="manifesto" aria-labelledby="manifesto-label">
      <div className="wrap manifesto__inner">
        <Reveal className="manifesto__label">
          <Eyebrow index="02" id="manifesto-label">
            Manifesto
          </Eyebrow>
        </Reveal>

        <div className="manifesto__body">
          <SplitTextReveal
            as="p"
            className="manifesto__lead"
            lines={['We believe great marketing', 'isn’t louder. It’s smarter.']}
          />

          <Reveal className="manifesto__side" delay={120}>
            <p className="manifesto__coda">
              Every decision should have purpose. Every campaign should create measurable impact. We
              are not in the business of noise — we are in the business of consequence.
            </p>

            <div className="manifesto__principles">
              <p className="manifesto__principles-label">What we hold to</p>
              <ul>
                {principles.map((p) => (
                  <li className="principle" key={p.k}>
                    <span className="principle__k">{p.k}</span>
                    <span className="principle__t">{p.t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
