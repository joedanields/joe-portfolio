"use client";

import { useMemo, useRef } from "react";
import { Points } from "three";
import { useFrame } from "@react-three/fiber";
import { useUIStore } from "@/hooks/use-ui-store";

const COUNT = 900;

export function ParticleField() {
  const pointsRef = useRef<Points | null>(null);
  const mode = useUIStore((state) => state.focusMode);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const pos = points.geometry.attributes.position.array as Float32Array;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < COUNT; i += 1) {
      const idx = i * 3;
      const seed = i / COUNT;
      if (mode === "ai-research") {
        const phi = Math.acos(1 - 2 * seed);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const radius = 2.2;
        pos[idx] += (radius * Math.sin(phi) * Math.cos(theta) - pos[idx]) * 0.06;
        pos[idx + 1] += (radius * Math.cos(phi) - pos[idx + 1]) * 0.06;
        pos[idx + 2] += (radius * Math.sin(phi) * Math.sin(theta) - pos[idx + 2]) * 0.06;
      } else if (mode === "software-engineering") {
        const side = Math.floor(Math.sqrt(COUNT));
        const x = (i % side) - side / 2;
        const y = Math.floor(i / side) - side / 2;
        pos[idx] += (x * 0.18 - pos[idx]) * 0.06;
        pos[idx + 1] += (y * 0.18 - pos[idx + 1]) * 0.06;
        pos[idx + 2] += (Math.sin(t + seed * 8) * 0.2 - pos[idx + 2]) * 0.06;
      } else {
        pos[idx] += Math.sin(t + seed * 12) * 0.0009;
        pos[idx + 1] += Math.cos(t * 0.8 + seed * 14) * 0.0009;
      }
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.rotation.y = t * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00F5FF" size={0.03} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}
