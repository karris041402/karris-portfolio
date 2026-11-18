import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { resume } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import type { NavItem } from '../types';
import Logo from './Logo';
import SettingsMenu from './SettingsMenu';

/* Sticky glass navbar: smooth-scroll anchors, active-section highlight, mobile hamburger. */
export default function Navbar({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(['home', ...items.map((i) => i.id)]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open
          ? 'border-b border-white/10 bg-ink-950/95 backdrop-blur-xl'
          : scrolled
            ? 'border-b border-white/10 bg-ink-950/70 backdrop-blur-xl'
            : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#home" aria-label="Back to top" onClick={() => setOpen(false)}>
          <Logo animated size={40} />
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'page' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === item.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-primary/40 bg-primary/10 shadow-glow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={resume.file}
              download={resume.filename}
              className="inline-flex items-center gap-2 rounded-full bg-neon-gradient px-4 py-2 text-sm font-bold text-ink-950 shadow-glow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-offset-4"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> {resume.label}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <SettingsMenu />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="container-x overflow-hidden pb-6 lg:hidden"
          >
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, type: 'spring', stiffness: 200, damping: 20 }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'page' : undefined}
                  className={`block border-b border-white/5 py-3 font-display text-lg ${
                    active === item.id ? 'text-primary' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
            <li className="pt-4">
              <a
                href={resume.file}
                download={resume.filename}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-neon-gradient px-5 py-2.5 font-bold text-ink-950 shadow-glow-sm"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> {resume.label}
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
