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
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-lg p-4"
        >
          {/* False-start alert strobe effect */}
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="max-w-md w-full bg-surface border-2 border-amber rounded-xl p-8 relative shadow-[0_0_50px_var(--theme-amber)] space-y-6 text-center"
          >
            <button
              onClick={() => setTriggered(false)}
              className="absolute top-4 right-4 p-1 rounded text-text-muted hover:text-text-main"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-amber/20 border border-amber flex items-center justify-center mx-auto text-amber animate-bounce">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber uppercase tracking-widest block">
                IAAF TIMING DISQUALIFICATION WARNING
              </span>
              <h3 className="text-3xl font-bold font-display text-text-main">
                0.0983s — FALSE START!
              </h3>
              <p className="text-sm font-mono text-text-muted">
                Reaction time registered below the mandatory 100ms physiological threshold.
              </p>
            </div>

            <div className="p-4 rounded bg-bg border border-border-main text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-electric">
                <Zap className="w-4 h-4" />
                <span>SECRET ENGINEERING TELEMETRY:</span>
              </div>
              <p className="text-xs font-sans text-text-muted leading-relaxed">
                Jinesh engineered WorkoutWala's AI prompt pipeline with streaming responses resolving faster than human auditory sprint reaction times. You discovered the secret track diagnostics override!
              </p>
            </div>

            <button
              onClick={() => setTriggered(false)}
              className="w-full py-3 rounded bg-amber text-white dark:text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-text-main hover:text-bg transition-colors duration-100"
            >
              Return to Starting Blocks
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
