"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function AmbientLight() {
  const [isMobile, setIsMobile] = useState(true);
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      // set initial position to center
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isMobile, mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {isMobile ? (
        <motion.div
          animate={{
            x: ["-10%", "100%", "-10%"],
            y: ["0%", "20%", "0%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -inset-1/2 opacity-30 dark:opacity-20 mix-blend-screen"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgb(var(--brand) / 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      ) : (
        <motion.div
          ref={glowRef}
          className="absolute h-[600px] w-[600px] rounded-full opacity-40 dark:opacity-20 mix-blend-screen"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgb(var(--brand) / 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      )}
      {/* Background grain texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
