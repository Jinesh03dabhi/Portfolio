"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { raceCurve, raceTiming } from "@/lib/motion";
import { Menu, X, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

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
          ? "bg-bg/80 backdrop-blur-md border-b border-border-main py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          data-interactive
          data-cursor-label="Start"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-electric rounded px-2 py-1"
        >
          <div className="w-8 h-8 rounded bg-surface border border-border-main flex items-center justify-center group-hover:border-electric transition-colors duration-100 shadow-sm">
            <Terminal className="w-4 h-4 text-electric" />
          </div>
          <div>
            <span className="font-display font-bold tracking-tight text-text-main block text-sm leading-none">
              JINESH DABHI
            </span>
            <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase block mt-0.5 group-hover:text-electric transition-colors duration-100">
              Split Second v2
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/80 border border-border-main rounded-full px-4 py-1.5 shadow-inner">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-interactive
              className="px-3 py-1.5 rounded-full text-xs font-mono text-text-muted hover:text-text-main hover:bg-text-main/5 transition-all duration-100 focus:outline-none focus:ring-1 focus:ring-electric"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Status Indicator & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="px-3 py-1.5 rounded bg-electric/15 border border-electric text-[10px] font-mono font-bold text-electric hover:bg-electric hover:text-white dark:hover:text-black transition-all duration-100 shadow-sm"
          >
            RESUME // CV
          </a>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface border border-border-main text-[10px] font-mono text-text-muted shadow-sm">
            <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span>IAAF ≤100ms CEILING</span>
          </div>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded bg-surface border border-border-main text-text-main hover:text-electric focus:outline-none focus:ring-2 focus:ring-electric"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-electric" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
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
            className="md:hidden bg-surface border-b border-border-main px-6 py-4 space-y-2 shadow-xl"
          >
            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-mono font-bold text-electric hover:text-text-main border-b border-border-subtle transition-colors duration-100"
            >
              RESUME // CV (PDF)
            </a>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-mono text-text-main hover:text-electric border-b border-border-subtle transition-colors duration-100"
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

