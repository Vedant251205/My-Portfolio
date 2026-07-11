"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import projectsData from "@/data/projects.json";

export default function ProjectUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Hologram Boot Reveal
    const cards = containerRef.current.querySelectorAll('.project-card');
    
    gsap.set(cards, { opacity: 0, scaleY: 0, transformOrigin: "bottom" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        once: true,
      }
    });

    tl.to(cards, {
      opacity: 1,
      scaleY: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-dark-surface/30 overflow-hidden"
    >
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#00D4FF_1px,transparent_1px),linear-gradient(to_bottom,#00D4FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-5xl text-text-primary mb-2 tracking-wider">
            OUTPUT
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-cyber-blue to-transparent"></div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              layoutId={`project-${idx}`}
              className="project-card glass-card p-6 cursor-pointer relative group overflow-hidden border-cyber-blue/20 hover:border-cyber-blue transition-colors duration-300 h-64 flex flex-col justify-between"
              onClick={() => setSelectedProject({ ...project, id: idx })}
              whileHover={{ translateZ: 20, scale: 1.02 }}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            >
              {/* Scanline hover effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear"></div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display text-xl text-text-primary group-hover:text-cyber-blue transition-colors">
                    {project.name}
                  </h3>
                  {project.url && (
                    <span className="text-xs font-mono px-2 py-1 bg-matrix-green/20 text-matrix-green rounded border border-matrix-green/30">
                      Deployed
                    </span>
                  )}
                </div>
                <p className="font-sans text-text-secondary text-sm line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies?.map((tech, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-neon-purple px-2 py-1 bg-neon-purple/10 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Deep Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-bg/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto border-cyber-blue relative shadow-[0_0_50px_rgba(0,212,255,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="p-8">
                <h3 className="font-display text-3xl text-text-primary mb-2 shadow-cyber-blue inline-block">{selectedProject.name}</h3>
                <div className="font-mono text-cyber-blue text-sm mb-8">STATUS: <span className="text-matrix-green">ACTIVE</span></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-mono text-text-secondary uppercase text-xs tracking-widest mb-2 border-b border-glass-border pb-1">Mission Brief</h4>
                    <p className="text-text-primary/80 font-sans leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-text-secondary uppercase text-xs tracking-widest mb-2 border-b border-glass-border pb-1">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies?.map((tech: string, tIdx: number) => (
                        <span key={tIdx} className="text-xs font-mono text-neon-purple px-3 py-1 bg-neon-purple/10 rounded border border-neon-purple/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedProject.url && (
                    <a href={`https://${selectedProject.url}`} target="_blank" rel="noopener noreferrer" className="px-6 py-2 font-mono text-sm bg-cyber-blue text-dark-bg hover:bg-white transition-colors rounded shadow-[0_0_15px_#00D4FF]">
                      LIVE DEMO
                    </a>
                  )}
                  <button className="px-6 py-2 font-mono text-sm border border-glass-border text-text-primary hover:bg-white/5 transition-colors rounded">
                    GITHUB REPO
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}