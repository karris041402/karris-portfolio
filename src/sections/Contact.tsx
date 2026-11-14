import { contact, socials } from '../data/content';
import { getIcon } from '../lib/icons';
import ContactForm from '../components/ContactForm';
import Constellation from '../components/Constellation';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad">
      <Constellation />
      <div className="container-x relative">
        <SectionHeading id="contact-title" title={contact.title} subtitle={contact.subtitle} />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <Reveal variant="left">
            <ul className="space-y-4">
              {socials.map((s) => {
                const Icon = getIcon(s.icon);
                const external = s.href.startsWith('http');
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="glass gradient-border group flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-glow-sm"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition group-hover:scale-110">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-widest text-slate-500">{s.label}</span>
                        <span className="block truncate font-medium text-white">{s.value}</span>
                      </span>
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal variant="right">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
