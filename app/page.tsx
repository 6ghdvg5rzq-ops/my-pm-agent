'use client';

import { useChat } from 'ai/react';
import { Send, User, Bot, Sparkles, Mail, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PMPortfolio() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white text-zinc-900 font-sans">
      <header className="border-b px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-10">
        <div>
          <h1 className="font-bold text-xl tracking-tight">[YOUR NAME]</h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">PM Agent</p>
        </div>
        <div className="flex gap-4">
           <Mail size={20} className="text-zinc-400 hover:text-blue-600 cursor-pointer" />
            <ExternalLink size={20} className="text-zinc-400 hover:text-black cursor-pointer" />
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="py-20 text-center animate-in fade-in duration-1000">
            <div className="bg-zinc-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot size={32} className="text-zinc-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">How can I help you today?</h2>
            <p className="text-zinc-500 mb-8 px-10">Ask me about my product experience, philosophy, or specific project outcomes.</p>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white shrink-0"><Sparkles size={14} /></div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-800'}`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="relative group">
          <input
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-6 pr-14 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={input}
            placeholder="Ask me anything..."
            onChange={handleInputChange}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-900 text-white p-2 rounded-xl hover:bg-zinc-800 transition-colors">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}