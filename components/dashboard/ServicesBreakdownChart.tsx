'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { infrastructureData } from '@/lib/mock-data';

const COLORS = ['#00FFC2', '#00DFB2', '#00BFA2', '#009F92', '#007F72'];

export function ServicesBreakdownChart() {
  const data = infrastructureData.servicesBreakdown;

  return (
    <div className="bg-[#090909] rounded-sm border border-white/5 p-6 h-full flex flex-col">
      <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white mb-4">Cost by Service</h3>
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
              {data.map((entry, index) => (
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
