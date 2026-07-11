"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import personalData from "@/data/personal.json";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scanLineRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%", // Starts when section is 40% into view
        once: true,
      }
    });

    // Reset initial states for animation
    gsap.set(contentRef.current.children, { opacity: 0, y: 20 });
    gsap.set(scanLineRef.current, { top: "0%", opacity: 1 });

    // Laser scan sweep
    tl.to(scanLineRef.current, {
      top: "100%",
      duration: 1.5,
      ease: "power2.inOut",
    })
    // Content reveal staggered behind the laser
    .to(contentRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    }, "-=1.2")
    // Fade out laser
    .to(scanLineRef.current, {
      opacity: 0,
      duration: 0.3
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-24 flex items-center bg-dark-surface/30 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Laser Scan Line */}
      <div 
        ref={scanLineRef} 
        className="absolute left-0 right-0 h-1 bg-cyber-blue shadow-[0_0_15px_#00D4FF,0_0_30px_#00D4FF] z-30 opacity-0 pointer-events-none"
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-5xl text-text-primary mb-2 tracking-wider">
            IDENTITY
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-cyber-blue to-transparent"></div>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Profile Card (Left) */}
          <div className="lg:col-span-5">
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card p-6 md:p-8 relative group"
              style={{ perspective: "1000px" }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-blue rounded-tl"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-blue rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-blue rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-blue rounded-br"></div>
              
              {/* Photo Placeholder */}
              <div className="w-full aspect-square bg-dark-bg/50 rounded overflow-hidden relative mb-6 border border-glass-border">
                <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/bottts/svg?seed=Vedant&backgroundColor=0A0A0F')] bg-cover opacity-80 mix-blend-screen group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent"></div>
                <div className="absolute bottom-4 left-4 font-mono text-xs text-cyber-blue">TARGET ACQUIRED</div>
              </div>

              <h3 className="font-display text-xl text-text-primary mb-1">{personalData.name.toUpperCase()}</h3>
              <p className="font-mono text-matrix-green text-sm mb-4">STATUS: ONLINE</p>
              
              <ul className="space-y-2 font-mono text-xs text-text-secondary">
                <li className="flex justify-between border-b border-glass-border pb-1">
                  <span>LOCATION:</span> <span className="text-text-primary">{personalData.location}</span>
                </li>
                <li className="flex justify-between border-b border-glass-border pb-1">
                  <span>SPECIALTY:</span> <span className="text-text-primary">Full Stack & AI</span>
                </li>
                <li className="flex justify-between border-b border-glass-border pb-1">
                  <span>EDUCATION:</span> <span className="text-text-primary text-right max-w-[60%] truncate" title={personalData.education.university}>{personalData.education.university}</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Details (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-mono text-neon-purple text-sm tracking-widest uppercase mb-4">&lt; SYSTEM.LOG &gt;</h3>
            <div className="prose prose-invert max-w-none font-sans text-text-secondary leading-relaxed mb-8">
              <p className="text-lg">
                {personalData.about}
              </p>
            </div>

            {/* Developer DNA */}
            <div className="glass-card p-6 border-t-2 border-t-neon-purple/50">
              <h4 className="font-mono text-sm text-text-primary mb-6 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                Developer DNA
              </h4>
              
              <div className="space-y-4">
                {[
                  { name: "Web Development", val: 90, color: "bg-cyber-blue" },
                  { name: "Artificial Intelligence", val: 75, color: "bg-neon-purple" },
                  { name: "Robotics / IoT", val: 65, color: "bg-matrix-green" },
                  { name: "Data Structures", val: 80, color: "bg-white" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className="text-text-secondary">{stat.name}</span>
                      <span className="text-text-primary">{stat.val}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-bg rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        className={`h-full ${stat.color} shadow-[0_0_10px_currentColor]`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Section (Full Width below profile and details) */}
          <div className="lg:col-span-12 mt-12">
            <h3 className="font-mono text-neon-purple text-sm tracking-widest uppercase mb-8 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              &lt; MISSION.HISTORY &gt;
            </h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyber-blue before:via-neon-purple before:to-transparent">
              
              {personalData.experience.map((exp, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-8 h-8 rounded border border-cyber-blue bg-dark-bg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_#00D4FF] absolute left-0 md:left-1/2 -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:bg-cyber-blue">
                    <div className="w-2 h-2 bg-cyber-blue group-hover:bg-dark-bg rounded-full"></div>
                  </div>
                  
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-6 ml-14 md:ml-0 border-l-2 border-l-cyber-blue hover:border-l-neon-purple transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-neon">
                    <div className="flex flex-col mb-2">
                      <h4 className="font-display text-lg text-text-primary group-hover:text-cyber-blue transition-colors">{exp.title}</h4>
                      <p className="font-mono text-sm text-matrix-green">{exp.organization}</p>
                    </div>
                    <p className="font-mono text-xs text-text-secondary mb-4 opacity-70">
                      {exp.duration}
                    </p>
                    <p className="text-sm text-text-secondary font-sans leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}