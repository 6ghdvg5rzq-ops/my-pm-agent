'use client';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Mail, Linkedin, ArrowUpRight, Github, MessageSquare, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PMPortfolio() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Function to handle smooth scrolling to sections
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const suggestions = [
    { label: "Product Philosophy", prompt: "What is your philosophy on building products?" },
    { label: "Recent Launch", prompt: "Tell me about your most successful product launch." },
    { label: "Technical Skills", prompt: "How do you work with engineering teams?" },
    { label: "Career Goals", prompt: "What are you looking for in your next PM role?" },
  ];

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-blue-500/30 min-h-screen">
      
      {/* --- NEW TABS NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tighter text-white">
             [YOUR NAME]
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Experience', 'PM Agent Chain', 'Case Study', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollTo(tab.toLowerCase().replace(/\s+/g, '-'))}
                className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <Linkedin size={18} className="text-zinc-500 hover:text-white cursor-pointer" />
            <Mail size={18} className="text-zinc-500 hover:text-white cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* --- SECTION 1: ABOUT --- */}
      <section id="about" className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-zinc-500 uppercase tracking-widest text-xs mb-8">01. About</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
            I build products that <span className="text-zinc-600">move the needle.</span>
          </h3>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
            Product Manager with experience in [Your Industry]. Focused on bridge-building between complex engineering and human-centric design.
          </p>
        </motion.div>
      </section>

      {/* --- SECTION 2: EXPERIENCE --- */}
      <section id="experience" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5">
        <h2 className="text-zinc-500 uppercase tracking-widest text-xs mb-12">02. Experience</h2>
        <div className="space-y-16">
          <div className="group">
            <p className="text-zinc-500 mb-2">2022 — Present</p>
            <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Senior Product Manager • [Company Name]</h4>
            <p className="text-zinc-400 mt-4 leading-relaxed">Led the development of X which resulted in a 40% increase in user retention...</p>
          </div>
          {/* Add more experience blocks as needed */}
        </div>
      </section>

      {/* --- SECTION 3: PM AGENT CHAIN (The Chat) --- */}
      <section id="pm-agent-chain" className="py-20 border-t border-white/5 bg-zinc-900/20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-zinc-500 uppercase tracking-widest text-xs mb-12 text-center">03. PM Agent Chain</h2>
          
          <div className="border border-white/10 rounded-3xl bg-[#0a0a0a] h-[600px] flex flex-col overflow-hidden shadow-2xl shadow-blue-500/5">
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar" ref={scrollRef}>
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 py-10">
                    <h3 className="text-3xl font-bold tracking-tight text-center">Ask my Agent anything.</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {suggestions.map((item) => (
                        <button key={item.label} onClick={() => setInput(item.prompt)} className="text-left p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] transition-all text-sm text-zinc-400 hover:text-white">
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.map((m) => (
                <div key={m.id} className={`flex gap-4 mb-8 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role !== 'user' && <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0"><Sparkles size={14} /></div>}
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm ${m.role === 'user' ? 'bg-zinc-100 text-zinc-900 font-medium' : 'bg-zinc-900 border border-white/5 text-zinc-300'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-zinc-900/50">
              <div className="relative flex items-center">
                <input className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-blue-500/50 transition-all text-sm" value={input} placeholder="Ask about my experience..." onChange={handleInputChange} />
                <MessageSquare className="absolute left-4 text-zinc-600" size={18} />
                <button type="submit" className="absolute right-2 p-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-all"><Send size={16} /></button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CASE STUDY --- */}
      <section id="case-study" className="py-20 px-6 max-w-5xl mx-auto border-t border-white/5">
        <h2 className="text-zinc-500 uppercase tracking-widest text-xs mb-12">04. Case Study</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="aspect-video bg-zinc-900 rounded-3xl border border-white/5 p-10 flex flex-col justify-end hover:border-white/20 transition-all group">
              <span className="text-blue-500 font-mono text-xs mb-2">GROWTH PRODUCT</span>
              <h4 className="text-3xl font-bold mb-4 group-hover:translate-x-2 transition-transform">Optimization of the Checkout Flow</h4>
              <ArrowUpRight className="text-zinc-600 group-hover:text-white" />
           </div>
           <div className="aspect-video bg-zinc-800 rounded-3xl border border-white/5 p-10 flex flex-col justify-end">
              <span className="text-zinc-500 font-mono text-xs mb-2">B2B SAAS</span>
              <h4 className="text-3xl font-bold">Internal Workflow Tooling</h4>
           </div>
        </div>
      </section>

      {/* --- SECTION 5: CONTACT --- */}
      <section id="contact" className="py-40 text-center border-t border-white/5">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-10">Get in touch.</h2>
        <a href="mailto:hello@example.com" className="text-2xl text-zinc-500 hover:text-white transition-colors underline underline-offset-8">hello@example.com</a>
      </nav>

      <footer className="py-10 text-center text-[10px] text-zinc-600 uppercase tracking-[0.5em]">
        © 2024 [YOUR NAME] • BUILT WITH NEXT.JS
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
      `}</style>
    </div>
  );
}