"use client";

import dynamic from "next/dynamic";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { ContactTerminal } from "@/components/sections/ContactTerminal";
import { Hero } from "@/components/sections/Hero";
import { ResearchVault } from "@/components/sections/ResearchVault";
import { SiliconTimeline } from "@/components/sections/SiliconTimeline";
import { SmoothScroll } from "@/components/smooth-scroll";

const ParticleCanvas = dynamic(() => import("@/components/graphics/particle-canvas"), {
  ssr: false,
  loading: () => null,
});

const bentoCells = [
  {
    id: "1",
    type: "Project",
    title: "AI Research Lab",
    description: "Experiment stacks, publication workflows, and deepfake geography experiments.",
    span: "md:col-span-3",
    accent: "ai-research",
  },
  {
    id: "2",
    type: "Skill",
    title: "Software Engineering",
    description: "High-performance product architecture with rigor and craft.",
    accent: "software-engineering",
  },
  {
    id: "3",
    type: "Image",
    title: "Neural Twin",
    description: "Abstract cognition render in sync with role transitions.",
  },
  {
    id: "4",
    type: "Live Stats",
    title: "Processing AI",
    description: "[stream] training-epoch=448 • loss=0.0042 • stability=99.2%",
    span: "md:col-span-3",
  },
] as const;

export function PortfolioShell() {
  return (
    <SmoothScroll>
      <ParticleCanvas />
      <main className="relative mx-auto max-w-6xl space-y-16 px-6 pb-24 pt-12 md:px-8">
        <Hero />
        <BentoGrid cells={[...bentoCells]} />
        <ResearchVault />
        <SiliconTimeline />
        <ContactTerminal />
      </main>
    </SmoothScroll>
  );
}
