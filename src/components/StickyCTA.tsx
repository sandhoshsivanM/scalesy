import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';

// Dismissible book-a-call bar. Appears after the hero, hides near the footer,
// stays dismissed for the session. Port of initStickyCta().
export function StickyCTA() {
  const [show, setShow] = useState(false);
  const dismissed = useRef(false);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    try {
      dismissed.current = sessionStorage.getItem('scalesy-cta-dismissed') === '1';
    } catch {
      /* ignore */
    }

    const onScroll = () => {
      if (dismissed.current) return;
      const y = window.scrollY;
      const nearBottom = y + window.innerHeight > document.body.scrollHeight - 900;
      setShow(y > window.innerHeight * 0.9 && !nearBottom);
    };
    onScroll();
    if (lenis) {
      lenis.on('scroll', onScroll);
      return () => lenis.off('scroll', onScroll);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lenis]);

  const dismiss = () => {
    dismissed.current = true;
    setShow(false);
    try {
      sessionStorage.setItem('scalesy-cta-dismissed', '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="sticky-cta" data-show={show ? '' : undefined} aria-hidden={!show}>
      <div className="wrap sticky-cta__inner">
        <p className="sticky-cta__text">Ready to build something measurable?</p>
        <div className="sticky-cta__actions">
          <Link to="/contact" className="btn sticky-cta__btn">
            Book a Discovery Call{' '}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <button className="sticky-cta__close" onClick={dismiss} aria-label="Dismiss">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
