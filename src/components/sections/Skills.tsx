"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skillsData from "@/data/skills.json";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const categories = sectionRef.current.querySelectorAll(".skill-category");
    
    categories.forEach((category, i) => {
      gsap.fromTo(category,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            once: true
          }
        }
      );
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
          <div className="w-16 h-1 bg-primary rounded mx-auto mb-4"></div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and core competencies acquired through academic study and hands-on project development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, idx) => (
            <div key={idx} className="glass-card p-8 skill-category">
              <h3 className="font-heading text-xl font-bold mb-6 text-primary border-b border-border pb-4">
                {category.category}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded bg-surface flex items-center justify-center shrink-0 border border-border group-hover:border-primary transition-colors text-text-secondary group-hover:text-primary">
                      <i className={`${skill.icon} text-lg`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-text">{skill.name}</h4>
                      <span className="text-xs text-text-secondary">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
