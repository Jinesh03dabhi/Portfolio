"use client";

import React, { useState } from "react";
import TimingGateReveal from "./TimingGateReveal";
import { PERSONAL_INFO } from "@/lib/data";
import { Send, CheckCircle2, AlertCircle, MessageSquare, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: "Server error" }));
        throw new Error(errJson.error || "Failed to send dispatch");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrorMessage(err.message || "Dispatch delivery error. Please use WhatsApp or email directly.");
    }
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <TimingGateReveal className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#00d4ff] tracking-widest uppercase block mb-1">
            08 // DECISIVE FINISH LINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white">
            Initiate Project Split
          </h2>
        </div>
        <p className="text-xs font-mono text-white/50 max-w-sm sm:text-right">
          Direct dispatch route or instantaneous WhatsApp transmission. Sub-100ms UI confirmation.
        </p>
      </TimingGateReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form with Floating Labels */}
        <div className="lg:col-span-7 bg-surface border border-white/15 rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold font-display text-white">Direct Transmission Protocol</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Floating Input */}
            <div className="relative">
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 rounded bg-black/60 border border-white/20 text-white font-sans text-sm focus:outline-none focus:border-[#00d4ff] transition-colors duration-100 placeholder-transparent"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-2 text-[11px] font-mono text-white/50 uppercase tracking-wider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#00d4ff]"
              >
                Sender Name / Organization
              </label>
            </div>

            {/* Email Floating Input */}
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 rounded bg-black/60 border border-white/20 text-white font-sans text-sm focus:outline-none focus:border-[#00d4ff] transition-colors duration-100 placeholder-transparent"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-[11px] font-mono text-white/50 uppercase tracking-wider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#00d4ff]"
              >
                Return Email Address
              </label>
            </div>

            {/* Message Floating Textarea */}
            <div className="relative">
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 rounded bg-black/60 border border-white/20 text-white font-sans text-sm focus:outline-none focus:border-[#00d4ff] transition-colors duration-100 placeholder-transparent resize-none"
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-2 text-[11px] font-mono text-white/50 uppercase tracking-wider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#00d4ff]"
              >
                Project Specification & Timeline Brief
              </label>
            </div>

            {/* Form Feedback States */}
            {status === "success" && (
              <div className="p-4 rounded bg-[#00d4ff]/10 border border-[#00d4ff] flex items-center gap-3 text-sm font-mono text-[#00d4ff]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Dispatch received! I will review your specification within 24 hours.</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-sm font-mono text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              data-interactive
              className="w-full py-4 rounded bg-[#00d4ff] text-black font-display font-bold text-sm tracking-wide hover:bg-white hover:shadow-[0_0_20px_rgba(0,212,255,0.8)] transition-all duration-100 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{status === "submitting" ? "TRANSMITTING..." : "FIRE DISPATCH"}</span>
            </button>
          </form>
        </div>

        {/* Instant Contact Links & Verified Social Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-black border border-[#00d4ff]/50 space-y-4">
            <span className="text-xs font-mono font-bold text-[#00d4ff] uppercase tracking-wider block">
              INSTANTANEOUS ROUTE // WHATSAPP
            </span>
            <h3 className="text-2xl font-bold font-display text-white">Need an immediate answer?</h3>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Connect directly with my mobile transmission line. Pre-populated with inquiry protocol.
            </p>
            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsappNumber}?text=${encodeURIComponent(PERSONAL_INFO.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="w-full py-3.5 rounded bg-[#25D366] text-black font-display font-bold text-xs uppercase tracking-wide hover:brightness-110 transition-all duration-100 flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Launch WhatsApp Chat ({PERSONAL_INFO.phone})</span>
            </a>
          </div>

          <div className="p-6 rounded-xl bg-surface border border-white/15 space-y-4 font-mono text-xs">
            <span className="font-bold text-white uppercase block border-b border-white/10 pb-2">
              Verified Coordinates
            </span>
            <div className="flex items-center gap-3 text-white/80">
              <Mail className="w-4 h-4 text-[#00d4ff] shrink-0" />
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#00d4ff]">
                {PERSONAL_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <MapPin className="w-4 h-4 text-[#ff9500] shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-black/60 border border-white/10 text-white/80 hover:text-[#00d4ff] hover:border-[#00d4ff] text-center transition-colors duration-100"
              >
                GitHub
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-black/60 border border-white/10 text-white/80 hover:text-[#00d4ff] hover:border-[#00d4ff] text-center transition-colors duration-100"
              >
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.socials.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-black/60 border border-white/10 text-white/80 hover:text-[#00d4ff] hover:border-[#00d4ff] text-center transition-colors duration-100"
              >
                Upwork Profile
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-black/60 border border-white/10 text-white/80 hover:text-[#00d4ff] hover:border-[#00d4ff] text-center transition-colors duration-100"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
