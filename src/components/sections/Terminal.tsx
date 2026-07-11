"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import gsap from "gsap";
import personalData from "@/data/personal.json";

interface CommandRecord {
  cmd: string;
  output: React.ReactNode;
  isError?: boolean;
}

export default function Terminal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<CommandRecord[]>([
    { cmd: "", output: `Welcome to Vedant's Terminal. Type 'help' to get started.` }
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!sectionRef.current || !terminalRef.current) return;

    // Terminal Boot Reveal
    gsap.set(terminalRef.current, { scale: 0.9, opacity: 0 });
    
    gsap.to(terminalRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.5)",
      onComplete: () => {
        // Flicker effect on power up
        gsap.to(terminalRef.current, {
          opacity: 0.8,
          duration: 0.05,
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            gsap.set(terminalRef.current, { opacity: 1 });
            inputRef.current?.focus();
          }
        });
      }
    });
  }, []);

  // Auto-scroll to bottom on new command
  useEffect(() => {
    if (terminalRef.current) {
      const scrollContainer = terminalRef.current.querySelector('.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [history]);

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim().toLowerCase();
      let output: React.ReactNode = "";
      let isError = false;

      switch (cmd) {
        case "":
          output = "";
          break;
        case "help":
          output = (
            <div className="grid grid-cols-2 gap-2 text-cyber-blue w-64">
              <span>about</span><span className="text-text-secondary"># Identity details</span>
              <span>projects</span><span className="text-text-secondary"># List projects</span>
              <span>contact</span><span className="text-text-secondary"># Get in touch</span>
              <span>clear</span><span className="text-text-secondary"># Clear terminal</span>
              <span>sudo</span><span className="text-text-secondary"># ???</span>
            </div>
          );
          break;
        case "about":
          output = <span className="text-text-primary">{personalData.about}</span>;
          break;
        case "projects":
          output = <span className="text-matrix-green">Stack Room, Grade Tracker, Stock Platform, AI Chatbot, Sand Rover...</span>;
          break;
        case "contact":
          output = <a href={`mailto:${personalData.email}`} className="text-neon-purple hover:underline">{personalData.email}</a>;
          break;
        case "clear":
          setHistory([]);
          setInputValue("");
          return;
        case "sudo":
        case "sudo su":
          output = "Access denied. This incident will be reported.";
          isError = true;
          break;
        case "neofetch":
          output = (
            <div className="flex gap-4">
              <div className="text-cyber-blue font-bold">
<pre>{`
  /\\
 /  \\
/____\\
`}</pre>
              </div>
              <div>
                <div className="text-cyber-blue font-bold">vedant@digital-universe</div>
                <div>--------------</div>
                <div>OS: Student Developer v3.0</div>
                <div>CPU: KIIT University (CSE)</div>
                <div>RAM: Fueled by curiosity</div>
                <div>GPU: Rendering dreams since 2023</div>
              </div>
            </div>
          );
          break;
        case "sudo hire vedant":
          output = <span className="text-matrix-green">Access granted. Redirecting to contact module...</span>;
          break;
        default:
          output = `Command not found: ${cmd}`;
          isError = true;
      }

      setHistory([...history, { cmd: inputValue, output, isError }]);
      setInputValue("");
    }
  };

  return (
    <section 
      id="terminal" 
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-dark-bg flex items-center justify-center border-t border-glass-border"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-5xl text-text-primary mb-2 tracking-wider">
            TERMINAL
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-matrix-green to-transparent mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <div 
            ref={terminalRef}
            className="w-full bg-[#0d1117] rounded-lg border border-[#30363d] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-[#8b949e] text-xs font-sans select-none">
                visitor@vedant.dev : ~
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-[400px] overflow-y-auto text-[#c9d1d9] flex flex-col gap-2 scrollbar-thin scrollbar-thumb-[#30363d]">
              {history.map((record, idx) => (
                <div key={idx}>
                  {record.cmd && (
                    <div className="flex gap-2 text-cyber-blue">
                      <span>visitor@vedant.dev:~$</span>
                      <span className="text-text-primary">{record.cmd}</span>
                    </div>
                  )}
                  {record.output && (
                    <div className={`mt-1 ${record.isError ? 'text-red-400' : 'text-text-secondary'}`}>
                      {record.output}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Input Line */}
              <div className="flex gap-2 text-cyber-blue mt-1">
                <span>visitor@vedant.dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent outline-none text-text-primary flex-1 caret-matrix-green"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}