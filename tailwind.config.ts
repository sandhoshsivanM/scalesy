import type { Config } from 'tailwindcss';

/**
 * SCALESY — Tailwind consumes the CSS-variable token system defined in
 * src/styles/global.css; it does NOT replace it. Every token maps to a var()
 * ref so utilities (bg-bg, text-accent, text-step-3, ease-brand) flip with
 * [data-theme="light"] and re-scope inside .on-ink automatically — something a
 * static compiled palette cannot do. Signature primitives (.eyebrow, .cta,
 * .rule-ticked, .btn, reveals) stay as authored CSS classes in global.css.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-raise': 'var(--bg-raise)',
        ink: 'var(--ink)',
        accent: 'var(--accent)',
        'accent-press': 'var(--accent-press)',
        gold: 'var(--gold)',
        'btn-bg': 'var(--btn-bg)',
        'btn-bg-press': 'var(--btn-bg-press)',
        'btn-text': 'var(--btn-text)',
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        'text-on-ink': 'var(--text-on-ink)',
        'text-on-ink-2': 'var(--text-on-ink-2)',
      },
      borderColor: {
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        'line-faint': 'var(--line-faint)',
        'line-gold': 'var(--line-gold)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      fontSize: {
        'step--1': 'var(--step--1)',
        'step-0': 'var(--step-0)',
        'step-1': 'var(--step-1)',
        'step-2': 'var(--step-2)',
        'step-3': 'var(--step-3)',
        'step-4': 'var(--step-4)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--space-section)',
      },
      maxWidth: {
        wrap: '1600px',
        measure: '62ch',
        'measure-narrow': '46ch',
      },
      transitionTimingFunction: {
        brand: 'var(--ease)',
      },
      letterSpacing: {
        label: '0.22em',
        wide: '0.14em',
      },
    },
  },
  plugins: [],
};

export default config;
