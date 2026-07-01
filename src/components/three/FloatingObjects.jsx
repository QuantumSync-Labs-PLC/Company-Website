import { useMemo } from "react";
import { Float } from "@react-three/drei";

const SHAPE_TYPES = ["octahedron", "icosahedron", "tetrahedron"];
const COLORS = ["#22d3ee", "#8b5cf6", "#c5ff4a"];

/**
 * Lightweight ambient accent — a few slowly floating wireframe shapes.
 * Used behind sections (Why Us / Tech Stack) rather than as a hero showpiece.
 */
export default function FloatingObjects({ count = 3 }) {
  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      type: SHAPE_TYPES[i % SHAPE_TYPES.length],
      color: COLORS[i % COLORS.length],
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2.4,
        (Math.random() - 0.5) * 2,
      ],
      speed: 1 + Math.random(),
      floatIntensity: 1 + Math.random(),
    }));
  }, [count]);

  return (
    <>
      <ambientLight intensity={0.7} />
      {shapes.map((shape) => (
        <Float
          key={shape.key}
          speed={shape.speed}
          rotationIntensity={0.6}
          floatIntensity={shape.floatIntensity}
        >
          <mesh position={shape.position}>
            {shape.type === "octahedron" && <octahedronGeometry args={[0.55, 0]} />}
            {shape.type === "icosahedron" && <icosahedronGeometry args={[0.45, 0]} />}
            {shape.type === "tetrahedron" && <tetrahedronGeometry args={[0.5, 0]} />}
            <meshBasicMaterial color={shape.color} wireframe transparent opacity={0.5} />
          </mesh>
        </Float>
      ))}
    </>
  );
}
