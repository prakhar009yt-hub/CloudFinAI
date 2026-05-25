'use client';

import { useState } from 'react';
import { infrastructureData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, DollarSign, Server, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

export function MetricsCards() {
  const { projectedMonthSpend, lastMonthSpend, resources } = infrastructureData;
  const isOverBudget = projectedMonthSpend > infrastructureData.totalSpendLimit;
  const [currentSpend, setCurrentSpend] = useState(infrastructureData.currentMonthSpend);
  const { addToast } = useToast();

  const handleFixAnomaly = () => {
    setCurrentSpend(infrastructureData.anomalyThreshold - 1500);
    addToast('Anomaly resolved: Terminated 24 idle instances and detached 15 unused volumes.', 'success');
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 custom-metrics-cards">
      {/* Current Spend Card */}
      <div 
        className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-xl border border-white/10 border-t-[#00FFC2]/30 relative transition-transform hover:-translate-y-1 hover:shadow-[#00FFC2]/10 cursor-pointer"
        onClick={() => currentSpend <= infrastructureData.anomalyThreshold && addToast('Loading detailed current spend report...', 'info')}
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-white/40" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="flex items-center text-[10px] uppercase tracking-widest text-white/40">
                  <span className="truncate">Current Month Spend</span>
                  <div className="relative flex items-center group ml-1.5 overflow-visible">
                    <Info className="h-3 w-3 text-white/30 cursor-help shrink-0" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 text-[10px] text-white/70 rounded shadow-xl z-50 whitespace-normal normal-case tracking-normal">
                      Total cloud infrastructure costs accumulated so far in the current billing cycle.
                    </div>
                  </div>
                </dt>
                <dd>
                  <div className="text-3xl font-light text-white">${currentSpend.toLocaleString()}</div>
                  {currentSpend > infrastructureData.anomalyThreshold ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFixAnomaly();
                      }}
                      className="mt-1 flex items-center text-xs font-semibold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors cursor-pointer text-left focus:outline-none"
                      title="Click to resolve anomaly and clean up resources"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Anomaly Detected (Click to Fix)
                    </button>
                  ) : (
                    <div className="mt-1 flex items-center text-xs font-semibold text-[#00FFC2] uppercase tracking-widest overflow-hidden">
                      <CheckCircle2 className="h-3 w-3 mr-1 shrink-0" />
                      <span className="truncate">Spend Normalized</span>
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white/5 px-5 py-3 border-t border-white/10 shrink-0 flex items-center justify-between rounded-b-xl">
          <div className="text-sm">
            <span className={currentSpend > lastMonthSpend ? "text-red-400" : "text-[#00FFC2]"}>
              {currentSpend > lastMonthSpend ? <TrendingUp className="inline h-4 w-4 mr-1" /> : <TrendingDown className="inline h-4 w-4 mr-1" />}
              {Math.abs(Math.round(((currentSpend - lastMonthSpend) / lastMonthSpend) * 100))}%

            </span>
            <span className="text-white/40 ml-2 text-[10px] uppercase tracking-widest">vs last month</span>
          </div>
        </div>
      </div>

      {/* Projected Spend Card */}
      <div 
        className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-xl border border-white/10 relative transition-transform hover:-translate-y-1 hover:border-white/20 cursor-pointer"
        onClick={() => addToast('Loading projected spend forecast models...', 'info')}
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-[#00FFC2]" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="flex items-center text-[10px] uppercase tracking-widest text-white/40">
                  <span className="truncate">Projected Spend</span>
                  <div className="relative flex items-center group ml-1.5 overflow-visible">
                    <Info className="h-3 w-3 text-white/30 cursor-help shrink-0" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 text-[10px] text-white/70 rounded shadow-xl z-50 whitespace-normal normal-case tracking-normal">
                      Estimated end-of-month cost based on current daily run rate and historical trends.
                    </div>
                  </div>
                </dt>
                <dd>
                  <div className={`text-3xl font-light ${isOverBudget ? 'text-red-400' : 'text-white'}`}>
                    ${projectedMonthSpend.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white/5 px-5 py-3 border-t border-white/10 flex items-center shrink-0 rounded-b-xl">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Budget: ${infrastructureData.totalSpendLimit.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Active Instances Card */}
      <div 
        className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-xl border border-white/10 relative transition-transform hover:-translate-y-1 hover:border-white/20 cursor-pointer"
        onClick={() => addToast('Opening global instance inventory...', 'info')}
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Server className="h-6 w-6 text-white/40" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="flex items-center text-[10px] uppercase tracking-widest text-white/40">
                  <span className="truncate">Total Instances</span>
                  <div className="relative flex items-center group ml-1.5 overflow-visible">
                    <Info className="h-3 w-3 text-white/30 cursor-help shrink-0" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 text-[10px] text-white/70 rounded shadow-xl z-50 whitespace-normal normal-case tracking-normal">
                      Active compute instances across all connected environments (Production, Staging, Dev).
                    </div>
                  </div>
                </dt>
                <dd>
                  <div className="text-3xl font-light text-white">{resources.totalInstances}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white/5 px-5 py-3 border-t border-white/10 flex items-center shrink-0 rounded-b-xl">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
             across 3 environments
          </div>
        </div>
      </div>

      {/* Potential Waste Card */}
      <div 
        className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-xl border border-white/10 relative transition-transform hover:-translate-y-1 hover:border-[#00FFC2]/50 cursor-pointer group"
        onClick={() => addToast('Navigating to optimization recommendations...', 'info')}
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-400 group-hover:text-[#00FFC2] transition-colors" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="flex items-center text-[10px] uppercase tracking-widest text-white/40">
                  <span className="truncate">Idle Resources</span>
                  <div className="relative flex items-center group ml-1.5 overflow-visible">
                    <Info className="h-3 w-3 text-white/30 cursor-help shrink-0" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 text-[10px] text-white/70 rounded shadow-xl z-50 whitespace-normal normal-case tracking-normal">
                      Resources with &lt; 5% utilization over 14 days, unattached volumes, and inactive databases.
                    </div>
                  </div>
                </dt>
                <dd>
                  <div className="text-3xl font-light text-[#00FFC2] group-hover:text-[#00FFC2] transition-colors">
                    {resources.idleInstances + resources.idleDatabases + resources.unattachedVolumes}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-[#00FFC2]/10 px-5 py-3 border-t border-[#00FFC2]/20 flex items-center shrink-0 rounded-b-xl group-hover:bg-[#00FFC2]/20 transition-colors">
          <div className="text-[10px] uppercase tracking-widest text-[#00FFC2] font-medium">
            Review recommended optimizations
          </div>
        </div>
      </div>
    </div>
  );
}
