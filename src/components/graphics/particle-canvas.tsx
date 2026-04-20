"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleField } from "@/components/graphics/particle-field";

export default function ParticleCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#030303"]} />
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
