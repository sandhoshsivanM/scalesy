// SCALESY — minimal interaction layer.
// Scroll reveals, header state, mobile menu, testimonial rotator.
// All motion is suppressed under prefers-reduced-motion.

// Scroll reveals are handled by an inline script in Base.astro (so they run
// even if this bundle fails). This file handles header, menu, testimonials,
// and the booking form.

/* -------- Header scroll state -------- */
function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 8) header.setAttribute('data-scrolled', '');
    else header.removeAttribute('data-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* -------- Mobile menu -------- */
function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    if (open) nav.setAttribute('data-open', '');
    else nav.removeAttribute('data-open');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => setOpen(false))
  );

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* -------- Testimonial rotator -------- */
function initTestimonials() {
  const root = document.querySelector('[data-testimonials]');
  if (!root) return;

  const section = root.closest('section') || document;
  const slides = [...root.querySelectorAll('[data-slide]')];
  const current = root.querySelector('[data-slide-current]');
  const prev = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');
  // layered caption card in the paired photo column
  const badgeCo = section.querySelector('[data-slide-company]');
  const badgeRole = section.querySelector('[data-slide-role]');
  if (slides.length < 2) return;

  let index = 0;
  const show = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      const active = n === index;
      s.toggleAttribute('data-active', active);
      s.setAttribute('aria-hidden', String(!active));
    });
    if (current) current.textContent = String(index + 1).padStart(2, '0');
    const active = slides[index];
    if (badgeCo && active?.dataset.company) badgeCo.textContent = active.dataset.company;
    if (badgeRole && active?.dataset.role) badgeRole.textContent = active.dataset.role;
  };

  prev?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));

  show(0);
}

/* -------- Booking form -------- */
function initBooking() {
  const form = document.querySelector('[data-booking]');
  if (!form) return;

  const configured = form.getAttribute('data-configured') === 'true';
  const action = form.getAttribute('data-action');
  const submit = form.querySelector('[data-submit]');
  const success = form.querySelector('[data-success]');

  const requiredFields = ['name', 'email', 'phone', 'message'];
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fieldEl = (key) => form.querySelector(`[data-field="${key}"]`);
  const wrapOf = (input) => input.closest('.field');

  const setError = (input, msg) => {
    const wrap = wrapOf(input);
    const err = wrap?.querySelector('[data-error]');
    if (msg) {
      wrap?.classList.add('is-invalid');
      if (err) { err.textContent = msg; err.hidden = false; }
    } else {
      wrap?.classList.remove('is-invalid');
      if (err) { err.textContent = ''; err.hidden = true; }
    }
  };

  const validate = () => {
    let firstInvalid = null;
    for (const key of requiredFields) {
      const input = fieldEl(key);
      if (!input) continue;
      const val = input.value.trim();
      let msg = '';
      if (!val) msg = 'This field is required.';
      else if (key === 'email' && !emailRe.test(val)) msg = 'Enter a valid email address.';
      setError(input, msg);
      if (msg && !firstInvalid) firstInvalid = input;
    }
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  };

  // clear an error as the user corrects it
  requiredFields.forEach((key) => {
    const input = fieldEl(key);
    input?.addEventListener('input', () => setError(input, ''));
  });

  const showSuccess = () => {
    if (success) success.hidden = false;
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    submit?.setAttribute('data-loading', '');
    const prevLabel = submit?.querySelector('.booking__submit-label')?.textContent;
    const labelEl = submit?.querySelector('.booking__submit-label');
    if (labelEl) labelEl.textContent = 'Sending…';

    try {
      if (configured && action) {
        const params = new URLSearchParams(new FormData(form));
        await fetch(action, { method: 'POST', mode: 'no-cors', body: params });
      } else {
        // demo mode — simulate a short round-trip
        await new Promise((r) => setTimeout(r, 500));
      }
    } catch (_) {
      // no-cors responses are opaque; a network error is rare. Fail soft.
    } finally {
      submit?.removeAttribute('data-loading');
      if (labelEl && prevLabel) labelEl.textContent = prevLabel;
      showSuccess();
    }
  });
}

/* -------- Boot -------- */
function boot() {
  initHeader();
  initMenu();
  initTestimonials();
  initBooking();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
