"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { Sun, Moon, Monitor } from "lucide-react";
import { raceCurve, raceTiming } from "@/lib/motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center gap-1 bg-surface border border-border-main rounded-full p-1 h-8 w-24 animate-pulse" />
    );
  }

  const tabs = [
    { id: "light", label: "Light Mode", icon: Sun },
    { id: "dark", label: "Dark Mode", icon: Moon },
    { id: "system", label: "System Theme", icon: Monitor },
  ];

  return (
    <div
      data-interactive
      className="flex items-center gap-1 bg-surface border border-border-main rounded-full p-1 shadow-inner relative"
      role="group"
      aria-label="Theme selection"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = theme === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setTheme(tab.id)}
            data-interactive
            data-cursor-label={tab.id.toUpperCase()}
            aria-label={tab.label}
            aria-pressed={isActive}
            className={`relative p-1.5 rounded-full text-xs transition-colors duration-100 focus:outline-none focus:ring-1 focus:ring-electric ${isActive
              ? "text-electric dark:text-white font-bold"
              : "text-text-muted hover:text-text-main"
              }`}
          >
            {isActive && (
              <motion.div
                layoutId="themeToggleTab"
                transition={{
                  duration: raceTiming.reactionCeiling,
                  ease: raceCurve.maxVelocity,
                }}
                className="absolute inset-0 bg-electric rounded-full -z-10 shadow-[0_0_10px_var(--theme-electric)]"
              />
            )}
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}
