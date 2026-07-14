import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '@/lib/paths';

// Floating concierge widget — routes to real channels (no fake bot).
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="chat" data-open={open ? '' : undefined} aria-live="polite">
      <div
        className="chat__panel"
        role="dialog"
        aria-label="Chat with Scalesy"
        aria-hidden={!open}
        {...(!open ? { inert: '' } : {})}
      >
        <div className="chat__head">
          <img className="chat__avatar" src={asset('/brand/scalesy-mark-sm.png')} alt="" width="111" height="160" />
          <div>
            <p className="chat__name">Scalesy concierge</p>
            <p className="chat__status">
              <span className="chat__dot" aria-hidden="true" /> Typically replies within a few hours
            </p>
          </div>
          <button
            className="chat__close"
            onClick={() => {
              setOpen(false);
              launcherRef.current?.focus();
            }}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="chat__body">
          <p className="chat__bubble">
            Hello — tell us what you’re building and we’ll point you to the right next step. A
            discovery call is the fastest way in.
          </p>
        </div>

        <div className="chat__actions">
          <Link to="/contact" className="btn chat__cta">
            Book a discovery call{' '}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <a href="mailto:hello@scalesy.com" className="chat__link">
            Email hello@scalesy.com
          </a>
          <a href="https://wa.me/914440001200" className="chat__link" target="_blank" rel="noopener">
            Message us on WhatsApp
          </a>
        </div>
      </div>

      <button
        ref={launcherRef}
        className="chat__launcher"
        aria-expanded={open}
        aria-label="Chat with us"
        onClick={() => setOpen((v) => !v)}
      >
        <svg className="chat__icon chat__icon--chat" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 16.5H9l-4.5 3.5V16.5H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="11" r="1" fill="currentColor" />
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <circle cx="16" cy="11" r="1" fill="currentColor" />
        </svg>
        <svg className="chat__icon chat__icon--close" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="chat__label">Chat with us</span>
      </button>
    </div>
  );
}
