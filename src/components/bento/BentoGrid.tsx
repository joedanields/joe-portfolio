"use client";

import { motion } from "framer-motion";
import { useGesture } from "@use-gesture/react";
import { useRef } from "react";
import { useUIStore } from "@/hooks/use-ui-store";

export type BentoCellType = "Project" | "Skill" | "Image" | "Live Stats";

export interface BentoCell {
  id: string;
  type: BentoCellType;
  title: string;
  description: string;
  span?: string;
  accent?: "ai-research" | "software-engineering";
}

export function BentoGrid({ cells }: { cells: BentoCell[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-6 auto-rows-[10rem]">
      {cells.map((cell) => (
        <BentoCard key={cell.id} cell={cell} />
      ))}
    </div>
  );
}

function BentoCard({ cell }: { cell: BentoCell }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const setFocusMode = useUIStore((state) => state.setFocusMode);

  const bind = useGesture({
    onMove: ({ xy: [px, py] }) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect || !ref.current) return;
      const rotateX = ((py - rect.top) / rect.height - 0.5) * -6;
      const rotateY = ((px - rect.left) / rect.width - 0.5) * 6;
      ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    onHover: ({ hovering }) => {
      if (!ref.current) return;
      if (!hovering) {
        ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
        setFocusMode("idle");
      }
    },
  });

  return (
    <article
      {...bind()}
      ref={ref}
      onMouseEnter={() => setFocusMode(cell.accent ?? "idle")}
      className={`group relative overflow-hidden rounded-2xl border border-glass-stroke bg-glass-pane p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyber-cyan/40 ${
        cell.span ?? "md:col-span-2"
      }`}
    >
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_top,_rgba(157,0,255,0.5),transparent_65%)]" />
      <motion.div whileHover={{ scale: 1.01 }} className="relative flex h-full flex-col justify-between">
        <p className="text-[10px] uppercase tracking-[0.26em] text-cyber-mint/80">{cell.type}</p>
        <div>
          <h3 className="text-lg font-semibold text-white">{cell.title}</h3>
          <p className="mt-2 text-sm text-white/70">{cell.description}</p>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute -inset-px rounded-2xl border border-transparent bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.16)_50%,transparent_75%)] bg-[length:250%_100%] opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-shimmer" />
    </article>
  );
}
