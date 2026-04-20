import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          deep: "#030303",
          soft: "#090C12",
        },
        cyber: {
          cyan: "#00F5FF",
          mint: "#00C9A7",
        },
        phantom: {
          purple: "#9D00FF",
          violet: "#5700C9",
        },
        glass: {
          stroke: "rgba(255,255,255,0.08)",
          pane: "rgba(12,14,22,0.62)",
        },
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "border-beam": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        shimmer: "shimmer 2.8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "border-beam": "border-beam 3s linear infinite",
      },
      boxShadow: {
        neon: "0 0 24px rgba(0,245,255,0.18)",
      },
    },
  },
};

export default config;
