"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/lib/data";

export default function Footer() {
  const [ahmedabadTime, setAhmedabadTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setAhmedabadTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-border-main bg-bg py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-text-muted">
        <div>
          <span className="font-bold text-text-main font-display block sm:inline mr-2">
            {PERSONAL_INFO.name.toUpperCase()} // v2.0
          </span>
          <span>© {new Date().getFullYear()} Navsari, Gujarat, India.</span>
        </div>

        {/* Real-Time Ahmedabad Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface border border-border-main shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          <span>AHMEDABAD / IST TIME:</span>
          <span className="text-text-main font-bold">{ahmedabadTime || "--:--:--"}</span>
        </div>

        <div>
          <span>Engineered with Next.js 16, React 19 & Tailwind v4</span>
        </div>
      </div>
    </footer>
  );
}

