'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ToastProvider';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

const initialResourceUsageData = [
  { name: 'Compute Engine', cpu: 75, memory: 65, storage: 40 },
  { name: 'Kubernetes', cpu: 85, memory: 90, storage: 60 },
  { name: 'Cloud SQL', cpu: 40, memory: 50, storage: 80 },
  { name: 'Cloud Run', cpu: 20, memory: 25, storage: 15 },
  { name: 'Cloud Storage', cpu: 10, memory: 15, storage: 95 },
];

const COLORS = ['#00FFC2', '#8A2BE2', '#FF007F'];

export function CurrentResourcesChart() {
  const [cpuThreshold, setCpuThreshold] = useState<number>(80);
  const [memoryThreshold, setMemoryThreshold] = useState<number>(80);
  const [data, setData] = useState(initialResourceUsageData);
  const { addToast } = useToast();

  const checkAlerts = useCallback((currentData: typeof initialResourceUsageData, showSuccess: boolean) => {
    let triggered = false;
    currentData.forEach(resource => {
      if (resource.cpu > cpuThreshold) {
        addToast(`${resource.name} CPU usage (${resource.cpu}%) exceeds limit of ${cpuThreshold}%`, 'info');
        triggered = true;
      }
      if (resource.memory > memoryThreshold) {
        addToast(`${resource.name} Memory usage (${resource.memory}%) exceeds limit of ${memoryThreshold}%`, 'info');
        triggered = true;
      }
    });

    if (!triggered && showSuccess) {
      addToast(`All services are operating within limits.`, 'success');
    }
  }, [cpuThreshold, memoryThreshold, addToast]);

  useEffect(() => {
    const interval = setInterval(() => {
      let newData: typeof initialResourceUsageData = [];
      setData(prevData => {
        newData = prevData.map(item => ({
          ...item,
          cpu: Math.min(100, Math.max(0, item.cpu + Math.floor(Math.random() * 11) - 5)),
          memory: Math.min(100, Math.max(0, item.memory + Math.floor(Math.random() * 11) - 5)),
          storage: Math.min(100, Math.max(0, item.storage + Math.floor(Math.random() * 5) - 2)),
        }));
        return newData;
      });
      // Defer the alert check to avoid calling setState while another component is rendering
      setTimeout(() => {
        if (newData.length > 0) {
          checkAlerts(newData, false);
        }
      }, 0);
    }, 30000);

    return () => clearInterval(interval);
  }, [checkAlerts]);

  return (
    <div className="bg-black/30 backdrop-blur-2xl rounded-xl border border-white/10 p-6 h-full flex flex-col">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-4 space-y-4 xl:space-y-0">
        <div>
          <h2 className="text-white font-medium">Currently Used Resources</h2>
          <p className="text-sm text-white/40">Real-time capacity utilization</p>
        </div>
        
        <div className="flex flex-col sm:flex-row xl:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest whitespace-nowrap">CPU limit</span>
            <input 
              type="number" 
              value={cpuThreshold} 
              onChange={(e) => setCpuThreshold(Number(e.target.value))}
              className="w-10 bg-transparent text-sm text-white focus:outline-none text-right placeholder-white/20"
              max={100}
              min={0}
            />
            <span className="text-sm text-white/40">%</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest whitespace-nowrap">Mem limit</span>
            <input 
              type="number" 
              value={memoryThreshold} 
              onChange={(e) => setMemoryThreshold(Number(e.target.value))}
              className="w-10 bg-transparent text-sm text-white focus:outline-none text-right placeholder-white/20"
              max={100}
              min={0}
            />
            <span className="text-sm text-white/40">%</span>
          </div>
          
          <button 
            onClick={() => checkAlerts(data, true)}
            className="px-4 py-1.5 bg-[#00FFC2]/10 text-[#00FFC2] border border-[#00FFC2]/20 hover:bg-[#00FFC2]/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            Apply Alerts
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4 justify-end">
        {['cpu', 'memory', 'storage'].map((key, index) => (
          <div key={key} className="flex items-center space-x-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">
              {key}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#ffffff40" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#ffffff60' }}
              dy={10}
            />
            <YAxis 
              stroke="#ffffff40" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              cursor={{ fill: '#ffffff05' }}
              contentStyle={{ 
                backgroundColor: '#050505', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '8px', fontSize: '12px' }}
            />
            <Bar dataKey="cpu" name="CPU" fill={COLORS[0]} radius={[2, 2, 0, 0]} barSize={20}>
              {data.map((entry, index) => {
                const isOver = entry.cpu > cpuThreshold;
                return (
                  <Cell
                    key={`cell-cpu-${index}`}
                    fill={isOver ? '#ff3b3b' : COLORS[0]}
                    style={{ filter: isOver ? 'drop-shadow(0 0 8px rgba(255, 59, 59, 0.8))' : 'none' }}
                    className={isOver ? 'animate-pulse' : ''}
                  />
                );
              })}
            </Bar>
            <Bar dataKey="memory" name="Memory" fill={COLORS[1]} radius={[2, 2, 0, 0]} barSize={20}>
              {data.map((entry, index) => {
                const isOver = entry.memory > memoryThreshold;
                return (
                  <Cell
                    key={`cell-mem-${index}`}
                    fill={isOver ? '#ff3b3b' : COLORS[1]}
                    style={{ filter: isOver ? 'drop-shadow(0 0 8px rgba(255, 59, 59, 0.8))' : 'none' }}
                    className={isOver ? 'animate-pulse' : ''}
                  />
                );
              })}
            </Bar>
            <Bar dataKey="storage" name="Storage" fill={COLORS[2]} radius={[2, 2, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
