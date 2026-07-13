"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import personalData from "@/data/personal.json";
import { Canvas } from "@react-three/fiber";
import Hero3D from "./Hero3D";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e3a8a] via-dark-bg to-dark-bg transition-colors duration-500"
    >
      {/* 3D Background Centerpiece */}
      <div className="absolute inset-0 z-0 opacity-90 mix-blend-screen dark:mix-blend-normal">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Hero3D />
        </Canvas>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center h-full pointer-events-none">
        
        <motion.div
          className="flex flex-col items-center justify-center mt-12"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Top Subtitle */}
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-text-secondary uppercase mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            {personalData.role[0] || "SOFTWARE ENGINEER"}
          </span>
          
          {/* Main Title (Elegant Serif) */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-9xl font-normal text-text-primary drop-shadow-[0_0_40px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_40px_rgba(0,0,0,0.8)] leading-none mb-6 tracking-tight">
            VEDANT MISHRA
          </h1>

          {/* Bottom Subtitle */}
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-cyber-blue uppercase mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            {personalData.role[1] || "FULL STACK WEB"}
          </span>
        </motion.div>
        
      </div>
      
      {/* Elegant Side Indicators */}
      <motion.div 
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-4 text-text-secondary/50 font-mono text-xs"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span>01</span>
        <div className="w-12 h-[1px] bg-text-secondary/30"></div>
        <span className="text-cyber-blue opacity-80">&rarr;</span>
      </motion.div>

      <motion.div 
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 text-text-secondary/30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="w-1 h-1 rounded-full bg-cyber-blue shadow-[0_0_8px_#00d4ff]"></span>
        <span className="w-1 h-1 rounded-full bg-current"></span>
        <span className="w-1 h-1 rounded-full bg-current"></span>
        <span className="w-1 h-1 rounded-full bg-current"></span>
      </motion.div>

      {/* Navigation Buttons (Redesigned for the minimalist look) */}
      <motion.div
        className="absolute bottom-12 z-30 flex flex-wrap justify-center gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <a href="#about" className="px-8 py-3 font-mono text-[10px] sm:text-xs border border-glass-border text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all rounded-full bg-dark-bg/20 backdrop-blur-md">
          EXPLORE
        </a>
        <a href="#contact" className="px-8 py-3 font-mono text-[10px] sm:text-xs border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 transition-all rounded-full bg-dark-bg/20 backdrop-blur-md">
          CONTACT
        </a>
      </motion.div>

    </section>
  );
}