'use client';

import { useChat } from 'ai/react';
import { Send, Sparkles, Mail, Linkedin, ArrowRight, User, Bot } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PMPortfolio() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const suggestions = [
    "What's your PM philosophy?",
    "Tell me about a product launch.",
    "How do you handle technical debt?",
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-500/30">
      {/* Premium Header */}
      <header className="border-b border-white/5 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center font-bold text-xs uppercase shadow-lg shadow-blue-500/20">
            [Y]
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">[YOUR NAME]</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">Product Manager Agent</p>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Mail size={18} /></a>
          <button className="hidden md:block bg-white text-black px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-zinc-200 transition-all active:scale-95">
            Book a Call
          </button>
        </div>
      </header>

      {/* Main Chat Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pt-10 pb-32 max-w-2xl mx-auto w-full space-y-8">
        
        {/* Hero State (Before chat starts) */}
        {messages.length === 0 && (
          <div className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Ask me anything about my product journey.
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-md">
              I built this AI to help recruiters and collaborators learn more about my experience and PM philosophy.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="flex items-center justify-between text-left text-sm border border-white/10 bg-white/5 p-4 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group active:scale-[0.98]"
                >
                  <span className="text-zinc-300 group-hover:text-white">{s}</span>
                  <ArrowRight size={14} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end animate-in slide-in-from-right-2' : 'justify-start animate-in slide-in-from-left-2'}`}>
            {m.role !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
                <Sparkles size={14} />
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white font-medium' 
                : 'bg-zinc-900 border border-white/5 text-zinc-300'
            }`}>
              {m.content}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-900 shrink-0 font-bold text-[10px]">
                ME
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative group">
          <input
            className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-5 pl-7 pr-16 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all backdrop-blur-md shadow-2xl placeholder:text-zinc-600"
            value={input}
            placeholder="Type your question..."
            onChange={handleInputChange}
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-2.5 rounded-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-20"
            disabled={!input}
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center text-zinc-700 mt-4 uppercase tracking-[0.3em] font-bold">
          Powered by GPT-4o-Mini
        </p>
      </div>
    </div>
  );
}