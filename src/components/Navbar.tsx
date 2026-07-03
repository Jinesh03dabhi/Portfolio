"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { raceCurve, raceTiming } from "@/lib/motion";
import { Menu, X, Terminal } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stats", href: "#stats" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-100 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          data-interactive
          data-cursor-label="Start"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00d4ff] rounded px-2 py-1"
        >
          <div className="w-8 h-8 rounded bg-[#121214] border border-white/20 flex items-center justify-center group-hover:border-[#00d4ff] transition-colors duration-100">
            <Terminal className="w-4 h-4 text-[#00d4ff]" />
          </div>
          <div>
            <span className="font-display font-bold tracking-tight text-white block text-sm leading-none">
              JINESH DABHI
            </span>
            <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase block mt-0.5 group-hover:text-[#00d4ff] transition-colors duration-100">
              Split Second v2
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121214]/80 border border-white/10 rounded-full px-4 py-1.5 shadow-inner">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-interactive
              className="px-3 py-1.5 rounded-full text-xs font-mono text-white/70 hover:text-white hover:bg-white/5 transition-all duration-100 focus:outline-none focus:ring-1 focus:ring-[#00d4ff]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded bg-black border border-white/10 text-[10px] font-mono text-white/60">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          <span>IAAF ≤100ms CEILING</span>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded bg-surface border border-white/10 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#00d4ff]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: raceTiming.reactionCeiling,
              ease: raceCurve.maxVelocity,
            }}
            className="md:hidden bg-[#121214] border-b border-white/10 px-6 py-4 space-y-2"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-mono text-white/80 hover:text-[#00d4ff] border-b border-white/5 transition-colors duration-100"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
