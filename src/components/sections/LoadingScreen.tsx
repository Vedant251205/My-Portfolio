"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "welcome">("loading");

  useEffect(() => {
    let currentProgress = 0;
    
    // Simple 2-second loading simulation
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setPhase("welcome"), 500);
      } else {
        setProgress(currentProgress);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "welcome") {
      setTimeout(() => {
        // Trigger zoom out transition
        gsap.to(".loading-container", {
          scale: 3,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
          onComplete: onComplete,
        });
      }, 1500);
    }
  }, [phase, onComplete]);

  return (
    <div className="loading-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg font-mono text-cyber-blue p-4">
      {/* Background Matrix/Particles placeholder */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-blue/20 via-dark-bg to-dark-bg"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="border border-cyber-blue/30 p-8 rounded bg-dark-bg/80 backdrop-blur-sm shadow-[0_0_30px_rgba(0,212,255,0.15)] flex flex-col items-center">
          
          <div className="mb-12 text-center px-4">
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl tracking-[0.15em] sm:tracking-[0.2em] text-text-primary glow-text inline-block mb-4 shadow-cyber-blue">
              VEDANT&apos;S DIGITAL WORKSPACE
            </h1>
            <div className="h-px w-full max-w-lg mx-auto bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent mt-2"></div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between items-end mb-2">
              <span className="animate-pulse text-sm">LOADING...</span>
              <span className="text-sm opacity-80">{progress}%</span>
            </div>
            
            <div className="w-full bg-glass-bg rounded-full h-1.5 mb-2 overflow-hidden border border-glass-border">
              <motion.div
                className="bg-gradient-to-r from-cyber-blue to-neon-purple h-1.5 rounded-full shadow-[0_0_10px_#00D4FF]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.15 }}
              ></motion.div>
            </div>
          </div>

          <AnimatePresence>
            {phase === "welcome" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-dark-bg/95 z-20 rounded"
              >
                <h2 className="font-heading text-3xl sm:text-5xl tracking-[0.2em] text-text-primary mb-4 shadow-cyber-blue">
                  WELCOME, VISITOR.
                </h2>
                <p className="font-sans text-text-secondary tracking-widest text-sm uppercase">
                  Entering Vedant&apos;s Digital Workspace
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}