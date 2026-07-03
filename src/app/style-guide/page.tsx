import React from "react";
import { raceCurve, raceTiming } from "@/lib/motion";

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen p-12 max-w-5xl mx-auto space-y-16">
      <header className="border-b border-white/10 pb-6">
        <span className="text-xs font-mono tracking-widest text-electric uppercase">Dev-Only Verification Route</span>
        <h1 className="text-4xl font-bold font-display mt-2">Design Tokens & Split Second Motion System</h1>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold font-display border-l-4 border-electric pl-3">Color Tokens</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-6 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-2">
            <div className="w-full h-12 bg-[#0a0a0a] rounded border border-white/20" />
            <p className="font-mono text-sm text-white font-semibold">--bg: #0a0a0a</p>
            <p className="text-xs text-white/60">Primary Track Background</p>
          </div>
          <div className="p-6 rounded-lg bg-[#121214] border border-white/10 space-y-2">
            <div className="w-full h-12 bg-[#121214] rounded border border-white/20" />
            <p className="font-mono text-sm text-white font-semibold">--surface: #121214</p>
            <p className="text-xs text-white/60">Card / Container Surface</p>
          </div>
          <div className="p-6 rounded-lg bg-black border border-white/10 space-y-2">
            <div className="w-full h-12 bg-[#00d4ff] rounded shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
            <p className="font-mono text-sm text-[#00d4ff] font-semibold">--electric: #00d4ff</p>
            <p className="text-xs text-white/60">Lead Accent & Timing Beams</p>
          </div>
          <div className="p-6 rounded-lg bg-black border border-white/10 space-y-2">
            <div className="w-full h-12 bg-[#ff9500] rounded shadow-[0_0_15px_rgba(255,149,0,0.5)]" />
            <p className="font-mono text-sm text-[#ff9500] font-semibold">--amber: #ff9500</p>
            <p className="text-xs text-white/60">Rare Highlight / Single CTA</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold font-display border-l-4 border-electric pl-3">Typography Tokens</h2>
        <div className="space-y-4 bg-surface p-6 rounded-lg border border-white/10">
          <div>
            <span className="text-xs font-mono text-white/40">font-display (Space Grotesk)</span>
            <h3 className="text-3xl font-bold font-display">Jinesh Dabhi — Split Second Athletics Portfolio</h3>
          </div>
          <div>
            <span className="text-xs font-mono text-white/40">font-sans (Inter)</span>
            <p className="text-base text-white/80 font-sans leading-relaxed">
              Every interaction resolves under the 100ms IAAF false-start threshold. Built with Next.js 16, React 19, and centralized motion curves.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold font-display border-l-4 border-electric pl-3">Race Phase Easing Curves</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(raceCurve).map(([phase, curve]) => (
            <div key={phase} className="p-5 rounded bg-surface border border-white/10 space-y-2 font-mono text-sm">
              <div className="flex justify-between items-center">
                <span className="text-electric font-bold capitalize">{phase} Phase</span>
                <span className="text-xs text-white/50">[{curve.join(", ")}]</span>
              </div>
              <p className="text-xs font-sans text-white/70">
                {phase === "drive" && "Steep initial velocity, long deceleration tail (Block Start 0-10m). Used for hero entrances."}
                {phase === "acceleration" && "Steady confident velocity build. Used for scroll reveals."}
                {phase === "maxVelocity" && "Constant, immediate responsiveness. ≤100ms hover/press states."}
                {phase === "deceleration" && "Sharp controlled stop. Used for exits and closures."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
