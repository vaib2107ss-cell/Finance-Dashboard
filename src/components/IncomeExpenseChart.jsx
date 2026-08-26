import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function IncomeExpenseChart({ period = '7D', type = 'area', currency = 'USD', data }) {
  const chartData = data || [
    { name: 'Thu 20', income: 3200, expenses: 850 },
    { name: 'Fri 21', income: 1400, expenses: 1200 },
    { name: 'Sat 22', income: 4800, expenses: 620 },
    { name: 'Sun 23', income: 950, expenses: 450 },
    { name: 'Mon 24', income: 8200, expenses: 1400 },
    { name: 'Tue 25', income: 2800, expenses: 1840 },
    { name: 'Wed 26', income: 12500, expenses: 620 }
  ];

  const formatYAxis = (val) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#11161F] border border-[#1E2633] rounded-xl p-3 shadow-modal text-xs font-mono">
          <p className="text-slate-300 font-semibold mb-1.5">{label}</p>
          <div className="space-y-1">
            <p className="text-emerald-400 flex items-center justify-between gap-4">
              <span>Inflow:</span>
              <span className="font-bold">${payload[0]?.value?.toLocaleString()}</span>
            </p>
            <p className="text-rose-400 flex items-center justify-between gap-4">
              <span>Outflow:</span>
              <span className="font-bold">${payload[1]?.value?.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'area' ? (
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
            <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#incomeGrad)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#F43F5E"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#expenseGrad)"
            />
          </AreaChart>
        ) : (
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
            <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#F43F5E" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
