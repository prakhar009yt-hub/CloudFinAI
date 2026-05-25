'use client';

import { Settings, Shield, Power, Activity, Clock, Zap } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import { useState } from 'react';

export default function SettingsPage() {
  const { addToast } = useToast();
  const [autoDowntime, setAutoDowntime] = useState(false);
  const [threshold, setThreshold] = useState('80');
  const [downtimeWait, setDowntimeWait] = useState('15');

  const handleSave = () => {
    addToast('Automation settings updated successfully', 'success');
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Agent Settings</h1>
        <p className="mt-1 text-sm text-white/40">
          Configure autonomous thresholds, connected accounts, and alert priorities.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
                <Power className="h-5 w-5 text-[#00FFC2]" />
                <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white">Automated Downtime Management</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-8">
                    <h4 className="text-sm font-medium text-white">Scale-to-Zero on High Cost / Low Demand</h4>
                    <p className="mt-1 text-sm text-white/40">Automatically scale down non-critical instances or bring the service down for a specified duration if monthly resource usage threshold is breached and traffic demand drops.</p>
                  </div>
                  <div className="flex items-center h-5 mt-1">
                    <button 
                      onClick={() => setAutoDowntime(!autoDowntime)}
                      className={`relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${autoDowntime ? 'bg-[#00FFC2]' : 'bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10'}`}
                      role="switch"
                      aria-checked={autoDowntime}
                    >
                      <span className="sr-only">Use setting</span>
                      <span aria-hidden="true" className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${autoDowntime ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <div className={`space-y-4 transition-all duration-300 ${autoDowntime ? 'opacity-100 max-h-96' : 'opacity-40 pointer-events-none max-h-96'}`}>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                      <Activity className="inline-block w-3 h-3 mr-1" /> Resource Usage Threshold (%)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="range" 
                        min="50" 
                        max="100" 
                        value={threshold} 
                        onChange={(e) => setThreshold(e.target.value)}
                        className="w-full accent-[#00FFC2] bg-white/5 backdrop-blur-xl shadow-2xl h-1 rounded-full outline-none appearance-none"
                      />
                      <span className="text-sm font-mono text-white/80 w-12 text-right">{threshold}%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                      <Clock className="inline-block w-3 h-3 mr-1" /> Idle Wait Before Downtime (Minutes)
                    </label>
                    <select 
                      value={downtimeWait}
                      onChange={(e) => setDowntimeWait(e.target.value)}
                      className="mt-1 block w-full bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 rounded-xl text-sm text-white py-2 px-3 focus:outline-none focus:border-[#00FFC2]/50 focus:ring-1 focus:ring-[#00FFC2]/50"
                    >
                      <option value="5">5 Minutes</option>
                      <option value="15">15 Minutes</option>
                      <option value="30">30 Minutes</option>
                      <option value="60">1 Hour</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#00FFC2]/10 border border-[#00FFC2]/20 text-[10px] uppercase font-bold text-[#00FFC2] rounded-xl hover:bg-[#00FFC2]/20 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
                <Zap className="h-5 w-5 text-[#00FFC2]" />
                <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white">Network Performance & Caching</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-8">
                    <h4 className="text-sm font-medium text-white">Global CDN Routing</h4>
                    <p className="mt-1 text-sm text-white/40">Route traffic through the closest global edge node to decrease the response time of the website and reduce overall latency for end-users.</p>
                  </div>
                  <div className="flex items-center h-5 mt-1">
                    <button 
                      onClick={() => {
                        addToast('Global CDN routing settings updated', 'success');
                      }}
                      className={`relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-[#00FFC2]`}
                      role="switch"
                      aria-checked={true}
                    >
                      <span aria-hidden="true" className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5`} />
                    </button>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-8">
                    <h4 className="text-sm font-medium text-white">Aggressive Edge Caching</h4>
                    <p className="mt-1 text-sm text-white/40">Cache static assets and API responses at the edge. This significantly improves load times but may result in slightly stale data.</p>
                  </div>
                  <div className="flex items-center h-5 mt-1">
                    <button 
                      onClick={(e) => {
                        e.currentTarget.classList.toggle('bg-[#00FFC2]');
                        e.currentTarget.classList.toggle('bg-white/5 backdrop-blur-xl shadow-2xl');
                        e.currentTarget.classList.toggle('border');
                        e.currentTarget.classList.toggle('border-white/10');
                        const span = e.currentTarget.querySelector('span:last-child') as HTMLElement;
                        if (span.classList.contains('translate-x-0')) {
                          span.classList.remove('translate-x-0');
                          span.classList.add('translate-x-5');
                          addToast('Aggressive Edge Caching enabled', 'success');
                        } else {
                          span.classList.remove('translate-x-5');
                          span.classList.add('translate-x-0');
                          addToast('Aggressive Edge Caching disabled', 'info');
                        }
                      }}
                      className={`relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10`}
                      role="switch"
                      aria-checked={false}
                    >
                      <span aria-hidden="true" className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-0`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Elevation Panel */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-2xl border-white/10 border border-white/10 rounded-xl p-6 text-center flex flex-col items-center">
              <Shield className="h-12 w-12 text-[#00FFC2] mb-4 opacity-80" />
              <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white">System Privileges</h3>
              <p className="mt-2 text-sm text-white/40 text-center">
                Agent requires admin elevation to modify global execution parameters and infrastructure bounds.
              </p>
              <button 
                onClick={() => addToast('Elevation request sent to admin team for approval.', 'info')}
                className="mt-6 px-4 py-2 border border-white/10 text-[10px] uppercase font-bold text-white/60 rounded-xl hover:text-white transition-colors flex items-center w-full justify-center"
              >
                Request Elevation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
