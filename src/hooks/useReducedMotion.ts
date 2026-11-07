import { useSettings } from '../context/SettingsContext';

/** true when the OS prefers reduced motion OR the visitor flipped the "Reduce motion" toggle. */
export function useReducedMotion() {
  return useSettings().reduced;
}
