"use client";

import React from "react";
import { motion } from "motion/react";
import { raceCurve, raceTiming } from "@/lib/motion";

interface TimingGateRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function TimingGateReveal({
  children,
  className = "",
  delay = 0,
}: TimingGateRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: raceTiming.accelerationSplit,
        ease: raceCurve.acceleration,
        delay,
      }}
      className={`relative group ${className}`}
    >
      {/* Timing gate photo-finish beam trigger */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        whileInView={{ scaleX: 1, opacity: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: raceTiming.timingGateSweep,
          ease: raceCurve.drive,
          delay,
        }}
        className="absolute -top-px left-0 right-0 h-[2px] timing-laser origin-left pointer-events-none"
      />
      {children}
    </motion.div>
  );
}
