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
    <main className="min-h-screen bg-bg text-text-main selection:bg-electric selection:text-white dark:selection:text-black transition-colors duration-200">
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
