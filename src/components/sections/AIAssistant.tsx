"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'SYSTEM ONLINE. I am Vedant OS AI. How can I assist you with exploring this portfolio?' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsTyping(true);

    // Simulate LLM delay and response
    setTimeout(() => {
      let botReply = "I am currently in restricted demo mode. To fully activate my LLM capabilities, an API key must be provided in the environment variables.";
      
      if (userMsg.toLowerCase().includes("vedant") || userMsg.toLowerCase().includes("who")) {
        botReply = "Vedant is a Full Stack Developer and AI enthusiast currently studying at KIIT University. He specializes in React, Next.js, and integrating AI into web applications.";
      } else if (userMsg.toLowerCase().includes("project")) {
        botReply = "Vedant has built several impressive projects, including Stack Room, a Student Grade Tracker, and an AI-powered chatbot. You can check them out in the 'Output' section above!";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Orb */}
      <motion.div 
        className="fixed bottom-6 left-6 z-50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-14 h-14 rounded-full bg-cyber-blue shadow-[0_0_20px_#00D4FF] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/50 to-transparent mix-blend-overlay"></div>
          <div className="w-10 h-10 rounded-full bg-white/20 blur-sm animate-pulse"></div>
          <svg className="w-6 h-6 text-text-primary absolute z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: "bottom left" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 glass-card border-cyber-blue/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-glass-border bg-dark-surface flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-matrix-green animate-pulse"></div>
                <h3 className="font-mono text-sm text-text-primary">Vedant OS AI [LLM-Mode]</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-glass-border">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 text-sm font-sans leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cyber-blue text-dark-bg rounded-br-none' 
                      : 'bg-dark-surface border border-glass-border text-text-primary rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-dark-surface border border-glass-border rounded-lg rounded-bl-none p-4 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-glass-border bg-dark-surface">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..." 
                  className="flex-1 bg-dark-bg border border-glass-border rounded px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-cyber-blue transition-colors font-sans"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-cyber-blue text-dark-bg px-3 py-2 rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}