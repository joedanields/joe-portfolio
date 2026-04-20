import { TextScramble } from "@/components/ui/TextScramble";

const papers = [
  {
    title: "Deepfake Geography",
    year: "2026",
    abstract: "Spatial-frequency signatures for synthetic terrain hallucinations.",
  },
  {
    title: "Neural Cartography",
    year: "2025",
    abstract: "A latent-topology map of multimodal world models.",
  },
  {
    title: "Signal Ghosting",
    year: "2024",
    abstract: "Adversarial frequency cancellation for visual watermarking.",
  },
];

function SpatialFrequencyBars() {
  return (
    <svg viewBox="0 0 120 36" className="h-10 w-full">
      {[6, 12, 20, 10, 25, 14, 29, 18, 11, 24].map((height, index) => (
        <rect
          key={`bar-${index}`}
          x={index * 12}
          y={35 - height}
          width="8"
          height={height}
          rx="2"
          fill={index % 2 === 0 ? "#00F5FF" : "#9D00FF"}
          opacity="0.8"
        />
      ))}
    </svg>
  );
}

export function ResearchVault() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl text-white md:text-3xl">
        <TextScramble text="Research Paper Vault" />
      </h2>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {papers.map((paper) => (
          <article
            key={paper.title}
            className="min-w-[300px] snap-center rounded-2xl border border-glass-stroke bg-glass-pane p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyber-mint/80">{paper.year}</p>
            <h3 className="mt-2 text-lg text-white">{paper.title}</h3>
            <p className="mt-2 text-sm text-white/70">{paper.abstract}</p>
            <div className="mt-4 rounded-xl border border-glass-stroke p-3">
              <SpatialFrequencyBars />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
