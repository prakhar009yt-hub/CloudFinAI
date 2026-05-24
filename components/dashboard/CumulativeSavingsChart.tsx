'use client';

import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from 'recharts';
import { infrastructureData } from '@/lib/mock-data';

export function CumulativeSavingsChart() {
  const data = infrastructureData.cumulativeSavings;

  return (
    <div className="bg-[#090909] rounded-sm border border-white/5 p-6 h-full flex flex-col">
      <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-white mb-4">6-Month Cumulative Savings</h3>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
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
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }}
              tickMargin={10}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }}
              tickFormatter={(value) => `$${value / 1000}k`}
              width={50}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }}
              tickFormatter={(value) => `$${value / 1000}k`}
              width={50}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}
              itemStyle={{ fontSize: '12px', color: '#fff' }}
              labelStyle={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase' }}
              formatter={(value: any, name: any) => [`$${value.toLocaleString()}`, String(name).charAt(0).toUpperCase() + String(name).slice(1)]}
            />
            <Legend 
              wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}
            />
            <Bar yAxisId="right" dataKey="cumulative" name="Cumulative Savings" fill="#00FFC2" radius={[2, 2, 0, 0]} barSize={20} />
            <Line yAxisId="left" type="monotone" dataKey="baseline" name="Baseline Spend" stroke="#4F46E5" strokeWidth={2} dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="actual" name="Actual Spend" stroke="#10B981" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
