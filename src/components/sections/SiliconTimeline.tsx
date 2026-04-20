"use client";

import { useEffect, useRef, useState } from "react";

const events = [
  { year: "2021", label: "Started AI systems engineering" },
  { year: "2023", label: "Led immersive web platform delivery" },
  { year: "2024", label: "Published creative ML research" },
  { year: "2026", label: "Scaled deep-tech product architecture" },
];

export function SiliconTimeline() {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx") ?? 0);
            setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="grid gap-5 md:grid-cols-[90px_1fr]">
      <svg className="hidden md:block" viewBox="0 0 90 440" aria-hidden>
        <line x1="45" y1="16" x2="45" y2="424" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <line
          x1="45"
          y1="16"
          x2="45"
          y2={16 + active * 136}
          stroke="#00F5FF"
          strokeWidth="4"
          className="transition-all duration-500"
        />
      </svg>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={event.year}
            ref={(el) => {
              refs.current[index] = el;
            }}
            data-idx={index}
            className={`rounded-2xl border border-glass-stroke bg-glass-pane p-4 transition-colors ${
              index <= active ? "shadow-neon" : ""
            }`}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-cyber-cyan/70">{event.year}</p>
            <p className="mt-2 text-white/85">{event.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
