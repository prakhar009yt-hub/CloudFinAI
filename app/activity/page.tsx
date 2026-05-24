'use client';

import { Activity, Bot } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

export default function ActivityPage() {
  const { addToast } = useToast();
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Agent Activity Log</h1>
        <p className="mt-1 text-sm text-white/40">
          Real-time log of optimizations and infrastructure changes executed by the AI.
        </p>

        <div className="mt-8 bg-[#090909] border border-white/5 rounded-sm p-8 text-center flex flex-col items-center">
          <Bot className="h-12 w-12 text-[#00FFC2] mb-4 opacity-80" />
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white">Audit Log</h3>
          <p className="mt-2 text-sm text-white/40 max-w-sm mx-auto">
            No recent autonomous actions have been executed in the past 24 hours.
          </p>
          <button 
            onClick={() => addToast('Fetching comprehensive logs...')}
            className="mt-6 px-4 py-2 bg-[#00FFC2]/10 border border-[#00FFC2]/20 text-[10px] uppercase font-bold text-[#00FFC2] rounded-sm hover:bg-[#00FFC2]/20 transition-colors flex items-center"
          >
            <Activity className="h-3 w-3 mr-2" /> View Detailed Logs
          </button>
        </div>
      </div>
    </div>
  );
}
