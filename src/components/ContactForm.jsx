import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { contact, socials } from '../data/content';
import MagneticButton from './MagneticButton';

const SuccessAnimation = lazy(() => import('./SuccessAnimation'));

const EMPTY = { name: '', email: '', message: '', _gotcha: '' };

const validate = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = 'Enter a valid email address.';
  if (v.message.trim().length < 10) errors.message = 'Tell me a little more (at least 10 characters).';
  return errors;
};

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} role="alert" className="mt-1.5 min-h-[1.25rem] text-xs text-tertiary">
        {error}
      </p>
    </div>
  );
}

const inputClass = (error) =>
  `w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-primary focus:shadow-glow-sm ${
    error ? 'border-tertiary/70' : 'border-white/10'
  }`;

/*
  Validated contact form.
  Sends through Formspree when contact.formspreeEndpoint is set (see content.js);
  otherwise falls back to opening the visitor's email app, so it never silently fails.
*/
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | mailto | error

  const emailAddress = socials.find((s) => s.id === 'email')?.value ?? '';

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    const found = validate(values)[name];
    setErrors((er) => ({ ...er, [name]: found }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values._gotcha) return; // honeypot: bots fill this hidden field
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    // ★ Formspree endpoint comes from src/data/content.js -> contact.formspreeEndpoint
    if (!contact.formspreeEndpoint) {
      const subject = encodeURIComponent(`Website inquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(contact.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, message: values.message }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const done = status === 'success' || status === 'mailto';

  return (
    <div className="glass gradient-border relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="flex min-h-[26rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <Suspense fallback={<div className="h-32 w-32" />}>
              <SuccessAnimation className="h-32 w-32" />
            </Suspense>
            <h3 className="mt-4 font-display text-2xl font-bold text-white">
              {status === 'success' ? 'Message sent!' : 'Almost there!'}
            </h3>
            <p className="mt-3 max-w-sm text-slate-400">
              {status === 'success'
                ? "Thanks for reaching out. I'll reply within 24 hours."
                : "Your email app should be opening with your message ready to send. If it didn't, email me directly."}
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            exit={{ opacity: 0, y: -10 }}
            aria-label="Contact form"
          >
            <Field id="name" label="Your name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={update}
                onBlur={onBlur}
                placeholder="Juan Dela Cruz"
                aria-invalid={Boolean(errors.name)}
                aria-describedby="name-error"
                className={inputClass(errors.name)}
              />
            </Field>
            <Field id="email" label="Email address" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={update}
                onBlur={onBlur}
                placeholder="you@business.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby="email-error"
                className={inputClass(errors.email)}
              />
            </Field>
            <Field id="message" label="Tell me about your project" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={update}
                onBlur={onBlur}
                placeholder="What does your business do, and what do you need?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby="message-error"
                className={`${inputClass(errors.message)} resize-y`}
              />
            </Field>

            {/* honeypot: hidden from people and screen readers */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this field empty</label>
              <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={update} />
            </div>

            <MagneticButton type="submit" disabled={status === 'sending'} className="mt-2 w-full sm:w-auto">
              {status === 'sending' ? 'Sending…' : 'Send Message'}
              <Send className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>

            <p role="alert" className="mt-4 min-h-[1.25rem] text-sm text-tertiary">
              {status === 'error' && `Something went wrong. Please try again or email ${emailAddress}.`}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
