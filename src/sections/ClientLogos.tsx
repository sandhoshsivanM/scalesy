import { clients } from '@/data/clients';

// Continuous monochrome marquee, pause on hover, faded edges. The row is
// duplicated so the translateX loop is seamless. Motion is CSS-only and pauses
// under reduced-motion.
export function ClientLogos() {
  const row = [...clients, ...clients];
  return (
    <section className="clients" aria-label="Selected clients">
      <div className="wrap">
        <p className="clients__label eyebrow">Trusted by houses across South India</p>
      </div>
      <div className="clients__marquee" aria-hidden="true">
        <div className="clients__track">
          {row.map((name, i) => (
            <span className="clients__item" key={`${name}-${i}`}>
              {name}
              <span className="clients__sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
