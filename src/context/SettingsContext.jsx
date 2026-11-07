import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { accents, defaultAccent } from '../data/content';
import { hexToRgb } from '../lib/utils';

// Holds the visitor's accent color + reduced-motion choice.
// Accent -> CSS variables on <html>, reduced motion -> `reduce-motion` class on <html>.
const SettingsContext = createContext(null);

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: ignore */
  }
};

export function SettingsProvider({ children }) {
  const [accentId, setAccentId] = useState(() => read('accent', defaultAccent));
  // null = follow the OS setting, true/false = visitor's explicit choice
  const [userReduce, setUserReduce] = useState(() => read('reduce-motion', null));
  const [osReduce, setOsReduce] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setOsReduce(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const theme = useMemo(() => accents.find((a) => a.id === accentId) || accents[0], [accentId]);
  const reduced = userReduce ?? osReduce;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--c1', hexToRgb(theme.c1));
    root.style.setProperty('--c2', hexToRgb(theme.c2));
    root.style.setProperty('--c3', hexToRgb(theme.c3));
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduced);
  }, [reduced]);

  const value = useMemo(
    () => ({
      accents,
      theme,
      accentId: theme.id,
      reduced,
      setAccentId: (id) => {
        setAccentId(id);
        write('accent', id);
      },
      setReduceMotion: (v) => {
        setUserReduce(v);
        write('reduce-motion', v);
      },
    }),
    [theme, reduced],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
