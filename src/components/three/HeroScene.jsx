import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const HOLO_COLORS = ["#22d3ee", "#8b5cf6", "#f65fb5"];

function useGradientColor() {
  return useMemo(() => {
    const c1 = new THREE.Color(HOLO_COLORS[0]);
    const c2 = new THREE.Color(HOLO_COLORS[1]);
    const c3 = new THREE.Color(HOLO_COLORS[2]);
    return (t) => {
      if (t < 0.5) return c1.clone().lerp(c2, t / 0.5);
      return c2.clone().lerp(c3, (t - 0.5) / 0.5);
    };
  }, []);
}

/** Rotating wireframe icosahedron — the hero's core geometric form. */
function CoreForm() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
    const { pointer } = state;
    meshRef.current.rotation.y += pointer.x * 0.0006;
    meshRef.current.rotation.x += pointer.y * 0.0006;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  );
}

/** Instanced point cloud shell around the core form, colored with the holographic gradient. */
function PointShell({ count = 900, radius = 2.6, reduced = false }) {
  const pointsRef = useRef(null);
  const gradientAt = useGradientColor();

  const { positions, colors } = useMemo(() => {
    const total = reduced ? Math.floor(count / 2) : count;
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    for (let i = 0; i < total; i++) {
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const r = radius * (0.85 + Math.random() * 0.3);

      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const color = gradientAt((phi / Math.PI + 1) % 1);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [count, radius, reduced, gradientAt]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y -= delta * 0.05;
    pointsRef.current.rotation.x -= state.pointer.y * 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Sparse background starfield for depth. */
function Starfield({ count = 400 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#7e8aa3" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function HeroScene({ reduced = false }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <Starfield />
      <CoreForm />
      <PointShell reduced={reduced} />
    </>
  );
}
