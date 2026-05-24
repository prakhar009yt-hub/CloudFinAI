'use client';

import { useState, useEffect } from 'react';
import { infrastructureData } from '@/lib/mock-data';
import { Sparkles, ArrowRight, Zap, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '@/components/ToastProvider';

type Recommendation = {
  id: string;
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  expectedSavings: number;
  category: string;
  actionRequired: string;
};

export function RecommendationFeed() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [actioned, setActioned] = useState<Set<string>>(new Set());

  const { addToast } = useToast();

  const analyze = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ infrastructureData }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze data');
      }
      
      if (data.recommendations) {
        setRecommendations(data.recommendations);
        setAnalyzed(true);
      }
    } catch (error: any) {
      console.error("Failed to analyze data", error);
      addToast(error.message || 'Failed to analyze data. Please make sure your API key is correctly configured.', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (id: string) => {
    setActioned(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="bg-[#090909] rounded-sm border border-white/5 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white flex items-center">
            <Sparkles className="w-5 h-5 text-[#00FFC2] mr-2" />
            AI Optimization Agent
          </h3>
          <p className="mt-1 text-sm text-white/40">
            Agent dynamically analyzes infrastructure patterns to find savings.
          </p>
        </div>
        {!analyzed && !loading && (
          <button
            onClick={analyze}
            className="inline-flex items-center px-4 py-2 border border-transparent text-[10px] uppercase tracking-widest font-bold rounded-sm text-black bg-white hover:bg-white/80 focus:outline-none transition-colors"
          >
            Run Analysis
          </button>
        )}
      </div>

      <div className="p-0 flex-1 overflow-y-auto bg-[#050505]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="text-sm text-white/40 animate-pulse">Agent is scanning infrastructure logs...</p>
          </div>
        ) : !analyzed ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-16 h-16 bg-[#111] text-[#00FFC2] rounded-sm flex items-center justify-center mb-4">
              <BotIcon className="w-8 h-8" />
            </div>
            <h4 className="text-base font-medium text-white">Agent Idle</h4>
            <p className="text-sm text-white/40 max-w-sm mt-1">
              Click &apos;Run Analysis&apos; to have the agent evaluate your current setup and find optimization opportunities.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            <AnimatePresence>
              {recommendations.map((rec, index) => (
                <motion.li 
                  key={rec.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 transition-colors ${actioned.has(rec.id) ? 'bg-[#00FFC2]/5' : 'bg-[#0d0d0d] hover:bg-[#111]'}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      {actioned.has(rec.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-[#00FFC2]" />
                      ) : rec.severity === 'High' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : rec.severity === 'Medium' ? (
                        <Info className="h-5 w-5 text-orange-400" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-semibold ${actioned.has(rec.id) ? 'text-white/30 line-through' : 'text-white/90'}`}>
                          {rec.title}
                        </h4>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] uppercase tracking-widest font-medium ${
                          rec.severity === 'High' ? 'bg-red-900/30 text-red-400' :
                          rec.severity === 'Medium' ? 'bg-orange-900/30 text-orange-400' :
                          'bg-blue-900/30 text-blue-400'
                        }`}>
                          {rec.severity}
                        </span>
                      </div>
                      <p className={`mt-1 text-sm ${actioned.has(rec.id) ? 'text-white/20' : 'text-white/50'}`}>
                        {rec.description}
                      </p>
                      
                      {!actioned.has(rec.id) && (
                        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                          <div className="flex text-[10px] font-mono">
                            <span className="font-semibold text-[#00FFC2] flex items-center">
                              <DollarSignIcon className="w-3 h-3 mr-0.5" />
                              {rec.expectedSavings.toLocaleString()}/mo savings
                            </span>
                            <span className="mx-2 text-white/20">|</span>
                            <span className="text-white/40 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                              {rec.actionRequired}
                            </span>
                          </div>
                          <button
                            onClick={() => handleApply(rec.id)}
                            className="inline-flex items-center px-3 py-1 border border-white/10 shadow-sm text-[9px] uppercase tracking-widest font-medium rounded-sm text-[#00FFC2] bg-[#00FFC2]/10 hover:bg-[#00FFC2]/20 focus:outline-none transition-colors"
                          >
                            <Zap className="mr-1.5 h-3 w-3 text-[#00FFC2]" />
                            Auto-Apply
                          </button>
                        </div>
                      )}
                      
                      {actioned.has(rec.id) && (
                        <p className="mt-2 text-xs font-mono text-[#00FFC2]/60 flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Agent queued action for execution
                        </p>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
            {recommendations.length > 0 && actioned.size === recommendations.length && (
              <li className="p-6 text-center text-xs font-mono text-white/50 bg-[#0d0d0d]">
                All recommendations have been applied. The agent will continue to monitor your infrastructure.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

function BotIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
