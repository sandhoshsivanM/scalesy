import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { asset } from '@/lib/paths';
import { ThemeToggle } from './ThemeToggle';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';
import { EASE } from '@/lib/motion/easings';

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
}

export function MobileNav({ open, onClose, nav }: MobileNavProps) {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      stop();
    } else {
      document.body.style.overflow = '';
      start();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, stop, start]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-nav"
          id="mobile-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="mobile-nav__inner wrap">
            <img
              className="mobile-nav__mark"
              src={asset('/brand/scalesy-mark-sm.png')}
              alt=""
              width="111"
              height="160"
            />
            <nav className="mobile-nav__list" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.06 }}
                >
                  <Link to={item.href} className="mobile-nav__link" onClick={onClose}>
                    <span className="mobile-nav__idx">0{i + 1}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-nav__foot">
              <Link to="/contact" className="mobile-nav__cta" onClick={onClose}>
                Book a Discovery Call →
              </Link>
              <a href="mailto:hello@scalesy.com" className="mobile-nav__mail">
                hello@scalesy.com
              </a>
              <ThemeToggle variant="text" />
              <p className="mobile-nav__loc">Chennai, Tamil Nadu</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
