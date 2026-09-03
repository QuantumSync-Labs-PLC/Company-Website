import { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import useCanRender3D from "@/hooks/useCanRender3D";

// Dynamic import, so three.js + fiber + drei stay out of the initial page graph.
// Importing Scene3D statically anywhere pulls all 809 KB above the fold.
const Scene3D = lazy(() => import("@/components/three/Scene3D"));

/**
 * The public entry point for every 3D accent on the site.
 *
 * Renders `fallback` — a cheap CSS gradient — immediately, and swaps in the
 * real WebGL canvas only once useCanRender3D says this visitor should have it.
 * Sections should import this, never Scene3D directly.
 */
export default function Scene3DDeferred({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 45 },
  fallback = null,
}) {
  const ready = useCanRender3D();

  const placeholder = (
    <div className={className} aria-hidden="true">
      {fallback}
    </div>
  );

  if (!ready) return placeholder;

  return (
    <Suspense fallback={placeholder}>
      <Scene3D className={className} camera={camera} fallback={fallback}>
        {children}
      </Scene3D>
    </Suspense>
  );
}

Scene3DDeferred.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  camera: PropTypes.object,
  fallback: PropTypes.node,
};
