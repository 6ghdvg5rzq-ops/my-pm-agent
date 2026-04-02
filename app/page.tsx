'use client';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Mail, Linkedin, ArrowUpRight, Github, MessageSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PMPortfolio() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const suggestions = [
    { label: "Product Philosophy", prompt: "What is your philosophy on building products?" },
    { label: "Recent Launch", prompt: "Tell me about your most successful product launch." },
    { label: "Technical Skills", prompt: "How do you work with engineering teams?" },
    { label: "Career Goals", prompt: "What are you looking for in your next PM role?" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-[#0a0a0a]/50 sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center font-bold text-lg shadow-2xl text-blue-400">
            [Y]
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tighter">[YOUR NAME]</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Agent Active</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <a href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"><Linkedin size={18} /></a>
          <a href="#" className="p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"><Github size={18} /></a>
          <button className="hidden sm:block ml-2 px-5 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all active:scale-95">
            Get in touch
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto custom-scrollbar" ref={scrollRef}>
        <div className="max-w-2xl mx-auto px-6 py-12 w-full">
          
          {/* Hero Section - Only shows when no messages */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
                    Talk to the AI version of <span className="text-zinc-500">my portfolio.</span>
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                    Ask questions about my experience, view my projects, or explore my product management frameworks in real-time.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {suggestions.map((item, i) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      onClick={() => setInput(item.prompt)}
                      className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all group text-left"
                    >
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{item.label}</span>
                      <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Messages */}
          <div className="space-y-8 pb-20">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role !== 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                    <Sparkles size={14} />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-zinc-100 text-zinc-900 font-medium' 
                    : 'bg-zinc-900/50 border border-white/5 text-zinc-300 backdrop-blur-sm'
                }`}>
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0 border border-white/5">
                    <User size={14} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Persistent Input Bar */}
      <div className="p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent sticky bottom-0">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <input
              className="w-full bg-zinc-900/80 border border-white/10 rounded-2xl py-5 pl-14 pr-16 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all shadow-2xl placeholder:text-zinc-600 text-sm"
              value={input}
              placeholder="Type a message..."
              onChange={handleInputChange}
            />
            <MessageSquare className="absolute left-6 text-zinc-600" size={18} />
            <button 
              type="submit" 
              disabled={!input}
              className="absolute right-3 p-2.5 rounded-xl bg-white text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[9px] text-center text-zinc-600 mt-4 uppercase tracking-[0.4em] font-black opacity-50">
            Next.js 15 • GPT-4o-Mini • Tailwind CSS
          </p>
        </form>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333; }
      `}</style>
    </div>
  );
}