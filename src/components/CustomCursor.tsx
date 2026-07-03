"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { raceCurve, raceTiming } from "@/lib/motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true); // Default true to prevent flash on mobile SSR
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    // Strict touch detection: do not render JS cursor if touch device
    const checkTouch = () => {
      const touchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouch(touchDevice);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, input, textarea, [data-interactive]");
      if (interactiveEl) {
        setIsHovered(true);
        const label = interactiveEl.getAttribute("data-cursor-label");
        setHoverText(label || "");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center"
      animate={{
        x: mousePos.x - (isHovered ? 24 : 8),
        y: mousePos.y - (isHovered ? 24 : 8),
        width: isHovered ? 48 : 16,
        height: isHovered ? 48 : 16,
      }}
      transition={{
        duration: raceTiming.reactionCeiling, // ≤ 100ms reaction ceiling
        ease: raceCurve.maxVelocity,
      }}
    >
      <div
        className={`w-full h-full rounded-full border transition-all duration-100 flex items-center justify-center ${
          isHovered
            ? "border-[#00d4ff] bg-[#00d4ff]/10 scale-110 shadow-[0_0_12px_rgba(0,212,255,0.6)]"
            : "border-white/50 bg-white/20"
        }`}
      >
        {isHovered && hoverText && (
          <span className="text-[9px] font-mono font-bold text-[#00d4ff] uppercase tracking-wider px-1">
            {hoverText}
          </span>
        )}
      </div>
    </motion.div>
  );
}
