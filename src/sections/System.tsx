import { useCallback, useEffect, useRef, useState } from 'react';
import { disciplines } from '@/data/system';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { getMotionState } from '@/lib/motion/MotionConfig';

// "The System" — a tablist of four disciplines with keyboard support and
// in-view auto-advance (5s). Port of initSystem().
export function System() {
  const [active, setActive] = useState(disciplines[0].key);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const inView = useRef(false);

  const stopAuto = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    if (getMotionState().reducedMotion || !inView.current) return;
    stopAuto();
    timer.current = window.setInterval(() => {
      setActive((cur) => {
        const i = disciplines.findIndex((d) => d.key === cur);
        return disciplines[(i + 1) % disciplines.length].key;
      });
    }, 5000);
  }, [stopAuto]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          inView.current = e.isIntersecting;
          if (e.isIntersecting) startAuto();
          else stopAuto();
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopAuto();
    };
  }, [startAuto, stopAuto]);

  const select = (key: string) => {
    setActive(key);
    stopAuto();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = disciplines.findIndex((d) => d.key === active);
    const next =
      e.key === 'ArrowRight'
        ? (i + 1) % disciplines.length
        : (i - 1 + disciplines.length) % disciplines.length;
    select(disciplines[next].key);
    const btn = rootRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab="${disciplines[next].key}"]`,
    );
    btn?.focus();
  };

  return (
    <section className="section system" id="system" aria-labelledby="system-label">
      <div className="wrap">
        <Reveal className="system__head">
          <Eyebrow index="—" id="system-label">
            The System
          </Eyebrow>
          <h2 className="system__title">
            Four disciplines.
            <br />
            One connected engine.
          </h2>
          <p className="system__note text-secondary measure-narrow">
            We don’t sell services in isolation. Each discipline feeds the next — and what we learn
            at the end returns to the start.
          </p>
        </Reveal>

        <div className="system__engine" ref={rootRef} onKeyDown={onKeyDown}>
          <div className="system__tabs" role="tablist" aria-label="Disciplines">
            {disciplines.map((d) => (
              <button
                key={d.key}
                className="system__tab"
                role="tab"
                data-tab={d.key}
                aria-selected={active === d.key}
                aria-controls={`panel-${d.key}`}
                id={`tab-${d.key}`}
                tabIndex={active === d.key ? 0 : -1}
                onClick={() => select(d.key)}
              >
                <span className="system__tab-n">{d.n}</span>
                <span className="system__tab-title">{d.title}</span>
                <span className="system__tab-line" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="system__panels">
            {disciplines.map((d) => {
              const on = active === d.key;
              return (
                <div
                  className="system-panel"
                  data-panel={d.key}
                  role="tabpanel"
                  id={`panel-${d.key}`}
                  aria-labelledby={`tab-${d.key}`}
                  data-active={on ? '' : undefined}
                  hidden={!on}
                  key={d.key}
                >
                  <p className="system-panel__index">{d.n} / 04</p>
                  <h3 className="system-panel__title">{d.title}</h3>
                  <p className="system-panel__tagline">{d.tagline}</p>
                  <p className="system-panel__body text-secondary">{d.body}</p>
                  <ul className="system-panel__caps">
                    {d.caps.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <p className="system-panel__feeds">
                    <span>Connects —</span> {d.feeds}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
