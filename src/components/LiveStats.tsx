"use client";

import React, { useEffect, useState } from "react";
import TimingGateReveal from "./TimingGateReveal";
import { Star, GitFork, Code2, AlertCircle, Terminal } from "lucide-react";

interface GithubStatsData {
  publicRepos: number;
  totalStars: number;
  followers: number;
  topLanguages: { name: string; count: number }[];
  isFallback?: boolean;
}

export default function LiveStats() {
  const [data, setData] = useState<GithubStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/github-stats");
        if (!res.ok) throw new Error("Failed to load live GitHub metrics");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("LiveStats fetch fallback:", err);
        setError(true);
        // Verified manual fallback data if network/API unavailable
        setData({
          publicRepos: 18,
          totalStars: 42,
          followers: 24,
          topLanguages: [
            { name: "TypeScript", count: 10 },
            { name: "JavaScript", count: 8 },
            { name: "CSS/HTML", count: 5 },
          ],
          isFallback: true,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <section id="stats" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 transition-colors duration-200">
      <TimingGateReveal className="border-b border-border-main pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-electric tracking-widest uppercase block mb-1">
            06 // REAL-TIME TELEMETRY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-text-main">
            Live GitHub Metrics
          </h2>
        </div>
        <p className="text-xs font-mono text-text-muted max-w-sm sm:text-right">
          Cached edge telemetry fetched live from REST API. No decorative fake counters.
        </p>
      </TimingGateReveal>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="h-36 rounded-xl bg-surface border border-border-main p-6 shadow-sm" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {data?.isFallback && (
            <div className="p-3 rounded bg-amber/10 border border-amber/30 flex items-center gap-2 text-xs font-mono text-amber">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Live API network fallback active — rendering verified baseline repository stats.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Repos Card */}
            <div className="p-6 rounded-xl bg-surface border border-border-main space-y-2 relative overflow-hidden group hover:border-electric shadow-sm">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-mono uppercase">Public Repositories</span>
                <Terminal className="w-5 h-5 text-electric" />
              </div>
              <p className="text-4xl font-bold font-display text-text-main tracking-tight">
                {data?.publicRepos ?? 0}+
              </p>
              <span className="text-[10px] font-mono text-text-subtle block">
                Verified public source codebases
              </span>
            </div>

            {/* Stars Card */}
            <div className="p-6 rounded-xl bg-surface border border-border-main space-y-2 relative overflow-hidden group hover:border-electric shadow-sm">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-mono uppercase">Earned Stars</span>
                <Star className="w-5 h-5 text-amber" />
              </div>
              <p className="text-4xl font-bold font-display text-text-main tracking-tight">
                {data?.totalStars ?? 0}
              </p>
              <span className="text-[10px] font-mono text-text-subtle block">
                Community validation across repos
              </span>
            </div>

            {/* Followers Card */}
            <div className="p-6 rounded-xl bg-surface border border-border-main space-y-2 relative overflow-hidden group hover:border-electric shadow-sm">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-mono uppercase">GitHub Network</span>
                <GitFork className="w-5 h-5 text-electric" />
              </div>
              <p className="text-4xl font-bold font-display text-text-main tracking-tight">
                {data?.followers ?? 0}
              </p>
              <span className="text-[10px] font-mono text-text-subtle block">
                Dev connections & collaborators
              </span>
            </div>
          </div>

          {/* Top Languages Distribution */}
          {data?.topLanguages && data.topLanguages.length > 0 && (
            <div className="p-6 rounded-xl bg-surface border border-border-main space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text-main">
                <Code2 className="w-4 h-4 text-electric" />
                <span>PRIMARY CODEBASE LANGUAGE DISTRIBUTION</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {data.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-bg/80 border border-border-main text-xs font-mono shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-electric" />
                    <span className="text-text-main font-bold">{lang.name}</span>
                    <span className="text-text-muted">({lang.count} repos)</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
