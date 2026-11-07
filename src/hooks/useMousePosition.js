import { useEffect } from 'react';
import { motionValue } from 'framer-motion';

// One shared pointer tracker. Values are MotionValues, so reading/animating them
// never re-renders React. `x`/`y` are normalized -1..1, `px`/`py` are pixels.
const mouse = { x: motionValue(0), y: motionValue(0), px: motionValue(-100), py: motionValue(-100) };
let users = 0;

const onMove = (e) => {
  mouse.x.set((e.clientX / window.innerWidth) * 2 - 1);
  mouse.y.set((e.clientY / window.innerHeight) * 2 - 1);
  mouse.px.set(e.clientX);
  mouse.py.set(e.clientY);
};

export function useMousePosition() {
  useEffect(() => {
    if (users++ === 0) window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      if (--users === 0) window.removeEventListener('pointermove', onMove);
    };
  }, []);
  return mouse;
}
