import { Suspense, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";

/**
 * Shared <Canvas> wrapper for all 3D accents on the site.
 * - Skips WebGL entirely for prefers-reduced-motion / narrow (mobile) viewports,
 *   rendering `fallback` (a cheap CSS gradient) instead.
 * - Pauses the render loop while the canvas is scrolled offscreen or the tab is hidden.
 * - Caps devicePixelRatio so GPU cost stays bounded on high-DPI displays.
 */
export default function Scene3D({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 45 },
  fallback = null,
  mobileBreakpoint = 640,
}) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = window.innerWidth < mobileBreakpoint;
    setCanRender3D(!reducedMotion && !isNarrow);
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (!canRender3D) return undefined;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [canRender3D]);

  if (!canRender3D) {
    return (
      <div ref={containerRef} className={className} aria-hidden="true">
        {fallback}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={camera}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "demand"}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

Scene3D.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  camera: PropTypes.object,
  fallback: PropTypes.node,
  mobileBreakpoint: PropTypes.number,
};
