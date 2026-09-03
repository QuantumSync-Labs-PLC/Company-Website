import { Suspense, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";

/**
 * The WebGL <Canvas> itself. Do not import this directly — import
 * Scene3DDeferred, which decides whether this module is loaded at all.
 * By the time this renders, the visitor has already been cleared for 3D.
 *
 * - Pauses the render loop while the canvas is scrolled offscreen.
 * - Caps devicePixelRatio so GPU cost stays bounded on high-DPI displays.
 */
export default function Scene3D({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 45 },
}) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
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
  }, []);

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
};
