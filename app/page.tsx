'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Sparkles, Mail, Linkedin, ArrowUpRight, Github, 
  MessageSquare, User, ExternalLink, CheckCircle2, ArrowRight,
  Globe, Command, GraduationCap, Crosshair, Building2, Terminal
} from 'lucide-react';

// --- DATA STRUCTURES ---

const STATS = [
  { label: "Years Experience", value: "15+" },
  { label: "AI Agents", value: "6" },
  { label: "Files", value: "104" },
  { label: "Quality Grade", value: "A" },
  { label: "Framework Version", value: "2.8" },
];

const ABOUT_GRID = [
  { icon: <Building2 size={20}/>, title: "COMPANIES", items: "Novidea • Acronis • Bolttech • Personetics" },
  { icon: <Globe size={20}/>, title: "REGIONS", items: "Israel • US • EMEA — distributed teams" },
  { icon: <Command size={20}/>, title: "TOOLS", items: "Jira • Confluence • Salesforce • AWS • Azure" },
  { icon: <GraduationCap size={20}/>, title: "EDUCATION", items: "B.Sc. Computer Science & Mathematics" },
  { icon: <Crosshair size={20}/>, title: "MILITARY", items: "IDF — Head of Radar & Anti-Aircraft Control" },
];

const AGENT_DATA = {
  1: { title: "Initiation", role: "Captures and validates project requirements. Forces discovery of hidden assumptions.", evidence: "9 docs • 6 assumptions", outputs: ["Project Charter", "Stakeholder Register", "Risk Register"], weights: { func: 35, perf: 15, sec: 25, usab: 10, rel: 15 }, color: "bg-sky-500" },
  2: { title: "Planning", role: "Decomposes scope into executable waves with dependency mapping.", evidence: "6 docs • 4 waves", outputs: ["WBS", "Gantt Chart", "Wave Plan"], weights: { func: 20, perf: 30, sec: 15, usab: 20, rel: 15 }, color: "bg-emerald-500" },
  3: { title: "Execution", role: "Executes tasks wave by wave with evidence capture in real time.", evidence: "17/18 tasks done", outputs: ["Completion Reports", "Issue Log"], weights: { func: 40, perf: 20, sec: 10, usab: 15, rel: 15 }, color: "bg-blue-500" },
  4: { title: "Monitoring", role: "Tracks schedule and cost performance using EVM. Triggers remediation loops.", evidence: "SPI 0.93 • CPI 1.04", outputs: ["KPI Dashboard", "Variance Reports"], weights: { func: 15, perf: 25, sec: 35, usab: 10, rel: 15 }, color: "bg-orange-500" },
  5: { title: "Validation", role: "Verifies what MUST be true. Can trigger FAIL → Execution loops.", evidence: "Grade A (90.7%)", outputs: ["Quality Scorecard", "QA Report"], weights: { func: 20, perf: 15, sec: 20, usab: 35, rel: 10 }, color: "bg-purple-500" },
  6: { title: "Closing", role: "Captures final metrics and lessons learned. Archives for future context.", evidence: "9.3/10 satisfaction", outputs: ["Final Report", "Knowledge Base"], weights: { func: 10, perf: 15, sec: 15, usab: 20, rel: 40 }, color: "bg-green-500" }
};

export default function Portfolio() {
  const [selectedAgent, setSelectedAgent] = useState(1);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#040911] text-zinc-100 font-sans selection:bg-blue-500/30 min-h-screen">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#040911]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-blue-500 tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>GK</div>
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Experience', 'PM Agent Chain', 'Case Study', 'Contact'].map((tab) => (
              <button key={tab} onClick={() => scrollTo(tab.toLowerCase().replace(/\s+/g, '-'))} className="text-[11px] font-medium text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">{tab}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Available for new projects
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">Guy Kushnir</h1>
          <p className="text-blue-400 font-medium mb-8 text-lg uppercase tracking-widest">Senior Product Manager | AI Builder</p>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-12 font-light">15+ years leading enterprise projects across FinTech, InsurTech, and Cybersecurity. Now building AI systems that automate what PMs do manually.</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => scrollTo('pm-agent-chain')} className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-200 transition-all">View PM Agent Chain +</button>
            <button onClick={() => scrollTo('contact')} className="border border-white/10 px-8 py-3 rounded-full font-bold text-sm hover:bg-white/5 transition-all">Get in Touch —</button>
          </div>
        </motion.div>
      </section>

      {/* STATS ROW */}
      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">About</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-8 text-white italic">I'm a project manager who builds AI systems.</h3>
            <p className="text-zinc-400 text-lg leading-relaxed font-light italic mb-8">For the past 15 years, I've led complex enterprise projects... Now my latest project — PM Agent Chain — is where everything converges.</p>
            <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl flex items-center gap-4 text-xs font-mono text-blue-400 italic">
               <Terminal size={16}/> Latest: PM Agent Chain — Grade A (90.7%)
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {ABOUT_GRID.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-zinc-500 mt-1">{item.icon}</div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{item.title}</p>
                  <p className="text-sm text-zinc-300 font-medium">{item.items}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PM AGENT CHAIN (Interactive Dashboard) */}
      <section id="pm-agent-chain" className="py-32 border-y border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Hero Project</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">PM Agent Chain</h3>
            <p className="text-blue-400 font-medium tracking-widest text-xs uppercase italic">AI-Powered Project Lifecycle Management</p>
          </div>

          <h4 className="text-center text-white text-xs font-bold uppercase tracking-[0.2em] mb-12">Agent Architecture</h4>
          
          {/* 1-6 Steps */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 mb-16 relative">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <React.Fragment key={num}>
                <button 
                  onClick={() => setSelectedAgent(num)}
                  className={`flex-1 min-w-[140px] p-5 rounded-2xl border text-left transition-all duration-300 ${selectedAgent === num ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-[#081121] border-white/5 hover:border-white/10'}`}
                >
                  <div className={`w-6 h-6 rounded-full mb-4 flex items-center justify-center text-[10px] font-bold text-white ${AGENT_DATA[num as keyof typeof AGENT_DATA].color}`}>{num}</div>
                  <h4 className="text-[11px] font-bold text-white mb-1 uppercase tracking-tight">{AGENT_DATA[num as keyof typeof AGENT_DATA].title}</h4>
                  <p className="text-[9px] text-zinc-600 font-mono">{AGENT_DATA[num as keyof typeof AGENT_DATA].evidence.split('•')[0]}</p>
                </button>
                {num < 6 && <ArrowRight size={14} className="text-zinc-800 hidden lg:block" />}
              </React.Fragment>
            ))}
          </div>

          {/* Alert Loop */}
          <div className="flex justify-end mb-8">
              <div className="bg-red-500/5 border border-red-500/20 px-4 py-1.5 rounded-full flex items-center gap-2 text-[9px] font-bold text-red-400 uppercase tracking-widest italic">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Agent 5 FAIL → Agent 3 remediation loop
              </div>
          </div>

          {/* Dynamic Details Box */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedAgent} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 text-left mb-8 shadow-2xl"
            >
              <div className="md:col-span-2">
                <h4 className="text-4xl font-bold mb-6 text-white italic">Agent {selectedAgent}: {AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].title}</h4>
                <p className="text-zinc-300 text-lg leading-relaxed mb-8 font-light italic">{AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].role}</p>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Evidence: {AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].evidence}</p>
              </div>
              <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5">
                <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-6 italic text-center">Outputs</p>
                <ul className="space-y-4">
                  {AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].outputs.map(out => (
                    <li key={out} className="flex items-center gap-3 text-xs text-zinc-300 italic">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" /> {out}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* DYNAMIC SCORING BAR */}
          <div className="max-w-6xl mx-auto bg-black/40 border border-white/5 p-10 rounded-[2.5rem] mb-32 shadow-2xl">
             <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-600 mb-6 tracking-[0.2em] italic">
                <span>Quality Scoring Weights</span>
             </div>
             <div className="h-3 rounded-full flex overflow-hidden border border-white/10 mb-10">
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.func}%` }} className="bg-sky-500 border-r border-black/20" />
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.perf}%` }} className="bg-emerald-500 border-r border-black/20" />
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.sec}%` }} className="bg-orange-500 border-r border-black/20" />
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.usab}%` }} className="bg-purple-500 border-r border-black/20" />
                <motion.div animate={{ width: `${AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.rel}%` }} className="bg-teal-500" />
             </div>
             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  {c: 'bg-sky-500', t: 'Functionality', v: AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.func},
                  {c: 'bg-emerald-500', t: 'Performance', v: AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.perf},
                  {c: 'bg-orange-500', t: 'Security', v: AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.sec},
                  {c: 'bg-purple-500', t: 'Usability', v: AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.usab},
                  {c: 'bg-teal-500', t: 'Reliability', v: AGENT_DATA[selectedAgent as keyof typeof AGENT_DATA].weights.rel}
                ].map(item => (
                  <div key={item.t} className="flex items-center gap-3">
                    <div className={`px-2 py-0.5 rounded text-[10px] font-black text-white ${item.c}`}>{item.v}%</div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter italic">{item.t}</span>
                  </div>
                ))}
             </div>
             <p className="mt-12 text-center text-[10px] font-mono text-zinc-700 tracking-widest italic">v2.0 — Co-pilot layer on all 6 agents. 104 files. Schema v1.3.0.</p>
          </div>
        </div>
      </section>

      {/* JSON SCHEMA SECTION */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h4 className="text-2xl font-bold mb-12 italic text-white tracking-tight">JSON Schema Preview</h4>
        <div className="bg-[#0b121f] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/40" /><div className="w-3 h-3 rounded-full bg-yellow-500/40" /><div className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 ml-6 italic uppercase">handoff-schema-v1.3.0.json</span>
          </div>
          <pre className="p-10 text-[14px] font-mono leading-relaxed overflow-x-auto text-blue-300">
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
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-60 text-center">
        <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-16 bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent italic">Let's talk</h2>
        <div className="flex flex-col items-center gap-8">
          <a href="mailto:guykushnir@gmail.com" className="flex items-center gap-4 text-2xl md:text-4xl text-zinc-500 hover:text-white transition-all italic underline underline-offset-8">guykushnir@gmail.com</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-all flex items-center gap-2 uppercase tracking-widest font-bold text-xs"><Linkedin size={16}/> LinkedIn.com/in/guy-kushnir-pm</a>
        </div>
      </section>

      <footer className="py-20 text-center text-[10px] text-zinc-800 uppercase tracking-[0.6em] font-black italic">© 2024 Guy Kushnir • Built with Next.js</footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}