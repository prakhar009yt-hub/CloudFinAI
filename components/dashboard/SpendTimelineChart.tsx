'use client';

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { infrastructureData } from '@/lib/mock-data';

export function SpendTimelineChart() {
  const data = infrastructureData.dailyCostHistory;

  return (
    <div className="bg-[#090909] rounded-sm border border-white/5 p-6 h-full flex flex-col">
      <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white mb-4">30-Day Cost Trend</h3>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }}
              tickMargin={10}
              minTickGap={30}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }}
              tickFormatter={(value) => `$${value}`}
              width={60}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}
              itemStyle={{ fontSize: '12px', color: '#fff' }}
              labelStyle={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase' }}
            />
            <Area 
              type="monotone" 
              dataKey="Total" 
              stroke="#00FFC2" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorTotal)" 
            />
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FFC2" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#00FFC2" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
