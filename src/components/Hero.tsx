"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { raceCurve, raceTiming, driveVariants } from "@/lib/motion";
import { PERSONAL_INFO } from "@/lib/data";
import { ArrowUpRight, ShieldCheck, Zap } from "lucide-react";

// Lazy-load 3D scene to never block first paint
const LazyTrackScene = dynamic(() => import("./TrackScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] flex items-center justify-center border border-border-subtle rounded-lg bg-surface/50">
      <span className="font-mono text-xs text-text-muted animate-pulse">Initializing Track Geometry (0ms split)...</span>
    </div>
  ),
});

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between track-grid border-b border-border-main overflow-hidden transition-colors duration-200"
    >
      {/* Top Background Lane Accent */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Drive Phase Content */}
        <div className="lg:col-span-7 space-y-6 z-10">
          {/* Reaction Split Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={driveVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border-main text-xs font-mono text-text-muted shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-electric animate-ping" />
            <span>0–10m Block Start Split: ~1.6s Velocity Curve</span>
          </motion.div>

          {/* Name Heading */}
          <motion.h1
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={driveVariants}
            className="text-5xl sm:text-7xl font-bold font-display tracking-tight text-text-main leading-none glow-electric"
          >
            {PERSONAL_INFO.name.toUpperCase()}
          </motion.h1>

          {/* Timing-Gate Wipe Tagline Container */}
          <motion.div
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={driveVariants}
            className="h-10 sm:h-12 flex items-center overflow-hidden relative border-l-2 border-electric pl-4 bg-gradient-to-r from-electric/10 to-transparent rounded-r"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                exit={{ clipPath: "inset(0 0% 0 100%)", opacity: 0 }}
                transition={{
                  duration: raceTiming.timingGateSweep,
                  ease: raceCurve.drive,
                }}
                className="text-xl sm:text-2xl font-mono text-electric font-semibold whitespace-nowrap"
              >
                {PERSONAL_INFO.taglines[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Real First-Person Bio Summary */}
          <motion.p
            custom={0.45}
            initial="hidden"
            animate="visible"
            variants={driveVariants}
            className="text-base sm:text-lg text-text-muted font-sans max-w-2xl leading-relaxed"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* Verified Proof Badges */}
          <motion.div
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={driveVariants}
            className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-text-subtle"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface/80 border border-border-main shadow-sm">
              <ShieldCheck className="w-4 h-4 text-electric" />
              <span>Verified Production Repos</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface/80 border border-border-main shadow-sm">
              <Zap className="w-4 h-4 text-amber" />
              <span>Turbopack & Next.js 16</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            custom={0.75}
            initial="hidden"
            animate="visible"
            variants={driveVariants}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#projects"
              data-interactive
              className="px-6 py-3 rounded bg-electric text-white dark:text-black font-display font-bold text-sm tracking-wide hover:bg-text-main hover:text-bg hover:shadow-[0_0_20px_var(--theme-electric)] transition-all duration-100 flex items-center gap-2 group shadow-md"
            >
              <span>Explore Shipped Work</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-100" />
            </a>

            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encodeURIComponent(PERSONAL_INFO.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="px-6 py-3 rounded bg-surface border border-border-main text-text-main font-mono text-xs hover:border-amber hover:text-amber transition-colors duration-100 shadow-sm"
            >
              Connect via WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Right Column: Abstract Track Geometry Scene */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-xl border border-border-main bg-surface/80 p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-3 text-[11px] font-mono text-text-muted">
              <span>R3F GEOMETRY // STARTING BLOCKS</span>
              <span className="text-electric font-semibold">LOW-POLY INTERACTIVE</span>
            </div>
            <LazyTrackScene />
          </div>
        </div>
      </div>

      {/* Starting Gun Countdown Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 flex items-center justify-between border-t border-border-subtle pt-4 text-xs font-mono text-text-muted">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse" />
          <span className="text-text-main font-semibold">ON YOUR MARKS</span>
          <span className="text-text-subtle/40">→</span>
          <span>SET</span>
          <span className="text-text-subtle/40">→</span>
          <span className="text-electric font-semibold">SCROLL DOWN TO FIRE</span>
        </div>
        <div className="hidden sm:block">
          <span>IAAF REACTION THRESHOLD: 100ms</span>
        </div>
      </div>
    </section>
  );
}

