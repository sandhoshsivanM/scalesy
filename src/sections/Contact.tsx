import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { TickedRule } from '@/components/ui/TickedRule';
import { BookingForm } from '@/components/BookingForm';

// Closing conversion section — the cinematic hero moved the form here. Large
// statement + coordinates + the on-brand booking form.
export function Contact({ index = '10' }: { index?: string }) {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-label">
      <div className="wrap">
        <TickedRule />
        <div className="contact__inner">
          <div className="contact__lead">
            <Reveal>
              <Eyebrow index={index} id="contact-label">
                Contact
              </Eyebrow>
            </Reveal>
            <SplitTextReveal
              as="h2"
              className="contact__headline"
              lines={['Ready to build', 'something remarkable?']}
            />
            <Reveal as="dl" className="contact__coords" delay={160}>
              <div>
                <dt>Studio</dt>
                <dd>Chennai, India</dd>
              </div>
              <div>
                <dt>Coordinates</dt>
                <dd>13.0827° N&nbsp;&nbsp;80.2707° E</dd>
              </div>
              <div>
                <dt>Response</dt>
                <dd>Within two working days</dd>
              </div>
            </Reveal>
            <Reveal className="contact__direct" delay={220}>
              <a href="mailto:hello@scalesy.com" className="link-underline">
                hello@scalesy.com
              </a>
              <a href="tel:+914440001200" className="link-underline">
                +91 44 4000 1200
              </a>
            </Reveal>
          </div>

          <Reveal className="contact__form" delay={120}>
            <BookingForm variant="full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
