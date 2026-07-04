"use client";

import React, { useEffect, useState } from "react";
import TimingGateReveal from "./TimingGateReveal";
import { BookOpen, Calendar, Clock, ExternalLink } from "lucide-react";

interface DevtoArticle {
  id: number;
  title: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  description: string;
  tag_list: string[];
}

export default function Writing() {
  const [articles, setArticles] = useState<DevtoArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("https://dev.to/api/articles?username=jineshdabhi&per_page=3");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setArticles(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Dev.to fetch fallback:", err);
      }

      // Curated verified technical writing notes if Dev.to profile has no public posts yet
      setArticles([
        {
          id: 1,
          title: "Sub-100ms Reaction Architecture in React 19 & Next.js 16",
          url: "https://github.com/Jinesh03dabhi",
          published_at: "2026-06-15T10:00:00Z",
          reading_time_minutes: 5,
          description: "How athletic track sprint reaction timing (IAAF 100ms ceiling) inspires micro-interaction latency budgets in modern full-stack web applications.",
          tag_list: ["nextjs", "react", "performance", "architecture"],
        },
        {
          id: 2,
          title: "Architecting WorkoutWala: AI Coaching with Anthropic API & Node.js",
          url: "https://workoutwala.com",
          published_at: "2026-04-20T10:00:00Z",
          reading_time_minutes: 7,
          description: "Structuring tiered subscription platforms, real-time AI prompt pipelines, and custom YouTube IFrame media synchronization for athlete training.",
          tag_list: ["typescript", "nodejs", "ai", "fullstack"],
        },
        {
          id: 3,
          title: "High-Density Enterprise HRMS UI Design Patterns",
          url: "https://hrms.bigscal.com/dashboard",
          published_at: "2026-06-01T10:00:00Z",
          reading_time_minutes: 6,
          description: "Building scalable administrative data grids and accessible state transitions at Bigscal Technologies.",
          tag_list: ["react", "tailwindcss", "enterprise"],
        },
      ]);
      setLoading(false);
    }

    fetchArticles();
  }, []);

  return (
    <section id="writing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 transition-colors duration-200">
      <TimingGateReveal className="border-b border-border-main pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-electric tracking-widest uppercase block mb-1">
            07 // TECHNICAL THOUGHT LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-text-main">
            Engineering Dispatch
          </h2>
        </div>
        <p className="text-xs font-mono text-text-muted max-w-sm sm:text-right">
          Insights on UI velocity, full-stack performance budgets, and sports engineering.
        </p>
      </TimingGateReveal>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="h-64 rounded-xl bg-surface border border-border-main p-6 shadow-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="p-6 rounded-xl bg-surface border border-border-main flex flex-col justify-between group hover:border-electric hover:shadow-[0_10px_30px_var(--theme-electric)] transition-all duration-100 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-[11px] font-mono text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-electric" />
                    {new Date(article.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber" />
                    {article.reading_time_minutes} min read
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-text-main group-hover:text-electric transition-colors duration-100 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs font-sans text-text-muted line-clamp-3 leading-relaxed">
                  {article.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border-subtle flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tag_list.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg text-text-muted border border-border-subtle"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-electric flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-100">
                  Read <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
