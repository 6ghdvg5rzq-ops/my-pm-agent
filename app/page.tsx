'use client';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Mail, Linkedin, ArrowUpRight, Github, MessageSquare, User, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PMPortfolio() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

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
    <div className="bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-blue-500/30 min-h-screen pb-20">
      
      {/* --- TABS NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tighter text-white">
             [YOUR NAME]
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Experience', 'PM Agent Chain', 'Case Study', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollTo(tab.toLowerCase().replace(/\s+/g, '-'))}
                className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <Linkedin size={18} className="text-zinc-500 hover:text-white cursor-pointer transition-colors" />
            <Mail size={18} className="text-zinc-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>

      {/* --- SECTION 1: ABOUT --- */}
      <section id="about" className="pt-48 pb-32 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-12 italic">01. About</h2>
          <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
            I craft digital products <br/>
            <span className="text-zinc-700">with intent and precision.</span>
          </h3>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl font-light">
            Senior Product Manager specialized in [Your Niche]. I build systems that bridge the gap between human needs and technical possibility.
          </p>
        </motion.div>
      </section>

      {/* --- SECTION 2: EXPERIENCE --- */}
      <section id="experience" className="py-32 px-6 max-w-5xl mx-auto border-t border-white/5">
        <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-16 italic">02. Experience</h2>
        <div className="space-y-24">
          <div className="group border-l border-white/10 pl-8 hover:border-blue-500 transition-colors">
            <p className="text-zinc-600 text-sm mb-4 font-mono">2022 — PRESENT</p>
            <h4 className="text-3xl font-bold text-white tracking-tight">Senior Product Manager</h4>
            <p className="text-zinc-500 text-lg mb-6">[Company Name]</p>
            <p className="text-zinc-400 leading-relaxed max-w-2xl">Directed the strategy for [Product], resulting in a [X%] growth in conversion. Focused on data-driven prioritization and cross-functional leadership.</p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PM AGENT CHAIN (The Chat) --- */}
      <section id="pm-agent-chain" className="py-32 border-y border-white/5 bg-zinc-900/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-16 text-center italic">03. PM Agent Chain</h2>
          
          <div className="border border-white/10 rounded-[2.5rem] bg-[#0d0d0d] h-[700px] flex flex-col overflow-hidden shadow-3xl shadow-black relative group">
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar" ref={scrollRef}>
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 py-12">
                    <div className="space-y-4 text-center">
                        <h3 className="text-4xl font-bold tracking-tighter">Talk to my agent.</h3>
                        <p className="text-zinc-500 text-sm">Ask about my roadmap strategy, metrics, or career.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {suggestions.map((item) => (
                        <button key={item.label} onClick={() => setInput(item.prompt)} className="text-left p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all text-[13px] text-zinc-400 hover:text-white group flex justify-between items-center">
                          {item.label}
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-8">
                {messages.map((m) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role !== 'user' && <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0"><Sparkles size={16} /></div>}
                    <div className={`max-w-[80%] rounded-[1.25rem] px-6 py-4 text-[15px] leading-relaxed ${m.role === 'user' ? 'bg-white text-black font-medium' : 'bg-zinc-900 border border-white/10 text-zinc-300'}`}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-[#0d0d0d]">
              <form onSubmit={handleSubmit} className="relative flex items-center max-w-2xl mx-auto">
                <input className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-5 pl-14 pr-16 outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm" value={input} placeholder="Ask a question..." onChange={handleInputChange} />
                <MessageSquare className="absolute left-6 text-zinc-600" size={18} />
                <button type="submit" disabled={!input} className="absolute right-3 p-3 bg-white text-black rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30"><Send size={18} /></button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CASE STUDY --- */}
      <section id="case-study" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-16 italic">04. Case Study</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="aspect-[4/5] bg-zinc-900 rounded-[2.5rem] border border-white/5 p-12 flex flex-col justify-end hover:border-white/20 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-12 right-12 opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={24} /></div>
              <span className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mb-4">Fintech</span>
              <h4 className="text-4xl font-bold mb-4 leading-tight">Optimizing Personal <br/>Finance Flows.</h4>
              <p className="text-zinc-500 text-sm">Reduced churn by 14% through iterative UX research and A/B testing.</p>
           </div>
           <div className="aspect-[4/5] bg-zinc-950 rounded-[2.5rem] border border-white/5 p-12 flex flex-col justify-end hover:border-white/20 transition-all group cursor-pointer">
              <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase mb-4">Internal Tools</span>
              <h4 className="text-4xl font-bold mb-4 leading-tight">AI-Driven Roadmap <br/>Prioritization.</h4>
              <p className="text-zinc-500 text-sm">Automated stakeholder feedback loops using LLMs.</p>
           </div>
        </div>
      </section>

      {/* --- SECTION 5: CONTACT --- */}
      <section id="contact" className="py-60 text-center">
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent">Get in touch.</h2>
        <a href="mailto:hello@example.com" className="text-2xl md:text-4xl text-zinc-500 hover:text-white transition-colors font-light tracking-tight border-b border-zinc-800 hover:border-white pb-2">hello@example.com</a>
      </section>

      <footer className="py-20 text-center text-[10px] text-zinc-700 uppercase tracking-[0.5em] font-bold">
        © 2024 [YOUR NAME] • BUILT FOR PRODUCT LEADERS
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
      `}</style>
    </div>
  );
}