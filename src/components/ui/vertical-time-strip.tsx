"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function VerticalTimeStrip() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed z-40 hidden md:flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-muted pointer-events-none"
      style={{
        right: "1rem",
        top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
        transformOrigin: "right center"
      }}
    >
      <span>{time || "00:00:00"}</span>
      <span className="h-[1px] w-4 bg-muted/40" />
      <span>40.7128° N, 74.0060° W</span>
    </motion.div>
  );
}
