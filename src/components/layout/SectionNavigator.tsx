"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "System Boot" },
  { id: "about", label: "Identity" },
  { id: "skills", label: "Capability" },
  { id: "projects", label: "Output" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Comms" },
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(parseFloat(progress));

      // Determine active section based on Intersection Observer logic 
      // (Simplified here: normally we'd use true IntersectionObserver for accuracy)
      const sections = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
      
      let current = "hero";
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If top of section is above the middle of screen
          if (rect.top <= window.innerHeight / 2) {
            current = section.id;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Progress Line */}
      <div className="absolute right-1 top-0 bottom-0 w-[1px] bg-glass-border">
        <motion.div 
          className="w-full bg-cyber-blue shadow-[0_0_10px_#00D4FF]"
          style={{ height: `${scrollProgress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {SECTIONS.map((section) => (
        <div 
          key={section.id}
          className="relative flex items-center gap-4 group pointer-events-auto cursor-pointer"
          onClick={() => scrollTo(section.id)}
        >
          <span 
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
              activeSection === section.id 
                ? "text-cyber-blue opacity-100 translate-x-0" 
                : "text-text-secondary opacity-0 translate-x-4 group-hover:opacity-50 group-hover:translate-x-2"
            }`}
          >
            {section.label}
          </span>
          <div 
            className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 bg-dark-bg z-10 ${
              activeSection === section.id
                ? "border-cyber-blue scale-125 shadow-[0_0_10px_#00D4FF]"
                : "border-glass-border scale-100 group-hover:border-text-secondary"
            }`}
          />
        </div>
      ))}
    </div>
  );
}