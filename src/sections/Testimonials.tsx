import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { EASE } from '@/lib/motion/easings';

// One large quote at a time, crossfaded. Minimal prev/next + index.
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="section testimonials on-ink" aria-label="What clients say">
      <div className="wrap testimonials__inner">
        <Reveal className="testimonials__head">
          <Eyebrow index="09">Testimonials</Eyebrow>
        </Reveal>

        <div className="testimonials__stage">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              className="testimonials__quote"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="testimonials__text">“{t.quote}”</p>
              <footer className="testimonials__cite">
                <span className="testimonials__name">{t.name}</span>
                <span className="testimonials__role text-secondary">
                  {t.role}, {t.company}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="testimonials__controls">
          <button className="testimonials__nav" onClick={() => go(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <span className="testimonials__count">
            {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
          <button className="testimonials__nav" onClick={() => go(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
