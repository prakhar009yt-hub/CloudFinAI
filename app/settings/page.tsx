import { Settings, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Agent Settings</h1>
        <p className="mt-1 text-sm text-white/40">
          Configure autonomous thresholds, connected accounts, and alert priorities.
        </p>

        <div className="mt-8 bg-[#090909] border border-white/5 rounded-sm p-8 text-center flex flex-col items-center">
          <Settings className="h-12 w-12 text-[#00FFC2] mb-4 opacity-80" />
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white">Configuration</h3>
          <p className="mt-2 text-sm text-white/40 max-w-sm mx-auto">
            Agent requires admin elevation to modify global execution parameters.
          </p>
          <button className="mt-6 px-4 py-2 border border-white/10 text-[10px] uppercase font-bold text-white/60 rounded-sm hover:text-white transition-colors flex items-center">
            <Shield className="h-3 w-3 mr-2" /> Request Elevation
          </button>
        </div>
      </div>
    </div>
  );
}
