import React from "react";
import { raceCurve, raceTiming } from "@/lib/motion";

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen p-12 max-w-5xl mx-auto space-y-16 bg-bg text-text-main transition-colors duration-200">
      <header className="border-b border-border-main pb-6">
        <span className="text-xs font-mono tracking-widest text-electric uppercase">Dev-Only Verification Route</span>
        <h1 className="text-4xl font-bold font-display mt-2">Design Tokens & Split Second Motion System</h1>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold font-display border-l-4 border-electric pl-3">Color Tokens</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-6 rounded-lg bg-bg border border-border-main space-y-2 shadow-sm">
            <div className="w-full h-12 bg-bg rounded border border-border-main" />
            <p className="font-mono text-sm text-text-main font-semibold">--bg</p>
            <p className="text-xs text-text-muted">Primary Track Background</p>
          </div>
          <div className="p-6 rounded-lg bg-surface border border-border-main space-y-2 shadow-sm">
            <div className="w-full h-12 bg-surface rounded border border-border-main" />
            <p className="font-mono text-sm text-text-main font-semibold">--surface</p>
            <p className="text-xs text-text-muted">Card / Container Surface</p>
          </div>
          <div className="p-6 rounded-lg bg-surface border border-border-main space-y-2 shadow-sm">
            <div className="w-full h-12 bg-electric rounded shadow-[0_0_15px_var(--theme-electric)]" />
            <p className="font-mono text-sm text-electric font-semibold">--electric</p>
            <p className="text-xs text-text-muted">Lead Accent & Timing Beams</p>
          </div>
          <div className="p-6 rounded-lg bg-surface border border-border-main space-y-2 shadow-sm">
            <div className="w-full h-12 bg-amber rounded shadow-[0_0_15px_var(--theme-amber)]" />
            <p className="font-mono text-sm text-amber font-semibold">--amber</p>
            <p className="text-xs text-text-muted">Rare Highlight / Single CTA</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold font-display border-l-4 border-electric pl-3">Typography Tokens</h2>
        <div className="space-y-4 bg-surface p-6 rounded-lg border border-border-main shadow-sm">
          <div>
            <span className="text-xs font-mono text-text-muted">font-display (Space Grotesk)</span>
            <h3 className="text-3xl font-bold font-display text-text-main">Jinesh Dabhi — Split Second Athletics Portfolio</h3>
          </div>
          <div>
            <span className="text-xs font-mono text-text-muted">font-sans (Inter)</span>
            <p className="text-base text-text-main font-sans leading-relaxed">
              Every interaction resolves under the 100ms IAAF false-start threshold. Built with Next.js 16, React 19, and centralized motion curves.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold font-display border-l-4 border-electric pl-3">Race Phase Easing Curves</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(raceCurve).map(([phase, curve]) => (
            <div key={phase} className="p-5 rounded bg-surface border border-border-main space-y-2 font-mono text-sm shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-electric font-bold capitalize">{phase} Phase</span>
                <span className="text-xs text-text-muted">[{curve.join(", ")}]</span>
              </div>
              <p className="text-xs font-sans text-text-muted">
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
