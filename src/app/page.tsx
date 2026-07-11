"use client";

import { useState } from "react";
import LoadingScreen from "@/components/sections/LoadingScreen";
import GSAPProvider from "@/components/layout/GSAPProvider";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SkillsGalaxy from "@/components/sections/SkillsGalaxy";
import ProjectUniverse from "@/components/sections/ProjectUniverse";
import Terminal from "@/components/sections/Terminal";
import AIAssistant from "@/components/sections/AIAssistant";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import SectionNavigator from "@/components/layout/SectionNavigator";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GSAPProvider>
      <main className="relative bg-dark-bg min-h-screen text-text-primary overflow-hidden scanline transition-colors duration-300">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <SectionNavigator />
            <ThemeToggle />
            <Hero />
            <About />
            <SkillsGalaxy />
            <ProjectUniverse />
            <Terminal />
            <Contact />
            <Footer />
            <AIAssistant />
          </>
        )}
      </main>
    </GSAPProvider>
  );
}
