"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import personalData from "@/data/personal.json";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !earthRef.current) return;

    // Earth Rise Reveal
    gsap.set(earthRef.current, { y: 200, opacity: 0 });

    gsap.to(earthRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%", // Trigger slightly before it fully comes into view
        end: "bottom bottom",
        scrub: 1, // Tie it to scroll progress
      },
      y: 0,
      opacity: 1,
      ease: "none"
    });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef}
      className="relative pt-32 pb-8 bg-dark-bg overflow-hidden flex flex-col items-center justify-end min-h-[40vh]"
    >
      {/* Earth Rise Graphic */}
      <div 
        ref={earthRef}
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[150vw] md:w-[80vw] aspect-[2/1] rounded-t-full bg-gradient-to-t from-dark-bg via-dark-surface to-cyber-blue/10 border-t border-cyber-blue/30 shadow-[0_-20px_100px_rgba(0,212,255,0.1)] z-0 pointer-events-none"
      >
        <div className="absolute inset-0 rounded-t-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="font-heading text-2xl text-text-primary mb-2 shadow-cyber-blue tracking-[0.2em]">
          {personalData.name.toUpperCase()}
        </h2>
        <p className="font-mono text-matrix-green text-xs mb-8">SYSTEM V3.0 // END OF TRANSMISSION</p>

        <div className="flex gap-8 mb-12 border-t border-glass-border pt-8 w-full max-w-lg justify-center">
          {[
            { label: 'GitHub', icon: 'fa-brands fa-github', url: personalData.github },
            { label: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: personalData.linkedin },
            { label: 'Email', icon: 'fa-solid fa-envelope', url: `mailto:${personalData.email}` }
          ].map((link, idx) => link.url && (
            <a 
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-text-secondary hover:text-cyber-blue transition-colors flex items-center gap-2"
            >
              <i className={`${link.icon} text-lg`}></i>
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          ))}
        </div>

        <p className="font-sans text-xs text-text-secondary/50">
          © {currentYear} {personalData.name}. All systems functional. Designed with Next.js, Three.js & Tailwind.
        </p>
      </div>
    </footer>
  );
}