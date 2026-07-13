"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import personalData from "@/data/personal.json";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    if (!sectionRef.current || !radarRef.current || !formRef.current) return;

    // Signal Established Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      }
    });

    gsap.set(formRef.current, { opacity: 0, x: 50 });
    gsap.set(radarRef.current, { scale: 0, opacity: 0 });

    tl.to(radarRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    })
    .to(formRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("sent");
      // Reset after a while
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-dark-surface/30 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-5xl text-text-primary mb-2 tracking-wider">
            COMMS
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-purple to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Radar / Comm Status */}
          <div className="flex flex-col items-center justify-center relative h-64 md:h-96">
            <div ref={radarRef} className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-neon-purple/30 flex items-center justify-center">
              {/* Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-neon-purple/20 scale-75"></div>
              <div className="absolute inset-0 rounded-full border border-neon-purple/10 scale-50"></div>
              
              {/* Radar Sweep */}
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(168,85,247,0.4)_360deg)] animate-[spin_4s_linear_infinite]"></div>
              
              {/* Ping blips */}
              <div className="absolute w-2 h-2 bg-neon-purple rounded-full top-1/4 right-1/4 animate-ping shadow-[0_0_10px_#A855F7]"></div>
              
              {/* Center Node */}
              <div className="absolute w-4 h-4 bg-neon-purple rounded-full shadow-[0_0_20px_#A855F7]"></div>
            </div>
            
            <div className="absolute bottom-0 text-center">
              <p className="font-mono text-neon-purple text-sm animate-pulse tracking-widest">
                SIGNAL ESTABLISHED
              </p>
              <p className="font-sans text-text-secondary text-xs mt-2">
                Awaiting transmission...
              </p>
            </div>
          </div>

          {/* Secure Transmission Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8 border-neon-purple/30">
              <h3 className="font-mono text-text-primary text-lg mb-6 uppercase tracking-widest border-b border-glass-border pb-2">
                Secure Transmission
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-2 uppercase">Callsign (Name)</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-dark-bg/50 border border-glass-border rounded px-4 py-3 text-text-primary focus:outline-none focus:border-neon-purple transition-colors font-sans"
                    placeholder="Enter your name..."
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-2 uppercase">Comm Link (Email)</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-dark-bg/50 border border-glass-border rounded px-4 py-3 text-text-primary focus:outline-none focus:border-neon-purple transition-colors font-sans"
                    placeholder="Enter your email..."
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-2 uppercase">Payload (Message)</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-dark-bg/50 border border-glass-border rounded px-4 py-3 text-text-primary focus:outline-none focus:border-neon-purple transition-colors font-sans resize-none"
                    placeholder="Enter your message..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full py-4 font-mono text-sm bg-neon-purple/20 text-text-primary hover:bg-neon-purple border border-neon-purple transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 group"
                >
                  {status === "idle" && (
                    <>
                      <span>TRANSMIT</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                  )}
                  {status === "sending" && <span className="animate-pulse">ENCRYPTING...</span>}
                  {status === "sent" && <span className="text-matrix-green">PAYLOAD DELIVERED</span>}
                </button>
              </div>

              <div className="mt-8 flex justify-center gap-6">
                {personalData.github && (
                  <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2">
                    <i className="fa-brands fa-github text-xl"></i> GitHub
                  </a>
                )}
                {personalData.linkedin && (
                  <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2">
                    <i className="fa-brands fa-linkedin text-xl"></i> LinkedIn
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}