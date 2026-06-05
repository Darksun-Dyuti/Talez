"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/site/theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-full text-muted transition-all duration-300 hover:scale-110 hover:bg-gold/10 hover:text-gold"
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
