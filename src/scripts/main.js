// SCALESY — interaction layer: smooth scroll, counters, parallax, header,
// menu, testimonials, booking, chat. All motion respects prefers-reduced-motion.
// Base scroll reveals run from an inline script in Base.astro (fail-safe).
import Lenis from 'lenis';

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis = null;

/* -------- Smooth scroll (Lenis) -------- */
function initSmoothScroll() {
  // Skip on touch (native momentum is better) and under reduced-motion.
  const isTouch = matchMedia('(pointer: coarse)').matches;
  if (REDUCE || isTouch) return;

  lenis = new Lenis({ duration: 1.05, smoothWheel: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // same-page hash links scroll smoothly
  document.querySelectorAll('a[href*="#"]').forEach((a) => {
    const url = a.getAttribute('href');
    const hash = url && url.includes('#') ? '#' + url.split('#')[1] : '';
    if (!hash || hash === '#') return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(hash);
      if (target && (url.startsWith('#') || url.startsWith('/#') || url.includes(location.pathname))) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -90 });
      }
    });
  });
}

/* -------- Animated number counters -------- */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const run = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const pad = parseInt(el.getAttribute('data-pad') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    const format = (v) => {
      let n = decimals ? v.toFixed(decimals) : String(Math.round(v));
      if (pad) n = n.padStart(pad, '0');
      return prefix + n + suffix;
    };
    if (REDUCE) { el.textContent = format(target); return; }
    const dur = 1400;
    let start = null;
    const step = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = format(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = format(target);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}

/* -------- Parallax layers -------- */
function initParallax() {
  const els = [...document.querySelectorAll('[data-parallax]')];
  if (!els.length || REDUCE) return;

  const update = () => {
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.12');
      // progress: -1 (below) → 1 (above), 0 when centered
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}px, 0)`;
    }
  };
  if (lenis) lenis.on('scroll', update);
  else window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

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
    if (lenis) open ? lenis.stop() : lenis.start();
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

/* -------- Theme toggle -------- */
function initTheme() {
  const toggles = document.querySelectorAll('[data-theme-toggle]');
  if (!toggles.length) return;
  const apply = (theme) => {
    if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('scalesy-theme', theme); } catch (e) {}
  };
  toggles.forEach((btn) =>
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      apply(isLight ? 'dark' : 'light');
    })
  );
}

/* -------- Sticky book-a-call bar -------- */
function initStickyCta() {
  const bar = document.querySelector('[data-sticky-cta]');
  if (!bar) return;
  const close = bar.querySelector('[data-sticky-close]');
  let dismissed = false;
  try { dismissed = sessionStorage.getItem('scalesy-cta-dismissed') === '1'; } catch (e) {}

  const onScroll = () => {
    if (dismissed) return;
    const y = window.scrollY;
    const nearBottom = y + window.innerHeight > document.body.scrollHeight - 900;
    if (y > window.innerHeight * 0.9 && !nearBottom) bar.setAttribute('data-show', '');
    else bar.removeAttribute('data-show');
  };
  close?.addEventListener('click', () => {
    dismissed = true;
    bar.removeAttribute('data-show');
    try { sessionStorage.setItem('scalesy-cta-dismissed', '1'); } catch (e) {}
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* -------- The System (discipline tabs) -------- */
function initSystem() {
  const root = document.querySelector('[data-system]');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-tab]')];
  const panels = [...root.querySelectorAll('[data-panel]')];
  if (!tabs.length) return;

  let timer = null;
  const select = (key) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === key)));
    panels.forEach((pnl) => {
      const on = pnl.dataset.panel === key;
      pnl.toggleAttribute('data-active', on);
      pnl.hidden = !on;
    });
  };
  const advance = () => {
    const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    select(tabs[(i + 1) % tabs.length].dataset.tab);
  };
  const startAuto = () => {
    if (REDUCE) return;
    stopAuto();
    timer = setInterval(advance, 5000);
  };
  const stopAuto = () => { if (timer) { clearInterval(timer); timer = null; } };

  tabs.forEach((t) =>
    t.addEventListener('click', () => { select(t.dataset.tab); stopAuto(); })
  );
  // keyboard: left/right arrows
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const nextI = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
    select(tabs[nextI].dataset.tab);
    tabs[nextI].focus();
    stopAuto();
  });

  // auto-rotate only while the section is in view
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? startAuto() : stopAuto()));
    }, { threshold: 0.35 }).observe(root);
  }
}

/* -------- Chat widget -------- */
function initChat() {
  const root = document.querySelector('[data-chat]');
  if (!root) return;
  const launcher = root.querySelector('[data-chat-launcher]');
  const panel = root.querySelector('[data-chat-panel]');
  const close = root.querySelector('[data-chat-close]');
  const setOpen = (open) => {
    root.toggleAttribute('data-open', open);
    launcher?.setAttribute('aria-expanded', String(open));
    if (open) panel?.querySelector('a,button,input')?.focus();
  };
  launcher?.addEventListener('click', () => setOpen(!root.hasAttribute('data-open')));
  close?.addEventListener('click', () => { setOpen(false); launcher?.focus(); });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.hasAttribute('data-open')) { setOpen(false); launcher?.focus(); }
  });
}

/* -------- Boot -------- */
function boot() {
  initSmoothScroll();
  initCounters();
  initParallax();
  initTheme();
  initHeader();
  initMenu();
  initStickyCta();
  initSystem();
  initTestimonials();
  initBooking();
  initChat();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
