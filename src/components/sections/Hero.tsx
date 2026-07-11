"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import personalData from "@/data/personal.json";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Basic mouse move parallax for a futuristic feel
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(".hero-parallax", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[120px] mix-blend-screen animate-pulse hero-parallax"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] mix-blend-screen animate-pulse hero-parallax" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>

      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="font-mono text-cyber-blue mb-4 block text-sm sm:text-base">
            &gt; SYSTEM ONLINE
          </span>
          
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-text-primary mb-6 tracking-tighter">
            <span className="block">{personalData.name.split(' ')[0].toUpperCase()}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-neon-purple">
              {personalData.name.split(' ')[1]?.toUpperCase() || ''}
            </span>
          </h1>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {personalData.role.map((role, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="font-sans text-text-secondary text-sm uppercase tracking-widest">{role}</span>
              {idx < personalData.role.length - 1 && (
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-matrix-green/50"></span>
              )}
            </div>
          ))}
          <span className="animate-pulse text-matrix-green">_</span>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <a href="#about" className="px-6 py-3 font-mono text-xs sm:text-sm border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 transition-colors rounded glass-card">
            [ EXPLORE ]
          </a>
          <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 font-mono text-xs sm:text-sm bg-dark-surface border border-glass-border text-text-primary hover:border-cyber-blue transition-colors rounded">
            GITHUB
          </a>
          <a href="#contact" className="px-6 py-3 font-mono text-xs sm:text-sm border border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10 transition-colors rounded">
            CONTACT
          </a>
        </motion.div>
        
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyber-blue/50 to-transparent"></div>
      </motion.div>

    </section>
  );
}