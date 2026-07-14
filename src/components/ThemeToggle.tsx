import { useTheme } from '@/providers/ThemeProvider';

interface ThemeToggleProps {
  variant?: 'icon' | 'text';
  className?: string;
}

export function ThemeToggle({ variant = 'icon', className = '' }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const label = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;

  if (variant === 'text') {
    return (
      <button className={`mobile-nav__theme ${className}`.trim()} onClick={toggle}>
        Switch theme
      </button>
    );
  }
  return (
    <button className={`theme-toggle ${className}`.trim()} onClick={toggle} aria-label={label} title="Switch theme">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 2.5 A7.5 7.5 0 0 1 10 17.5 Z" fill="currentColor" />
      </svg>
    </button>
  );
}
