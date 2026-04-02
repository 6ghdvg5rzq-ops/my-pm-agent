'use client';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Sparkles, Mail, Linkedin, ArrowUpRight, Github, 
  MessageSquare, User, ExternalLink, CheckCircle2, ArrowRight
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// --- 1. DATA OBJECT: ALL AGENT DETAILS & DYNAMIC WEIGHTS ---
const AGENT_DATA = {
  1: {
    title: "Initiation",
    role: "Captures and validates all project requirements before any planning begins. Forces discovery of hidden assumptions.",
    evidence: "9 docs • 6 assumptions challenged",
    outputs: ["Project Charter", "Stakeholder Register", "Requirements Doc", "Scope Statement", "Risk Register"],
    weights: { func: 35, perf: 15, sec: 25, usab: 10, rel: 15 },
    color: "bg-sky-500", text: "text-sky-400"
  },
  2: {
    title: "Planning",
    role: "Decomposes scope into executable waves with dependency mapping. Produces full PMI-compliant planning artifacts.",
    evidence: "6 docs • 4 waves",
    outputs: ["WBS", "Gantt Chart", "Wave Plan", "Resource Plan", "Communication Plan"],
    weights: { func: 20, perf: 30, sec: 15, usab: 20, rel: 15 },
    color: "bg-emerald-500", text: "text-emerald-400"
  },
  3: {
    title: "Execution",
    role: "Executes tasks wave by wave with evidence capture. Feeds into Monitoring agent in real time.",
    evidence: "17/18 tasks done",
    outputs: ["Task Completion Reports", "Wave Status Updates", "Issue Log", "Change Requests"],
    weights: { func: 40, perf: 20, sec: 10, usab: 15, rel: 15 },
    color: "bg-blue-500", text: "text-blue-400"
  },
  4: {
    title: "Monitoring",
    role: "Tracks schedule and cost performance using Earned Value Management. Triggers remediation loops when thresholds breach.",
    evidence: "SPI 0.93 • CPI 1.04",
    outputs: ["KPI Dashboard", "EV Analysis", "Variance Reports", "Forecast to Complete"],
    weights: { func: 15, perf: 25, sec: 35, usab: 10, rel: 15 },
    color: "bg-orange-500", text: "text-orange-400"
  },
  5: {
    title: "Validation",
    role: "Verifies what MUST be true, not just what was done. Can trigger a FAIL → Execution remediation loop.",
    evidence: "Grade A (90.7%)",
    outputs: ["Quality Scorecard", "Goal-Backward Report", "FAIL/PASS Decision"],
    weights: { func: 20, perf: 15, sec: 20, usab: 35, rel: 10 },
    color: "bg-purple-500", text: "text-purple-400"
  },
  6: {
    title: "Closing",
    role: "Captures final metrics, lessons learned, and satisfaction scores. Archives everything for future agent context.",
    evidence: "9.3/10 satisfaction",
    outputs: ["Lessons Learned", "Final Report", "Satisfaction Score", "Knowledge Base Update"],
    weights: { func: 10, perf: 15, sec: 15, usab: 20, rel: 40 },
    color: "bg-green-500", text: "text-green-400"
  }
};

export default function PMPortfolio() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();
  const [selectedAgent, setSelectedAgent] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const suggestions = [
    { label: "Product Philosophy", prompt: "What is your philosophy on building products?" },
    { label: "Technical Roadmap", prompt: "Tell me about the tech stack for your Agent Chain." },
  ];

  return (
    <div className="bg-[#030712] text-zinc-100 font-sans selection:bg-blue-500/30 min-h-screen">
      
      {/* TABS NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tighter text-white uppercase italic">[YOUR NAME]</div>
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Experience', 'PM Agent Chain', 'Case Study', 'Contact'].map((tab) => (
              <button key={tab} onClick={() => scrollTo(tab.toLowerCase().replace(/\s+/g, '-'))} className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
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

      {/* SECTION 1: ABOUT */}
      <section id="about" className="pt-48 pb-32 px-6 max-w-5xl mx-auto text-center md:text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-12 italic">01. About</h2>
          <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12 italic text-white">
            I craft digital products <br/>
            <span className="text-zinc-800">with intent and precision.</span>
          </h3>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl font-light italic">Senior Product Manager bridging human needs and technical possibility.</p>
        </motion.div>
      </section>

      {/* SECTION 2: EXPERIENCE */}
      <section id="experience" className="py-32 px-6 max-w-5xl mx-auto border-t border-white/5">
        <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-16 italic">02. Experience</h2>
        <div className="space-y-24">
          <div className="group border-l border-white/10 pl-8 hover:border-blue-500 transition-colors">
            <p className="text-zinc-600 text-sm mb-4 font-mono">2022 — PRESENT</p>
            <h4 className="text-3xl font-bold text-white tracking-tight italic">Senior Product Manager</h4>
            <p className="text-zinc-500 text-lg mb-8 uppercase text-xs font-bold tracking-widest">[Company Name]</p>
            <p className="text-zinc-400 leading-relaxed max-w-2xl font-light italic">Directed strategy for AI-driven portfolio tools, leading to 22% growth in efficiency.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PM AGENT CHAIN (DASHBOARD) */}
      <section id="pm-agent-chain" className="py-32 border-y border-white/5 bg-[#040914]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Hero Project</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6 italic">PM Agent Chain</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed font-light italic">6 autonomous agents covering the full PMI lifecycle — connected by validated JSON handoffs.</p>
          </div>
          
          {/* Architecture Buttons (1-6) */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 mb-12">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <React.Fragment key={num}>
                <button 
                  onClick={() => setSelectedAgent(num)}
                  className={`flex-1 min-w-[140px] p-5 rounded-2xl border text-left transition-all duration-300 ${selectedAgent === num ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-[#081121] border-white/5 hover:border-white/10'}`}
                >
                  <div className={`w-6 h-6 rounded-full mb-4 flex items-center justify-center text-[10px] font-bold text-white ${AGENT_DATA[num].color}`}>{num}</div>
                  <h4 className="text-[11px] font-bold text-white mb-1 uppercase tracking-tight">{AGENT_DATA[num].title}</h4>
                  <p className="text-[9px] text-zinc-600 font-mono leading-tight">{AGENT_DATA[num].evidence.split('•')[0]}</p>
                </button>
                {num < 6 && <ArrowRight size={14} className="text-zinc-800 hidden lg:block" />}
              </React.Fragment>
            ))}
          </div>

          {/* Remediation Loop Label */}
          <div className="flex justify-end mb-12">
            <div className="bg-red-500/5 border border-red-500/20 px-4 py-1.5 rounded-full flex items-center gap-2 text-[9px] font-bold text-red-400 uppercase tracking-widest italic">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Agent 5 FAIL → Agent 3 remediation loop
            </div>
          </div>

          {/* DYNAMIC DETAIL BOX */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedAgent} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-left mb-8 shadow-2xl"
            >
              <div className="md:col-span-2">
                <h4 className={`text-4xl font-bold mb-6 italic ${AGENT_DATA[selectedAgent].text}`}>Agent {selectedAgent}: {AGENT_DATA[selectedAgent].title}</h4>
                <p className="text-zinc-300 text-lg leading-relaxed mb-8 font-light italic">{AGENT_DATA[selectedAgent].role}</p>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Evidence: {AGENT_DATA[selectedAgent].evidence}</p>
              </div>
              <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
                <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-6 italic text-center">Outputs</p>
                <ul className="space-y-4">
                  {AGENT_DATA[selectedAgent].outputs.map(out => (
                    <li key={out} className="flex items-center gap-3 text-xs text-zinc-300 italic"><CheckCircle2 size={14} className="text-blue-500" /> {out}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* --- DYNAMIC QUALITY SCORING WEIGHTS (The requested fix) --- */}
          <div className="max-w-6xl mx-auto bg-[#0a0f1a] border border-white/5 p-10 rounded-[2.5rem] mb-32">
             <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-600 mb-6 tracking-[0.2em] italic">
                <span>Quality Scoring Weights</span>
             </div>
             <div className="h-3 rounded-full flex overflow-hidden border border-white/10 mb-10">
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent].weights.func}%` }} className="bg-sky-500 border-r border-black/20" />
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent].weights.perf}%` }} className="bg-emerald-500 border-r border-black/20" />
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent].weights.sec}%` }} className="bg-orange-500 border-r border-black/20" />
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent].weights.usab}%` }} className="bg-purple-500 border-r border-black/20" />
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent].weights.rel}%` }} className="bg-teal-500" />
             </div>
             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  {c: 'bg-sky-500', t: 'Functionality', v: AGENT_DATA[selectedAgent].weights.func},
                  {c: 'bg-emerald-500', t: 'Performance', v: AGENT_DATA[selectedAgent].weights.perf},
                  {c: 'bg-orange-500', t: 'Security', v: AGENT_DATA[selectedAgent].weights.sec},
                  {c: 'bg-purple-500', t: 'Usability', v: AGENT_DATA[selectedAgent].weights.usab},
                  {c: 'bg-teal-500', t: 'Reliability', v: AGENT_DATA[selectedAgent].weights.rel}
                ].map(item => (
                  <div key={item.t} className="flex items-center gap-3">
                    <div className={`px-2 py-0.5 rounded text-[10px] font-black text-white ${item.c}`}>{item.v}%</div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter italic">{item.t}</span>
                  </div>
                ))}
             </div>
             <p className="mt-12 text-center text-[10px] font-mono text-zinc-700 tracking-widest italic">v2.0 — Co-pilot layer on all 6 agents. Schema v1.3.0.</p>
          </div>

          {/* CHATBOT INTEGRATED */}
          <div className="max-w-3xl mx-auto border border-white/10 rounded-[2.5rem] bg-black h-[550px] flex flex-col overflow-hidden shadow-2xl mb-40">
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar" ref={scrollRef}>
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10 text-center">
                    <p className="text-zinc-600 text-xs italic uppercase tracking-[0.3em]">Technical Deep Dive Agent Active</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {suggestions.map((item) => (
                        <button key={item.label} onClick={() => setInput(item.prompt)} className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] text-[11px] text-zinc-400 transition-all">
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-8">
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role !== 'user' && <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 shadow-lg"><Sparkles size={16} /></div>}
                    <div className={`max-w-[80%] rounded-[1.25rem] px-6 py-4 text-sm leading-relaxed ${m.role === 'user' ? 'bg-white text-black font-medium' : 'bg-zinc-900 border border-white/10 text-zinc-300 shadow-xl'}`}>{m.content}</div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6 bg-zinc-950 border-t border-white/5 relative">
              <input className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-5 pl-7 pr-16 outline-none focus:border-blue-500/50 transition-all text-sm italic" value={input} placeholder="Ask a technical question about the chain..." onChange={handleInputChange} />
              <button type="submit" disabled={!input} className="absolute right-9 top-1/2 -translate-y-1/2 p-2.5 bg-white text-black rounded-xl hover:scale-105 active:scale-95 transition-all"><Send size={20} /></button>
            </form>
          </div>

          {/* JSON PREVIEWS */}
          <div className="bg-[#0b121f] rounded-[2rem] border border-white/5 overflow-hidden shadow-3xl max-w-5xl mx-auto mb-20 animate-in fade-in duration-1000">
             <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/5">
                <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/40" /><div className="w-3 h-3 rounded-full bg-yellow-500/40" /><div className="w-3 h-3 rounded-full bg-green-500/40" /></div>
                <span className="text-[11px] font-mono text-zinc-500 ml-6 italic">handoff-schema-v1.3.0.json</span>
             </div>
             <pre className="p-10 text-[14px] font-mono leading-relaxed overflow-x-auto text-blue-300">
{`{
  "source_agent": "planning-agent",
  "status": "complete",
  "verification_evidence": {
    "metrics": { "documents": 6, "covered": 100 }
  },
  "overall_goal_achieved": true
}`}
             </pre>
          </div>
        </div>
      </section>

      {/* SECTION 4: CASE STUDY */}
      <section id="case-study" className="py-32 px-6 max-w-6xl mx-auto">
        <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-16 italic font-bold">04. Case Study</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="aspect-[4/5] bg-zinc-900 rounded-[3rem] border border-white/5 p-16 flex flex-col justify-end hover:border-white/20 transition-all group relative overflow-hidden cursor-pointer">
              <span className="text-blue-500 font-mono text-[11px] tracking-widest uppercase mb-6 font-bold italic">Fintech</span>
              <h4 className="text-5xl font-bold mb-6 leading-tight text-white italic">Personal <br/>Finance AI.</h4>
              <p className="text-zinc-500 text-lg italic leading-relaxed">Reduced churn by 14% through automated UX research loops.</p>
           </div>
           <div className="aspect-[4/5] bg-zinc-950 rounded-[3rem] border border-white/5 p-16 flex flex-col justify-end hover:border-white/20 transition-all group cursor-pointer">
              <span className="text-zinc-600 font-mono text-[11px] tracking-widest uppercase mb-6 font-bold italic">Internal Tools</span>
              <h4 className="text-5xl font-bold mb-6 leading-tight text-white italic">AI-Driven <br/>Roadmaps.</h4>
              <p className="text-zinc-500 text-lg italic leading-relaxed">Automated stakeholder prioritization using custom LLM agents.</p>
           </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT */}
      <section id="contact" className="py-60 text-center border-t border-white/5">
        <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-16 bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent italic">Get in touch.</h2>
        <a href="mailto:hello@example.com" className="text-2xl md:text-5xl text-zinc-500 hover:text-white transition-all italic border-b-2 border-zinc-800 hover:border-white pb-4 font-light">hello@example.com</a>
      </section>

      <footer className="py-20 text-center text-[10px] text-zinc-800 uppercase tracking-[0.6em] font-black italic">
        © 2024 [YOUR NAME] • PRODUCT ARCHITECTURE & DESIGN
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}