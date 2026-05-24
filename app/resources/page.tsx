import { Server, Zap } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Active Resources</h1>
        <p className="mt-1 text-sm text-white/40">
          Infrastructure topology and current utilization metrics.
        </p>

        <div className="mt-8 bg-[#090909] border border-white/5 rounded-sm p-8 text-center flex flex-col items-center">
          <Server className="h-12 w-12 text-[#00FFC2] mb-4 opacity-80" />
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white">Resource Discovery</h3>
          <p className="mt-2 text-sm text-white/40 max-w-sm mx-auto">
            Agent is currently indexing active fleet. Full topology mapping will be available shortly.
          </p>
          <button className="mt-6 px-4 py-2 border border-white/10 text-[10px] uppercase font-bold text-[#00FFC2] rounded-sm hover:bg-[#00FFC2]/10 transition-colors flex items-center">
            <Zap className="h-3 w-3 mr-2" /> Force Resync
          </button>
        </div>
      </div>
    </div>
  );
}
