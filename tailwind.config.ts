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
        gold: "rgb(var(--gold) / <alpha-value>)",
        ember: "rgb(var(--ember) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        dusk: "rgb(var(--dusk) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgb(37 28 18 / 0.08)",
        glow: "0 20px 50px rgb(204 145 51 / 0.18)"
      },
      maxWidth: {
        reading: "74ch"
      }
    }
  },
  plugins: []
};

export default config;
