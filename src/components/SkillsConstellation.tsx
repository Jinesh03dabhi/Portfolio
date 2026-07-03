"use client";

import React, { useState } from "react";
import TimingGateReveal from "./TimingGateReveal";
import { SKILL_NODES, SkillNode } from "@/lib/data";
import { Network, Filter } from "lucide-react";

interface SkillsConstellationProps {
  onSelectCategory?: (category: string) => void;
}

export default function SkillsConstellation({ onSelectCategory }: SkillsConstellationProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>("react");

  const activeNode = SKILL_NODES.find((n) => n.id === activeNodeId) || SKILL_NODES[0];

  const handleNodeClick = (node: SkillNode) => {
    setActiveNodeId(node.id);
    if (onSelectCategory) {
      // Map skill category or name to project filter tab
      const categoryMap: Record<string, string> = {
        "react": "React",
        "nextjs": "Next",
        "nodejs": "Full-Stack",
        "restapi": "Full-Stack",
        "typescript": "Full-Stack",
        "tailwindcss": "All"
      };
      onSelectCategory(categoryMap[node.id] || "All");
    }
    // Smooth jump to projects section
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <TimingGateReveal className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#00d4ff] tracking-widest uppercase block mb-1">
            03 // PROJECT CO-USAGE CONSTELLATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
            Verified Stack Topology
          </h2>
        </div>
        <p className="text-xs font-mono text-white/50 max-w-sm sm:text-right">
          Lines represent proven co-usage in real production repositories. Click any node to filter shipped projects.
        </p>
      </TimingGateReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface border border-white/15 rounded-xl p-6 sm:p-8">
        {/* Constellation Network Visualizer */}
        <div className="lg:col-span-7 relative min-h-[340px] flex items-center justify-center p-4">
          {/* SVG Connecting Lines representing exact coUsedWith arrays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/15 stroke-[1.5]">
            {/* Center node connections */}
            <line x1="50%" y1="50%" x2="25%" y2="25%" className={activeNodeId === "react" ? "stroke-[#00d4ff] stroke-2" : ""} />
            <line x1="50%" y1="50%" x2="75%" y2="25%" className={activeNodeId === "nextjs" ? "stroke-[#00d4ff] stroke-2" : ""} />
            <line x1="50%" y1="50%" x2="20%" y2="70%" className={activeNodeId === "typescript" ? "stroke-[#00d4ff] stroke-2" : ""} />
            <line x1="50%" y1="50%" x2="80%" y2="70%" className={activeNodeId === "tailwindcss" ? "stroke-[#00d4ff] stroke-2" : ""} />
            <line x1="25%" y1="25%" x2="75%" y2="25%" className="stroke-white/10" />
            <line x1="20%" y1="70%" x2="80%" y2="70%" className="stroke-white/10" />
          </svg>

          {/* Render Interactive Nodes in a responsive grid layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full z-10">
            {SKILL_NODES.map((node) => {
              const isSelected = activeNodeId === node.id;
              const isConnected = activeNode?.coUsedWith.includes(node.id);

              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  data-interactive
                  data-cursor-label="Filter"
                  className={`p-4 rounded-lg border text-left transition-all duration-100 flex flex-col justify-between h-28 ${
                    isSelected
                      ? "bg-[#00d4ff]/15 border-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.4)] scale-105"
                      : isConnected
                      ? "bg-black/80 border-white/30 hover:border-[#00d4ff]"
                      : "bg-black/40 border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white/50">{node.category}</span>
                    <Network className={`w-4 h-4 ${isSelected ? "text-[#00d4ff]" : "text-white/40"}`} />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm text-white block leading-tight">
                      {node.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#00d4ff] block mt-1">
                      {node.projectsCount} Shipped Projects
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Pane */}
        <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs font-bold text-[#00d4ff] uppercase">
              Selected Node Telemetry
            </span>
            <Filter className="w-4 h-4 text-[#00d4ff]" />
          </div>

          <div>
            <h3 className="text-2xl font-bold font-display text-white">{activeNode.name}</h3>
            <p className="text-xs font-mono text-white/60 mt-0.5">Category: {activeNode.category}</p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Verified Co-Usage:</span>
              <span className="text-white font-semibold">{activeNode.coUsedWith.join(", ")}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Latest Production Deploy:</span>
              <span className="text-[#00d4ff] font-semibold">{activeNode.lastUsedProject} ({activeNode.lastUsedYear})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-white/50">Production Impact:</span>
              <span className="text-white">Active in {activeNode.projectsCount} verified systems</span>
            </div>
          </div>

          <button
            onClick={() => handleNodeClick(activeNode)}
            data-interactive
            className="w-full mt-4 py-2.5 rounded bg-[#00d4ff]/20 border border-[#00d4ff] text-[#00d4ff] font-mono text-xs font-bold hover:bg-[#00d4ff] hover:text-black transition-all duration-100 flex items-center justify-center gap-2"
          >
            <span>Filter Projects by {activeNode.name}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
