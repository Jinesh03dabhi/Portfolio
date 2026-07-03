"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X, Zap } from "lucide-react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiEgg() {
  const [keyHistory, setKeyHistory] = useState<string[]>([]);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeyHistory((prev) => {
        const updated = [...prev, e.key];
        if (updated.length > KONAMI_SEQUENCE.length) {
          updated.shift();
        }
        if (updated.join(",") === KONAMI_SEQUENCE.join(",")) {
          setTriggered(true);
          return [];
        }
        return updated;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
        >
          {/* False-start alert strobe effect */}
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="max-w-md w-full bg-[#121214] border-2 border-[#ff9500] rounded-xl p-8 relative shadow-[0_0_50px_rgba(255,149,0,0.4)] space-y-6 text-center"
          >
            <button
              onClick={() => setTriggered(false)}
              className="absolute top-4 right-4 p-1 rounded text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#ff9500]/20 border border-[#ff9500] flex items-center justify-center mx-auto text-[#ff9500] animate-bounce">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#ff9500] uppercase tracking-widest block">
                IAAF TIMING DISQUALIFICATION WARNING
              </span>
              <h3 className="text-3xl font-bold font-display text-white">
                0.0983s — FALSE START!
              </h3>
              <p className="text-sm font-mono text-white/70">
                Reaction time registered below the mandatory 100ms physiological threshold.
              </p>
            </div>

            <div className="p-4 rounded bg-black border border-white/10 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00d4ff]">
                <Zap className="w-4 h-4" />
                <span>SECRET ENGINEERING TELEMETRY:</span>
              </div>
              <p className="text-xs font-sans text-white/80 leading-relaxed">
                Jinesh engineered WorkoutWala's AI prompt pipeline with streaming responses resolving faster than human auditory sprint reaction times. You discovered the secret track diagnostics override!
              </p>
            </div>

            <button
              onClick={() => setTriggered(false)}
              className="w-full py-3 rounded bg-[#ff9500] text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors duration-100"
            >
              Return to Starting Blocks
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
