import React from "react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsConstellation from "@/components/SkillsConstellation";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import LiveStats from "@/components/LiveStats";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import KonamiEgg from "@/components/KonamiEgg";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#00d4ff] selection:text-black">
      <CustomCursor />
      <Navbar />
      <KonamiEgg />

      <Hero />
      <About />
      <SkillsConstellation />
      <Projects />
      <Experience />
      <LiveStats />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}
