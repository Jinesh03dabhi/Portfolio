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
    <section id="skills" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 transition-colors duration-200">
      <TimingGateReveal className="border-b border-border-main pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-electric tracking-widest uppercase block mb-1">
            03 // PROJECT CO-USAGE CONSTELLATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-text-main">
            Verified Stack Topology
          </h2>
        </div>
        <p className="text-xs font-mono text-text-muted max-w-sm sm:text-right">
          Lines represent proven co-usage in real production repositories. Click any node to filter shipped projects.
        </p>
      </TimingGateReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface border border-border-main rounded-xl p-6 sm:p-8 shadow-sm">
        {/* Constellation Network Visualizer */}
        <div className="lg:col-span-7 relative min-h-[340px] flex items-center justify-center p-4">
          {/* SVG Connecting Lines representing exact coUsedWith arrays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-border-main stroke-[1.5]">
            {/* Center node connections */}
            <line x1="50%" y1="50%" x2="25%" y2="25%" className={activeNodeId === "react" ? "stroke-electric stroke-2" : ""} />
            <line x1="50%" y1="50%" x2="75%" y2="25%" className={activeNodeId === "nextjs" ? "stroke-electric stroke-2" : ""} />
            <line x1="50%" y1="50%" x2="20%" y2="70%" className={activeNodeId === "typescript" ? "stroke-electric stroke-2" : ""} />
            <line x1="50%" y1="50%" x2="80%" y2="70%" className={activeNodeId === "tailwindcss" ? "stroke-electric stroke-2" : ""} />
            <line x1="25%" y1="25%" x2="75%" y2="25%" className="stroke-border-subtle" />
            <line x1="20%" y1="70%" x2="80%" y2="70%" className="stroke-border-subtle" />
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
                      ? "bg-electric/15 border-electric shadow-[0_0_15px_var(--theme-electric)] scale-105"
                      : isConnected
                      ? "bg-bg/80 border-border-main hover:border-electric shadow-xs"
                      : "bg-bg/40 border-border-subtle opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-text-muted">{node.category}</span>
                    <Network className={`w-4 h-4 ${isSelected ? "text-electric" : "text-text-subtle"}`} />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm text-text-main block leading-tight">
                      {node.name}
                    </span>
                    <span className="text-[10px] font-mono text-electric block mt-1">
                      {node.projectsCount} Shipped Projects
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Pane */}
        <div className="lg:col-span-5 bg-bg/80 border border-border-main rounded-lg p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="font-mono text-xs font-bold text-electric uppercase">
              Selected Node Telemetry
            </span>
            <Filter className="w-4 h-4 text-electric" />
          </div>

          <div>
            <h3 className="text-2xl font-bold font-display text-text-main">{activeNode.name}</h3>
            <p className="text-xs font-mono text-text-muted mt-0.5">Category: {activeNode.category}</p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <span className="text-text-muted">Verified Co-Usage:</span>
              <span className="text-text-main font-semibold">{activeNode.coUsedWith.join(", ")}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <span className="text-text-muted">Latest Production Deploy:</span>
              <span className="text-electric font-semibold">{activeNode.lastUsedProject} ({activeNode.lastUsedYear})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-text-muted">Production Impact:</span>
              <span className="text-text-main">Active in {activeNode.projectsCount} verified systems</span>
            </div>
          </div>

          <button
            onClick={() => handleNodeClick(activeNode)}
            data-interactive
            className="w-full mt-4 py-2.5 rounded bg-electric/20 border border-electric text-electric font-mono text-xs font-bold hover:bg-electric hover:text-white dark:hover:text-black transition-all duration-100 flex items-center justify-center gap-2"
          >
            <span>Filter Projects by {activeNode.name}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
