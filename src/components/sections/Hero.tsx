"use client";

import { useEffect, useMemo, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";
import { useUIStore } from "@/hooks/use-ui-store";

const roles = ["AI Research Engineer", "Creative Technologist", "Software Architect"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const role = useMemo(() => roles[roleIndex], [roleIndex]);
  const setFocusMode = useUIStore((state) => state.setFocusMode);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setTyped(role.slice(0, typed.length + 1));
          if (typed.length + 1 === role.length) {
            setTimeout(() => setDeleting(true), 700);
          }
        } else {
          setTyped(role.slice(0, Math.max(typed.length - 1, 0)));
          if (typed.length === 0) {
            setDeleting(false);
            setRoleIndex((current) => (current + 1) % roles.length);
          }
        }
      },
      deleting ? 42 : 70
    );

    return () => clearTimeout(timeout);
  }, [deleting, role, typed]);

  return (
    <section className="relative py-20 md:py-28">
      <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-cyber-cyan/70">Digital Twin / Neural Interface</p>
      <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
        Joe Danields — <TextScramble text="Deep-Tech Storytelling" />
      </h1>
      <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
        <span className="text-phantom-purple">{typed}</span>
        <span className="ml-1 inline-block h-5 w-px animate-pulse bg-cyber-cyan align-middle" />
      </p>
      <div className="mt-10 flex gap-4">
        <div
          onMouseEnter={() => setFocusMode("ai-research")}
          onMouseLeave={() => setFocusMode("idle")}
        >
          <MagneticButton>AI Research</MagneticButton>
        </div>
        <div
          onMouseEnter={() => setFocusMode("software-engineering")}
          onMouseLeave={() => setFocusMode("idle")}
        >
          <MagneticButton className="text-white">Software Engineering</MagneticButton>
        </div>
      </div>
    </section>
  );
}
