import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './ui/Logo';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import { useScrolled } from '@/hooks/useScrolled';

const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Studio', href: '/#manifesto' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const scrolled = useScrolled(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    href === '/work'
      ? pathname.startsWith('/work')
      : href === '/insights'
        ? pathname.startsWith('/insights')
        : href === '/contact'
          ? pathname.startsWith('/contact')
          : false;

  return (
    <>
      <header className="site-header" data-scrolled={scrolled ? '' : undefined}>
        <div className="wrap site-header__inner">
          <Logo variant="header" />

          <nav className="site-nav" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="site-nav__link"
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          <Link to="/contact" className="btn site-header__cta">
            Book a Discovery Call
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>

          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="visually-hidden">Menu</span>
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} nav={nav} />
    </>
  );
}
