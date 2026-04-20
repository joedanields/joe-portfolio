"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/hooks/use-ui-store";

export function MagneticButton({
  children,
  className,
  radius = 20,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });
  const { setCursorVariant } = useUIStore();


  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        x.set(Math.max(Math.min(offsetX, radius), -radius));
        y.set(Math.max(Math.min(offsetY, radius), -radius));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onMouseEnter={() => setCursorVariant("magnetic")}
      onMouseLeave={() => setCursorVariant("default")}
      className={`rounded-full border border-glass-stroke bg-glass-pane px-5 py-3 text-xs uppercase tracking-[0.24em] text-cyber-cyan shadow-neon transition-transform hover:scale-[1.02] ${className ?? ""}`}
    >
      {children}
    </motion.button>
  );
}
