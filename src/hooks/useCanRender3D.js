import { useEffect, useState } from "react";

/** Below this width the 3D scenes are skipped entirely. */
const DESKTOP_BREAKPOINT = 1024;

/**
 * Decides whether this visitor should get the WebGL scenes at all.
 *
 * Deliberately lives in its own module with no three.js imports: the point is
 * that the 809 KB three.js bundle is never even requested until this returns
 * true. It stays false for reduced-motion users, anything narrower than a
 * laptop, and data-saver connections — and on capable machines it only flips
 * once the browser is idle, so the scene never competes with the first paint.
 *
 * @param {number} breakpoint - minimum viewport width for 3D
 * @returns {boolean} whether to load and render the 3D scene
 */
export default function useCanRender3D(breakpoint = DESKTOP_BREAKPOINT) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (window.innerWidth < breakpoint) return undefined;
    if (navigator.connection?.saveData) return undefined;

    const schedule = window.requestIdleCallback
      ? window.requestIdleCallback.bind(window)
      : (cb) => setTimeout(cb, 1200);
    const cancel = window.cancelIdleCallback
      ? window.cancelIdleCallback.bind(window)
      : clearTimeout;

    const id = schedule(() => setReady(true), { timeout: 3000 });
    return () => cancel(id);
  }, [breakpoint]);

  return ready;
}
