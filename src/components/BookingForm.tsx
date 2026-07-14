import { useRef, useState, type FormEvent } from 'react';
import { bookingForm, isConfigured, formAction } from '@/data/bookingForm';

type Field = 'name' | 'email' | 'phone' | 'message';
const REQUIRED: Field[] = ['name', 'email', 'phone', 'message'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface BookingFormProps {
  variant?: 'panel' | 'full';
}

// Custom on-brand form that posts to a Google Form response endpoint (no-cors,
// via a hidden iframe sink). Demo mode until bookingForm.formId is set. Mirrors
// the exact contract of the Astro build's initBooking().
export function BookingForm({ variant = 'full' }: BookingFormProps) {
  const configured = isConfigured();
  const action = formAction();
  const e = bookingForm.entries;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const validate = (data: FormData): boolean => {
    const next: Partial<Record<Field, string>> = {};
    for (const key of REQUIRED) {
      const val = String(data.get(e[key] ?? key) ?? '').trim();
      if (!val) next[key] = 'This field is required.';
      else if (key === 'email' && !EMAIL_RE.test(val)) next[key] = 'Enter a valid email address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    if (!validate(data)) return;

    setSending(true);
    try {
      if (configured && action) {
        const params = new URLSearchParams(data as unknown as Record<string, string>);
        await fetch(action, { method: 'POST', mode: 'no-cors', body: params });
      } else {
        await new Promise((r) => setTimeout(r, 500));
      }
    } catch {
      /* no-cors responses are opaque; fail soft */
    } finally {
      setSending(false);
      setDone(true);
    }
  };

  const nameFor = (key: Field | 'service') => e[key] ?? key;
  const clear = (key: Field) =>
    setErrors((prev) => ({ ...prev, [key]: undefined }));

  return (
    <form
      ref={formRef}
      className={`lead lead--${variant}`}
      onSubmit={onSubmit}
      noValidate
      aria-label="Book a discovery call"
    >
      <div className="lead__head">
        <p className="lead__eyebrow">Book a discovery call</p>
        <p className="lead__note text-secondary">
          A 45-minute conversation about the business, not the brief.
        </p>
      </div>

      <div className="lead__fields">
        <Text name={nameFor('name')} placeholder="Your name" autoComplete="name" error={errors.name} onInput={() => clear('name')} />
        <Text name={nameFor('email')} type="email" placeholder="Work email" autoComplete="email" error={errors.email} onInput={() => clear('email')} />
        <Text name={nameFor('phone')} type="tel" placeholder="Phone" autoComplete="tel" error={errors.phone} onInput={() => clear('phone')} />
        <div className="field field__select-wrap">
          <select className="field__input field__select" name={nameFor('service')} aria-label="What can we help with?" defaultValue={bookingForm.serviceOptions[0]}>
            {bookingForm.serviceOptions.map((opt) => (
              <option value={opt} key={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="field__chev" aria-hidden="true">
            ↓
          </span>
        </div>
        {variant === 'full' && (
          <div className="field">
            <textarea
              className="field__input lead__textarea"
              name={nameFor('message')}
              placeholder="A sentence on what you’re building"
              rows={4}
              onInput={() => clear('message')}
            />
            {errors.message && <span className="field__error">{errors.message}</span>}
          </div>
        )}
        {variant === 'panel' && (
          <input type="hidden" name={nameFor('message')} value="(from hero panel)" readOnly />
        )}
      </div>

      <button type="submit" className="btn lead__submit" disabled={sending}>
        <span className="booking__submit-label">{sending ? 'Sending…' : 'Request my call'}</span>
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      </button>
      <p className="lead__fine text-secondary">No obligation. We reply within two working days.</p>

      {done && (
        <div className="lead__success" role="status" aria-live="polite">
          <p className="lead__success-mark" aria-hidden="true">
            ✓
          </p>
          <h3 className="lead__success-title">Your request is in.</h3>
          <p className="text-secondary">We’ll be in touch shortly to arrange your call.</p>
        </div>
      )}

      {!configured && <p className="lead__demo">Demo mode — connect a Google Form in <code>src/data/bookingForm.ts</code>.</p>}
    </form>
  );
}

interface TextProps {
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  error?: string;
  onInput?: () => void;
}
function Text({ name, type = 'text', placeholder, autoComplete, error, onInput }: TextProps) {
  return (
    <div className={`field ${error ? 'is-invalid' : ''}`.trim()}>
      <input
        className="field__input"
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onInput={onInput}
      />
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}
