"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/data/projects.json";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const cards = sectionRef.current.querySelectorAll(".project-card");
    
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true
        }
      }
    );
  }, []);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Web": return "fa-solid fa-globe";
      case "Hardware": return "fa-solid fa-microchip";
      case "AI": return "fa-solid fa-brain";
      default: return "fa-solid fa-code";
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-16 h-1 bg-primary rounded mb-4"></div>
          <p className="text-text-secondary max-w-2xl">
            A selection of my recent work across web development, hardware engineering, and artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <div 
              key={idx} 
              className="project-card glass-card overflow-hidden flex flex-col h-full group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-bg border border-border rounded-full text-text-secondary">
                    <i className={`${getCategoryIcon(project.category)} text-primary`}></i>
                    {project.category}
                  </div>
                  
                  {project.url && (
                    <a 
                      href={`https://${project.url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-primary transition-colors"
                      title="Live Demo"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  )}
                </div>
                
                <h3 className="font-heading text-xl font-bold mb-3 text-text group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                
                <p className="text-sm text-text-secondary mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                {project.features && (
                  <ul className="mb-6 space-y-1 text-sm text-text-secondary">
                    {project.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <i className="fa-solid fa-check text-primary mt-1 text-[10px]"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                  {project.technologies?.map((tech, tIdx) => (
                    <span key={tIdx} className="text-xs font-medium text-text-secondary bg-bg px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
