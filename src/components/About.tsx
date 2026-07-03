"use client";

import React from "react";
import TimingGateReveal from "./TimingGateReveal";
import { SKILL_NODES, PERSONAL_INFO } from "@/lib/data";
import { CheckCircle2, GitBranch, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Section Header */}
      <TimingGateReveal className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#00d4ff] tracking-widest uppercase block mb-1">
            02 // EVIDENCE-BASED BIO
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
            Athletic Discipline. Production Architecture.
          </h2>
        </div>
        <p className="text-xs font-mono text-white/50 max-w-xs sm:text-right">
          Zero arbitrary skill percentages. Only verified repository proof.
        </p>
      </TimingGateReveal>

      {/* Bio + Concrete Reference Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <TimingGateReveal delay={0.1} className="lg:col-span-7 space-y-6 text-white/80 font-sans leading-relaxed">
          <p className="text-lg text-white font-medium">
            Most developer portfolios rely on hypothetical progress bars claiming "95% React proficiency." I replace subjective self-evaluations with concrete engineering output and sprint timing discipline.
          </p>
          <p>
            At <strong className="text-white">Bigscal Technologies</strong>, I work full-time architecting production frontend interfaces. I directly contribute to our enterprise <a href="https://hrms.bigscal.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">HRMS Dashboard</a>, solving complex admin workflows and high-density data presentation challenges where UI responsiveness directly impacts organizational productivity.
          </p>
          <p>
            Simultaneously, I am the lead full-stack creator of <a href="https://workoutwala.com" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">WorkoutWala.com</a>—an AI-powered fitness platform tailored specifically for Track &amp; Field sprint athletes. Built on a clean Node.js and Next.js 16 stack, it routes real-time coaching prompts via the Anthropic API and synchronizes custom training playlists using the YouTube Data API v3 and Razorpay subscription billing.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded bg-surface border border-white/10 space-y-1.5">
              <span className="text-xs font-mono text-[#00d4ff] block font-semibold">JD'S IPL PLATFORM</span>
              <p className="text-xs text-white/70">
                Architected zero-layout-shift live score updates across mobile devices (`jds-ipl.vercel.app`).
              </p>
            </div>
            <div className="p-4 rounded bg-surface border border-white/10 space-y-1.5">
              <span className="text-xs font-mono text-[#ff9500] block font-semibold">FIFA & F1 TELEMETRY</span>
              <p className="text-xs text-white/70">
                Engineered modular component trees handling high-frequency sports data feeds (`fifa-world-cup-eta.vercel.app`).
              </p>
            </div>
          </div>
        </TimingGateReveal>

        {/* Recency & Repo-Evidence Tags List */}
        <TimingGateReveal delay={0.2} className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-lg bg-surface border border-white/15 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#00d4ff]" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Verified Shipped Evidence
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded">
                100% REPO BACKED
              </span>
            </div>

            <div className="space-y-3">
              {SKILL_NODES.map((node) => (
                <div
                  key={node.id}
                  className="p-3 rounded bg-black/60 border border-white/10 hover:border-[#00d4ff]/50 transition-colors duration-100 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-white">{node.name}</span>
                    <span className="text-[10px] font-mono text-white/50">
                      Used in {node.projectsCount} Shipped Projects
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/60">
                    <span className="text-[#00d4ff]">Most Recent: {node.lastUsedProject} ({node.lastUsedYear})</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00d4ff]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TimingGateReveal>
      </div>
    </section>
  );
}
