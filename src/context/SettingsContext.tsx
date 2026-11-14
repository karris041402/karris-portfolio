import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { accents, defaultAccent } from '../data/content';
import { hexToRgb } from '../lib/utils';
import type { Accent } from '../types';

interface Settings {
  accents: Accent[];
  theme: Accent;
  accentId: string;
  /** true when the OS prefers reduced motion OR the visitor flipped the toggle */
  reduced: boolean;
  setAccentId: (id: string) => void;
  /** Lite mode: cheaper effects for weak GPUs (auto-detected, or chosen by the visitor) */
  lite: boolean;
  setLite: (value: boolean) => void;
  setReduceMotion: (value: boolean) => void;
}

// Holds the visitor's accent color + reduced-motion choice.
// Accent -> CSS variables on <html>, reduced motion -> `reduce-motion` class on <html>.
const SettingsContext = createContext<Settings | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: ignore */
  }
};

// Weak hardware: few CPU cores or little RAM.
const weakDevice = (): boolean => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (navigator.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [accentId, setAccentId] = useState<string>(() => read('accent', defaultAccent));
  // null = follow the OS setting, true/false = visitor's explicit choice
  const [userReduce, setUserReduce] = useState<boolean | null>(() => read<boolean | null>('reduce-motion', null));
  const [osReduce, setOsReduce] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // null = automatic, true/false = visitor's explicit choice
  const [userLite, setUserLite] = useState<boolean | null>(() => read<boolean | null>('lite', null));
  const [autoLite, setAutoLite] = useState(weakDevice);

  // Frame-rate probe: if the page runs under ~40fps for a few seconds, switch to lite automatically.
  useEffect(() => {
    if (userLite !== null || autoLite) return undefined;
    let raf = 0;
    let last = 0;
    let slow = 0;
    let frames = 0;
    const start = performance.now() + 5000; // skip the loader / first paint
    const tick = (t: number) => {
      if (document.visibilityState === 'visible' && t > start) {
        if (last) {
          frames++;
          if (t - last > 28) slow++; // frame slower than ~35fps
        }
        last = t;
        if (frames >= 120) {
          if (slow / frames > 0.4) setAutoLite(true);
          return;
        }
      } else {
        last = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [userLite, autoLite]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setOsReduce(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const theme = useMemo(() => accents.find((a) => a.id === accentId) || accents[0], [accentId]);
  const reduced = userReduce ?? osReduce;
  const lite = userLite ?? autoLite;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--c1', hexToRgb(theme.c1));
    root.style.setProperty('--c2', hexToRgb(theme.c2));
    root.style.setProperty('--c3', hexToRgb(theme.c3));
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduced);
  }, [reduced]);

  useEffect(() => {
    document.documentElement.classList.toggle('lite', lite);
  }, [lite]);

  const value = useMemo(
    () => ({
      accents,
      theme,
      accentId: theme.id,
      reduced,
      lite,
      setLite: (v: boolean) => {
        setUserLite(v);
        write('lite', v);
      },
      setAccentId: (id: string) => {
        setAccentId(id);
        write('accent', id);
      },
      setReduceMotion: (v: boolean) => {
        setUserReduce(v);
        write('reduce-motion', v);
      },
    }),
    [theme, reduced, lite],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
