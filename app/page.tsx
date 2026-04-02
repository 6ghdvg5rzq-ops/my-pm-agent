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
            <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Senior Product ManageS