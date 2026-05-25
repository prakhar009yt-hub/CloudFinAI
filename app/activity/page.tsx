'use client';

import { Activity, Bot, ChevronDown, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

const activityLog = [
  {
    id: 1,
    time: '10 mins ago',
    action: 'Terminated Idle Instances',
    severity: 'success',
    description: 'Terminated 24 unattached instances in us-central1 (dev-env) saving $45/day.',
    icon: CheckCircle2,
    color: 'text-[#00FFC2]',
    bg: 'bg-[#00FFC2]/10',
  },
  {
    id: 2,
    time: '2 hours ago',
    action: 'Scaled Down Kubernetes Cluster',
    severity: 'info',
    description: 'Reduced minimum node count on user-api-cluster from 5 to 3 based on traffic patterns.',
    icon: RefreshCw,
    color: 'text-[#8A2BE2]',
    bg: 'bg-[#8A2BE2]/10',
  },
  {
    id: 3,
    time: '5 hours ago',
    action: 'Anomaly Detected: Database Spikes',
    severity: 'warning',
    description: 'Detected unusual read IOPS on primary-db-01. Scaled read replicas to handle load.',
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    id: 4,
    time: 'Yesterday',
    action: 'Detached Unused Volumes',
    severity: 'success',
    description: 'Removed 15 unattached persistent volumes across multiple regions saving $12/day.',
    icon: CheckCircle2,
    color: 'text-[#00FFC2]',
    bg: 'bg-[#00FFC2]/10',
  }
];

export default function ActivityPage() {
  const { addToast } = useToast();
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Agent Activity Log</h1>
            <p className="mt-1 text-sm text-white/40">
              Real-time log of optimizations and infrastructure changes executed by the AI.
            </p>
          </div>
          <button 
            onClick={() => addToast('Fetching comprehensive logs...', 'info')}
            className="hidden sm:flex px-4 py-2 bg-[#00FFC2]/10 border border-[#00FFC2]/20 text-[10px] uppercase font-bold text-[#00FFC2] rounded-xl hover:bg-[#00FFC2]/20 transition-colors items-center"
          >
            <Activity className="h-3 w-3 mr-2" /> View Detailed Logs
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {activityLog.map((log) => (
            <div key={log.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-xl flex-shrink-0 ${log.bg} ${log.color}`}>
                    <log.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{log.action}</h3>
                    <p className="mt-1 text-xs text-white/60">{log.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2 whitespace-nowrap">
                    {log.time}
                  </span>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
