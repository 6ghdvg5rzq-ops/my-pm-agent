'use client';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Sparkles, Mail, Linkedin, ArrowUpRight, Github, 
  MessageSquare, User, ExternalLink, CheckCircle2, ArrowRight
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AGENT_DATA = {
  1: {
    title: "Initiation",
    role: "Captures and validates all project requirements before any planning begins. Forces discovery of hidden assumptions.",
    evidence: "9 docs • 6 assumptions challenged",
    outputs: ["Project Charter", "Stakeholder Register", "Requirements Doc", "Scope Statement", "Risk Register"],
    color: "bg-sky-500", border: "border-sky-500/50", text: "text-sky-400"
  },
  2: {
    title: "Planning",
    role: "Decomposes scope into executable waves with dependency mapping. Produces full PMI-compliant planning artifacts.",
    evidence: "6 docs • 4 waves",
    outputs: ["WBS", "Gantt Chart", "Wave Plan", "Resource Plan", "Communication Plan"],
    color: "bg-emerald-500", border: "border-emerald-500/50", text: "text-emerald-400"
  },
  3: {
    title: "Execution",
    role: "Executes tasks wave by wave with evidence capture. Feeds into Monitoring agent in real time.",
    evidence: "17/18 tasks done",
    outputs: ["Task Completion Reports", "Wave Status Updates", "Issue Log", "Change Requests"],
    color: "bg-blue-500", border: "border-blue-500/50", text: "text-blue-400"
  },
  4: {
    title: "Monitoring",
    role: "Tracks schedule and cost performance using Earned Value Management. Triggers remediation loops when thresholds breach.",
    evidence: "SPI 0.93 • CPI 1.04",
    outputs: ["KPI Dashboard", "EV Analysis", "Variance Reports", "Forecast to Complete"],
    color: "bg-orange-500", border: "border-orange-500/50", text: "text-orange-400"
  },
  5: {
    title: "Validation",
    role: "Verifies what MUST be true, not just what was done. Can trigger a FAIL → Execution remediation loop.",
    evidence: "Grade A (90.7%)",
    outputs: ["Quality Scorecard", "Goal-Backward Report", "FAIL/PASS Decision"],
    color: "bg-purple-500", border: "border-purple-500/50", text: "text-purple-400"
  },
  6: {
    title: "Closing",
    role: "Captures final metrics, lessons learned, and satisfaction scores. Archives everything for future agent context.",
    evidence: "9.3/10 satisfaction",
    outputs: ["Lessons Learned", "Final Report", "Satisfaction Score", "Knowledge Base Update"],
    color: "bg-green-500", border: "border-green-500/50", text: "text-green-400"
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
    { label: "Recent Launch", prompt: "Tell me about your most successful product launch." },
    { label: "Technical Skills", prompt: "How do you work with engineering teams?" },
  ];

  return (
    <div className="bg-[#030712] text-zinc-100 font-sans selection:bg-blue-500/30 min-h-screen">
      
      {/* TABS NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tighter text-white uppercase italic">
             [YOUR NAME]
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Experience', 'PM Agent Chain', 'Case Study', 'Contact'].map((tab) => (
              <button key={tab} onClick={() => scrollTo(tab.toLowerCase().replace(/\s+/g, '-'))} className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-4"><Linkedin size={18} className="text-zinc-500 hover:text-white cursor-pointer" /><Mail size={18} className="text-zinc-500 hover:text-white cursor-pointer" /></div>
        </div>
      </nav>

      {/* ABOUT SECTION */}
      <section id="about" className="pt-48 pb-32 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-12 italic">01. About</h2>
          <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12 italic">
            I craft digital products <br/>
            <span className="text-zinc-800">with intent and precision.</span>
          </h3>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl font-light">Senior Product Manager bridging human needs and technical possibility.</p>
        </motion.div>
      </section>

      {/* --- SECTION 3: PM AGENT CHAIN DASHBOARD --- */}
      <section id="pm-agent-chain" className="py-32 border-y border-white/5 bg-[#040914]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4 font-bold text-center">Hero Project</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-16 italic text-center">PM Agent Chain</h2>
          </div>
          
          {/* 6-Agent Architecture Flow */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 mb-16 relative">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="flex flex-1 items-center gap-2">
                <button 
                  onClick={() => setSelectedAgent(num)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${selectedAgent === num ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-[#081121] border-white/5 hover:border-white/10'}`}
                >
                  <div className={`w-6 h-6 rounded-full mb-3 flex items-center justify-center text-[10px] font-bold ${AGENT_DATA[num].color}`}>{num}</div>
                  <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-tight">{AGENT_DATA[num].title}</h4>
                  <p className="text-[9px] text-zinc-600 font-mono">{AGENT_DATA[num].evidence}</p>
                </button>
                {num < 6 && <ArrowRight size={14} className="text-zinc-800 hidden lg:block" />}
              </div>
            ))}
          </div>

          {/* Dynamic Details Box */}
          <motion.div 
            key={selectedAgent} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-left mb-16"
          >
            <div className="md:col-span-2">
              <h4 className={`text-3xl font-bold mb-4 italic ${AGENT_DATA[selectedAgent].text}`}>Agent {selectedAgent}: {AGENT_DATA[selectedAgent].title}</h4>
              <p className="text-zinc-300 text-lg leading-relaxed mb-6 font-light">{AGENT_DATA[selectedAgent].role}</p>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Evidence: {AGENT_DATA[selectedAgent].evidence}</p>
            </div>
            <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-6 italic">Outputs</p>
              <ul className="space-y-4">
                {AGENT_DATA[selectedAgent].outputs.map(out => (
                  <li key={out} className="flex items-center gap-3 text-xs text-zinc-300 italic"><CheckCircle2 size={14} className="text-blue-500" /> {out}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Chatbot Interface */}
          <div className="max-w-3xl mx-auto border border-white/10 rounded-[2rem] bg-black h-[500px] flex flex-col overflow-hidden shadow-2xl mb-32">
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar" ref={scrollRef}>
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-6">
                    <p className="text-zinc-500 text-sm italic text-center">Ask my agent about the tech stack, metrics, or career roadmap.</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {suggestions.map((item) => (
                        <button key={item.label} onClick={() => setInput(item.prompt)} className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] text-[11px] text-zinc-400">
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-6">
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role !== 'user' && <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-400 shrink-0"><Sparkles size={14} /></div>}
                    <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'bg-white text-black font-medium shadow-xl' : 'bg-zinc-900 border border-white/10 text-zinc-300'}`}>{m.content}</div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 bg-zinc-950 border-t border-white/5 relative">
              <input className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 pl-6 pr-14 outline-none focus:border-blue-500/50 transition-all text-sm" value={input} placeholder="Ask about this project..." onChange={handleInputChange} />
              <button type="submit" disabled={!input} className="absolute right-7 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-lg disabled:opacity-20 transition-all"><Send size={16} /></button>
            </form>
          </div>

          {/* --- NEW: JSON PREVIEW WINDOWS --- */}
          <div className="mt-32 space-y-32 max-w-5xl mx-auto">
            {/* Window 1: Schema */}
            <div className="animate-in fade-in duration-1000">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-2xl font-bold text-white tracking-tight italic">JSON Schema Preview</h4>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">v1.3.0 • Full Traceability</div>
              </div>
              <div className="bg-[#0b121f] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 ml-4 italic">handoff-schema-v1.3.0.json</span>
                </div>
                <pre className="p-8 text-[13px] font-mono leading-relaxed overflow-x-auto text-blue-300">
{`{
  "source_agent": "planning-agent",
  "target_agent": "execution-agent",
  "payload_version": "1.3.0",
  "status": "complete",
  "verification_evidence": {
    "metrics": {
      "documents_produced": 6,
      "requirements_covered": 100
    }
  },
  "overall_goal_achieved": true
}`}
                </pre>
              </div>
            </div>

            {/* Window 2: Co-Pilot */}
            <div className="animate-in fade-in duration-1000 delay-300">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-2xl font-bold text-white tracking-tight italic">v2.0 Co-Pilot Output</h4>
              </div>
              <div className="bg-[#0b121f] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 ml-4 italic">copilot-output-v2.0.json</span>
                </div>
                <pre className="p-8 text-[13px] font-mono leading-relaxed overflow-x-auto text-emerald-300">
{`{
  "section_b_copilot_analysis": {
    "risks_identified": 6,
    "blind_spots": 6,
    "moscow_classification": {
      "must": 7, "should": 3, "could": 2, "wont": 3
    },
    "critical_flags": ["R-01: No properties owned (score 16)"]
  },
  "section_c_knowledge_log": {
    "pattern_tags": ["scope-fiction", "assumption-gap"],
    "prevention_playbook": true
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section id="case-study" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <h2 className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold mb-16 italic">04. Case Study</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="aspect-[4/5] bg-zinc-900 rounded-[2.5rem] border border-white/5 p-12 flex flex-col justify-end hover:border-white/20 transition-all group relative overflow-hidden italic cursor-pointer">
              <span className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mb-4 font-bold italic">Fintech</span>
              <h4 className="text-4xl font-bold mb-4 leading-tight text-white italic">Optimizing Personal <br/>Finance Flows.</h4>
              <p className="text-zinc-500 text-sm italic">Reduced churn by 14% through iterative UX research.</p>
           </div>
           <div className="aspect-[4/5] bg-zinc-950 rounded-[2.5rem] border border-white/5 p-12 flex flex-col justify-end hover:border-white/20 transition-all group italic cursor-pointer">
              <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase mb-4 font-bold italic">Internal Tools</span>
              <h4 className="text-4xl font-bold mb-4 leading-tight text-white italic">AI-Driven Roadmap <br/>Prioritization.</h4>
              <p className="text-zinc-500 text-sm italic">Automated stakeholder feedback loops using LLMs.</p>
           </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-60 text-center">
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent italic">Get in touch.</h2>
        <a href="mailto:hello@example.com" className="text-2xl md:text-4xl text-zinc-500 hover:text-white transition-colors font-light tracking-tight border-b border-zinc-800 hover:border-white pb-2 italic">hello@example.com</a>
      </section>

      <footer className="py-20 text-center text-[10px] text-zinc-700 uppercase tracking-[0.5em] font-bold">© 2024 [YOUR NAME] • PRODUCT LEADERSHIP</footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
      `}</style>
    </div>
  );
}