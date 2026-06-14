import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        brand: {
          light: "rgb(var(--brand-light) / <alpha-value>)",
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          dark: "rgb(var(--brand-dark) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        soft: "0 18px 45px rgb(37 28 18 / 0.08)",
        glow: "0 20px 50px rgb(var(--brand) / 0.18)",
        "glow-lg": "0 0 100px 20px rgb(var(--brand) / 0.15)",
      },
      maxWidth: {
        reading: "74ch"
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      }
    }
  },
  plugins: []
};

export default config;
