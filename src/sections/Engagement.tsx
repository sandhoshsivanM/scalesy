import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const stages = [
  {
    n: '01',
    title: 'A conversation',
    body: 'We start with the business, not the brief. A 45-minute call to understand what you are really trying to move.',
  },
  {
    n: '02',
    title: 'A considered proposal',
    body: 'A short, defensible plan — scope, sequence, and the number we intend to change. No padding, no theatre.',
  },
  {
    n: '03',
    title: 'A partnership',
    body: 'One point of contact, a small senior team, and a cadence built around consequence rather than activity.',
  },
];

export function Engagement({ index = '07' }: { index?: string }) {
  return (
    <section className="section engagement" id="engagement" aria-labelledby="engagement-label">
      <div className="wrap">
        <div className="engagement__head">
          <Reveal>
            <Eyebrow index={index} id="engagement-label">
              How we work
            </Eyebrow>
          </Reveal>
          <Reveal as="h2" className="engagement__title" delay={80}>
            A small number of engagements, given real attention.
          </Reveal>
        </div>

        <div className="engagement__grid">
          {stages.map((s, i) => (
            <Reveal className="engagement__col" delay={i * 80} key={s.n}>
              <span className="engagement__n">{s.n}</span>
              <h3 className="engagement__col-title">{s.title}</h3>
              <p className="engagement__col-body text-secondary">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
