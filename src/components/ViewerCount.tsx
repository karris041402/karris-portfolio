import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Counter from './Counter';

/*
  Floating visitor counter (bottom-right), backed by Supabase (see supabase/viewers.sql).
  Counts once per browser (localStorage flag). Dev builds only read, never increment.
  Renders nothing if the env vars are missing or the request fails.
*/
const URL_BASE = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const FLAG = 'viewed';

async function rpc(fn: 'increment_views' | 'get_views'): Promise<number> {
  const res = await fetch(`${URL_BASE}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    // new-style sb_publishable_ keys go in apikey only; legacy anon JWTs also go in Authorization
    headers: { apikey: KEY as string, ...(KEY?.startsWith('eyJ') ? { Authorization: `Bearer ${KEY}` } : {}), 'Content-Type': 'application/json' },
    body: '{}',
  });
  if (!res.ok) throw new Error(String(res.status));
  return Number(await res.json());
}

export default function ViewerCount() {
  const [views, setViews] = useState<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!URL_BASE || !KEY) return;
    let seen = false;
    try {
      seen = localStorage.getItem(FLAG) === '1';
    } catch {
      /* storage blocked: treat as new visitor */
    }
    const countIt = !seen && !import.meta.env.DEV;
    rpc(countIt ? 'increment_views' : 'get_views')
      .then((n) => {
        if (Number.isFinite(n)) setViews(n);
        if (countIt) {
          try {
            localStorage.setItem(FLAG, '1');
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <AnimatePresence>
      {views !== null && (
        <motion.aside
          aria-label="Visitor count"
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 1.2 }}
          className="glass gradient-border fixed bottom-3 right-3 z-40 flex items-center rounded-xl px-3 py-2 shadow-glow-sm sm:bottom-5 sm:right-5"
        >
          <span className="leading-none">
            <span className="block font-display text-base font-black text-gradient">
              <Counter value={views} duration={1.6} />
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-slate-400">Total visitors</span>
          </span>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
