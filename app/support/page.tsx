'use client';

import { HelpCircle, Mail } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

export default function SupportPage() {
  const { addToast } = useToast();
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Support & Documentation</h1>
        <p className="mt-1 text-sm text-white/40">
          Get help with configuring your agent and understanding reports.
        </p>

        <div className="mt-8 bg-[#090909] border border-white/5 rounded-sm p-8 text-center flex flex-col items-center">
          <HelpCircle className="h-12 w-12 text-[#00FFC2] mb-4 opacity-80" />
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white">Expert Assistance</h3>
          <p className="mt-2 text-sm text-white/40 max-w-sm mx-auto">
            Our cloud architecture team is available 24/7 to assist with complex infrastructure queries.
          </p>
          <button 
            onClick={() => addToast('Opening support portal...', 'info')}
            className="mt-6 px-4 py-2 bg-white text-black border border-transparent text-[10px] uppercase font-bold rounded-sm hover:bg-white/80 transition-colors flex items-center"
          >
            <Mail className="h-3 w-3 mr-2" /> Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
