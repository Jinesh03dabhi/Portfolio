"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TimingGateReveal from "./TimingGateReveal";
import { EXPERIENCES } from "@/lib/data";
import { ExternalLink, Flag } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackLineRef.current || !containerRef.current) return;

    gsap.fromTo(
      trackLineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <TimingGateReveal className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#00d4ff] tracking-widest uppercase block mb-1">
            05 // SPRINT CHRONOLOGY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
            Track Lane Split History
          </h2>
        </div>
        <p className="text-xs font-mono text-white/50 max-w-sm sm:text-right">
          GSAP ScrollTrigger choreographs the lane distance marker line-draw in real time.
        </p>
      </TimingGateReveal>

      <div ref={containerRef} className="relative pl-6 sm:pl-12 py-4">
        {/* Static Background Lane Border */}
        <div className="absolute top-0 bottom-0 left-3 sm:left-6 w-0.5 lane-border" />

        {/* GSAP Scroll-Pinned Electric Blue Timing Laser Rail */}
        <div
          ref={trackLineRef}
          className="absolute top-0 bottom-0 left-3 sm:left-6 w-[3px] bg-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.8)] origin-top z-10"
        />

        {/* Experience Cards along Track Markers */}
        <div className="space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              {/* Distance Lap Marker Node */}
              <div className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#121214] border-2 border-[#00d4ff] flex items-center justify-center z-20 shadow-[0_0_10px_rgba(0,212,255,0.5)] group-hover:bg-[#00d4ff] transition-colors duration-100">
                <Flag className="w-3 h-3 text-white group-hover:text-black transition-colors duration-100" />
              </div>

              {/* Card Container */}
              <div className="bg-surface border border-white/15 rounded-xl p-6 sm:p-8 space-y-4 hover:border-[#00d4ff]/50 transition-all duration-100 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#00d4ff] uppercase tracking-wider block">
                      SPLIT MARKER: {exp.splitDistance}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white mt-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-mono text-white/70">{exp.company}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded bg-black border border-white/15 text-xs font-mono text-white/80">
                      {exp.period}
                    </span>
                    {exp.liveUrl && (
                      <a
                        href={exp.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-interactive
                        className="p-2 rounded bg-black border border-white/15 text-white/80 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all duration-100"
                        aria-label={`Visit live link for ${exp.company}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm font-sans text-white/80 list-disc list-inside">
                  {exp.description.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
