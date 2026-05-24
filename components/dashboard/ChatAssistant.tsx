'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Markdown from 'react-markdown';
import { infrastructureData } from '@/lib/mock-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am CloudFinAI, your cloud cost optimizer. How can I help you analyze your infrastructure today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.slice(1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          history,
          contextData: infrastructureData
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.text }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: `Error: ${error.message || 'Something went wrong.'}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-[#00FFC2] text-[#050505] p-4 rounded-full shadow-2xl hover:bg-[#00FFC2]/90 transition-transform transform hover:scale-105 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot className="w-6 h-6" />
        <span className="sr-only">Open CloudFin AI Assistant</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] bg-[#090909] border border-white/10 shadow-2xl rounded-sm flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#111] border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="bg-[#00FFC2]/10 p-2 rounded-sm text-[#00FFC2]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white tracking-tight">CloudFinAI</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Optimizer Assistant</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="flex-shrink-0 mt-1">
                      {message.role === 'user' ? (
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-white/60" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#00FFC2]/10 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-[#00FFC2]" />
                        </div>
                      )}
                    </div>
                    <div 
                      className={`text-sm p-3 rounded-sm ${
                        message.role === 'user' 
                          ? 'bg-white/10 text-white' 
                          : 'bg-[#111] border border-white/5 text-white/80'
                      }`}
                    >
                      {message.role === 'user' ? (
                        message.content
                      ) : (
                        <div className="prose prose-sm prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 max-w-none">
                          <Markdown>{message.content}</Markdown>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] flex space-x-2">
                     <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-[#00FFC2]/10 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-[#00FFC2]" />
                        </div>
                     </div>
                     <div className="text-sm p-4 rounded-sm bg-[#111] border border-white/5 text-white/80 flex space-x-1 items-center h-[44px]">
                        <div className="w-1.5 h-1.5 bg-[#00FFC2]/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-[#00FFC2]/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-[#00FFC2]/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                     </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#111] border-t border-white/5 relative z-10">
              <form onSubmit={handleSubmit} className="flex relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your infrastructure costs..."
                  className="w-full bg-[#090909] text-sm text-white placeholder-white/40 border border-white/10 rounded-sm py-3 pl-4 pr-12 focus:outline-none focus:border-[#00FFC2]/50 focus:ring-1 focus:ring-[#00FFC2]/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-[#00FFC2]/10 text-[#00FFC2] rounded-sm hover:bg-[#00FFC2]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
