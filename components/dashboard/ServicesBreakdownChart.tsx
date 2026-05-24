'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { infrastructureData } from '@/lib/mock-data';

const COLORS = ['#00FFC2', '#00DFB2', '#00BFA2', '#009F92', '#007F72'];

export function ServicesBreakdownChart() {
  const [period, setPeriod] = useState<'current' | 'previous'>('current');
  const data = period === 'current' 
    ? infrastructureData.servicesBreakdown 
    : (infrastructureData as any).previousServicesBreakdown || infrastructureData.servicesBreakdown;

  return (
    <div className="bg-[#090909] rounded-sm border border-white/5 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white">Cost by Service</h3>
        <div className="bg-[#111] border border-white/10 rounded-sm p-0.5 flex text-[10px] uppercase font-bold tracking-widest">
          <button
            onClick={() => setPeriod('current')}
            className={`px-2 py-1 rounded-sm transition-colors ${period === 'current' ? 'bg-[#00FFC2]/10 text-[#00FFC2]' : 'text-white/40 hover:text-white/80'}`}
          >
            Current
          </button>
          <button
            onClick={() => setPeriod('previous')}
            className={`px-2 py-1 rounded-sm transition-colors ${period === 'previous' ? 'bg-[#00FFC2]/10 text-[#00FFC2]' : 'text-white/40 hover:text-white/80'}`}
          >
            Previous
          </button>
        </div>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="cost"
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => [`$${(value as number).toLocaleString()}`, 'Cost']}
              contentStyle={{ backgroundColor: '#111', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              formatter={(value, entry, index) => <span className="text-[10px] uppercase font-mono text-white/60">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
