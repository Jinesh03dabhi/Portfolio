"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import TimingGateReveal from "./TimingGateReveal";
import { PROJECTS, Project } from "@/lib/data";
import { raceCurve, raceTiming } from "@/lib/motion";
import { ExternalLink, Sparkles } from "lucide-react";

interface ProjectsProps {
  externalCategory?: string | null;
}

const FILTER_CATEGORIES: Array<'All' | 'React' | 'Next' | 'Full-Stack'> = [
  "All",
  "React",
  "Next",
  "Full-Stack",
];

// Clamped pointer-tracked 3D tilt card (±6deg max)
function TiltProjectCard({ project }: { project: Project }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate normalized position (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Strict clamp to ±6 degrees
    const rotateY = Math.max(-6, Math.min(6, xPct * 12));
    const rotateX = Math.max(-6, Math.min(6, -yPct * 12));

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: raceTiming.accelerationSplit,
        ease: raceCurve.acceleration,
      }}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        rotateX: isHovered ? tilt.rotateX : 0,
        rotateY: isHovered ? tilt.rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-xl bg-surface border border-white/15 p-6 flex flex-col justify-between group overflow-hidden transition-shadow duration-100 hover:shadow-[0_10px_30px_rgba(0,212,255,0.15)] hover:border-[#00d4ff]/50"
    >
      {/* Photo-finish timing sweep on top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-100" />

      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black border border-white/10 text-[#00d4ff] uppercase tracking-wider">
              {project.category} // {project.year}
            </span>
            <h3 className="text-2xl font-bold font-display text-white mt-2 group-hover:text-[#00d4ff] transition-colors duration-100">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-white/60">{project.subtitle}</p>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            data-cursor-label="Live"
            className="p-2 rounded-full bg-black border border-white/15 text-white/80 hover:text-black hover:bg-[#00d4ff] hover:border-[#00d4ff] transition-all duration-100 shrink-0"
            aria-label={`Visit live URL for ${project.title}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Description */}
        <p className="text-sm text-white/75 font-sans leading-relaxed">
          {project.description}
        </p>

        {/* Performance / Metric Highlight */}
        {project.metrics && (
          <div className="p-2.5 rounded bg-black/70 border-l-2 border-[#ff9500] flex items-center gap-2 text-xs font-mono text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9500] shrink-0" />
            <span>{project.metrics}</span>
          </div>
        )}
      </div>

      {/* Tech Stack Footer */}
      <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono px-2 py-1 rounded bg-black/50 border border-white/10 text-white/70"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects({ externalCategory }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'React' | 'Next' | 'Full-Stack'>("All");

  useEffect(() => {
    if (externalCategory && FILTER_CATEGORIES.includes(externalCategory as any)) {
      setSelectedCategory(externalCategory as any);
    }
  }, [externalCategory]);

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <TimingGateReveal className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#00d4ff] tracking-widest uppercase block mb-1">
            04 // VERIFIED SHIPPED REPOSITORIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
            Production Showcases
          </h2>
        </div>
        <p className="text-xs font-mono text-white/50 max-w-sm sm:text-right">
          Every project features photo-finish timing gates and clamped ±6deg 3D tilt kinematics.
        </p>
      </TimingGateReveal>

      {/* FLIP Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTER_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            data-interactive
            className={`relative px-5 py-2 rounded-full text-xs font-mono transition-colors duration-100 ${
              selectedCategory === category
                ? "text-black font-bold"
                : "text-white/70 bg-surface border border-white/10 hover:text-white hover:border-white/30"
            }`}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="activeFilterTab"
                transition={{
                  duration: raceTiming.reactionCeiling,
                  ease: raceCurve.maxVelocity,
                }}
                className="absolute inset-0 bg-[#00d4ff] rounded-full -z-10 shadow-[0_0_15px_rgba(0,212,255,0.6)]"
              />
            )}
            <span>{category} Systems</span>
          </button>
        ))}
      </div>

      {/* FLIP Animated Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <TiltProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
