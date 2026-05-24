import { infrastructureData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, DollarSign, Server, AlertTriangle, Info } from 'lucide-react';

export function MetricsCards() {
  const { currentMonthSpend, projectedMonthSpend, lastMonthSpend, resources } = infrastructureData;
  const isOverBudget = projectedMonthSpend > infrastructureData.totalSpendLimit;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 custom-metrics-cards">
      {/* Current Spend Card */}
      <div className="bg-[#111] rounded-sm border border-white/5 border-t-[#00FFC2]/30 relative">
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
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-[#111] border border-white/10 text-[10px] text-white/70 rounded shadow-xl z-50 whitespace-normal normal-case tracking-normal">
                      Total cloud infrastructure costs accumulated so far in the current billing cycle.
                    </div>
                  </div>
                </dt>
                <dd>
                  <div className="text-3xl font-light text-white">${currentMonthSpend.toLocaleString()}</div>
                  {currentMonthSpend > infrastructureData.anomalyThreshold && (
                    <div className="mt-1 flex items-center text-xs font-semibold text-red-500 uppercase tracking-widest">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Anomaly Detected
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white/5 px-5 py-3 border-t border-white/5 shrink-0 flex items-center justify-between rounded-b-sm">
          <div className="text-sm">
            <span className={currentMonthSpend > lastMonthSpend ? "text-red-400" : "text-[#00FFC2]"}>
              {currentMonthSpend > lastMonthSpend ? <TrendingUp className="inline h-4 w-4 mr-1" /> : <TrendingDown className="inline h-4 w-4 mr-1" />}
              {Math.abs(Math.round(((currentMonthSpend - lastMonthSpend) / lastMonthSpend) * 100))}%
            </span>
            <span className="text-white/40 ml-2 text-[10px] uppercase tracking-widest">vs last month</span>
          </div>
        </div>
      </div>

      {/* Projected Spend Card */}
      <div className="bg-[#111] rounded-sm border border-white/5 relative">
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
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-[#111] border border-white/10 text-[10px] text-white/70 rounded shadow-xl z-50 whitespace-normal normal-case tracking-normal">
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
        <div className="bg-white/5 px-5 py-3 border-t border-white/5 flex items-center shrink-0 rounded-b-sm">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Budget: ${infrastructureData.totalSpendLimit.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Active Instances Card */}
      <div className="bg-[#111] rounded-sm border border-white/5 relative">
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
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-[#111] border border-white/10 text-[10px] text-white/70 rounded shadow-xl z-50 whitespace-normal normal-case tracking-normal">
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
        <div className="bg-white/5 px-5 py-3 border-t border-white/5 flex items-center shrink-0 rounded-b-sm">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
             across 3 environments
          </div>
        </div>
      </div>

      {/* Potential Waste Card */}
      <div className="bg-[#111] rounded-sm border border-white/5 relative">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="flex items-center text-[10px] uppercase tracking-widest text-white/40">
                  <span className="truncate">Idle Resources</span>
                  <div className="relative flex items-center group ml-1.5 overflow-visible">
                    <Info className="h-3 w-3 text-white/30 cursor-help shrink-0" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-[#111] border border-white/10 text-[10px] text-white/70 rounded shadow-xl z-50 whitespace-normal normal-case tracking-normal">
                      Resources with &lt; 5% utilization over 14 days, unattached volumes, and inactive databases.
                    </div>
                  </div>
                </dt>
                <dd>
                  <div className="text-3xl font-light text-[#00FFC2]">
                    {resources.idleInstances + resources.idleDatabases + resources.unattachedVolumes}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-[#00FFC2]/10 px-5 py-3 border-t border-[#00FFC2]/20 flex items-center shrink-0 rounded-b-sm">
          <div className="text-[10px] uppercase tracking-widest text-[#00FFC2] font-medium">
            Review recommended optimizations
          </div>
        </div>
      </div>
    </div>
  );
}
