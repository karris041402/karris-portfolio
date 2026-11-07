import { ArrowUp } from 'lucide-react';
import { footer, profile, socials } from '../data/content';
import { getIcon } from '../lib/icons';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Logo from './Logo';
import MagneticButton from './MagneticButton';

/* Footer: static logo, tagline, quick links, socials, back-to-top, copyright. */
export default function Footer({ items }) {
  const reduced = useReducedMotion();
  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <footer className="relative z-10 border-t border-white/10 bg-ink-950/80 backdrop-blur-xl">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo size={44} />
            <p className="mt-4 text-sm text-slate-400">{profile.tagline}.</p>
            <ul className="mt-5 flex gap-3">
              {socials
                .filter((s) => s.id !== 'phone')
                .map((s) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-primary/60 hover:text-primary hover:shadow-glow-sm"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
              {items.map((i) => (
                <li key={i.id}>
                  <a href={`#${i.id}`} className="text-slate-400 transition hover:text-primary">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <MagneticButton variant="ghost" onClick={toTop} aria-label="Back to top" className="self-start md:self-auto">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.brand}. All rights reserved.
          </p>
          <p>{footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
