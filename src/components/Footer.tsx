import { Link } from 'react-router-dom';
import { Logo } from './ui/Logo';
import { Tagline } from './ui/Tagline';
import { TickedRule } from './ui/TickedRule';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';

const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Studio', href: '/#manifesto' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <TickedRule />

        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo variant="footer" />
            <div className="site-footer__tagline">
              <Tagline align="start" />
            </div>
            <p className="site-footer__studio text-secondary">
              A branding &amp; marketing studio
              <br />
              in Chennai, Tamil Nadu.
            </p>
          </div>

          <nav className="site-footer__col" aria-label="Footer">
            <p className="site-footer__heading">Menu</p>
            {nav.map((item) => (
              <Link key={item.href} to={item.href} className="link-underline">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-footer__col">
            <p className="site-footer__heading">Studio</p>
            <a href="mailto:hello@scalesy.com" className="link-underline">
              hello@scalesy.com
            </a>
            <a href="tel:+914440001200" className="link-underline">
              +91 44 4000 1200
            </a>
            <span className="text-secondary">Teynampet, Chennai 600018</span>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">Social</p>
            <a href="https://www.linkedin.com/" className="link-underline" target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/" className="link-underline" target="_blank" rel="noopener">
              Instagram
            </a>
            <a href="https://x.com/" className="link-underline" target="_blank" rel="noopener">
              X
            </a>
          </div>
        </div>

        <div className="site-footer__base">
          <p className="site-footer__copy">© {year} Scalesy. All rights reserved.</p>
          <button
            className="site-footer__top-link link-underline"
            onClick={() => scrollTo(0, 0)}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
