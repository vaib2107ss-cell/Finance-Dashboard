import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function CategoryBreakdown({ categories, currency = 'USD', formatMoney }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#11161F] border border-[#1E2633] rounded-xl p-2.5 shadow-modal text-xs font-mono">
          <p className="text-slate-200 font-semibold">{data.name}</p>
          <p className="text-emerald-400 mt-1 font-bold">
            {formatMoney ? formatMoney(data.amount, currency) : `$${data.amount}`} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const total = categories.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="relative h-48 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={categories}
              innerRadius={58}
              outerRadius={78}
              paddingAngle={4}
              dataKey="amount"
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#11161F" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono uppercase text-slate-400">Total Spend</span>
          <span className="text-sm font-bold text-white font-mono">
            {formatMoney ? formatMoney(total, currency) : `$${total.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="space-y-2.5 pt-3 border-t border-[#1E2633]/60">
        {categories.map(cat => (
          <div key={cat.name} className="group">
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                <span className="text-slate-300 font-medium">{cat.name}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-400 text-[11px]">{cat.percentage}%</span>
                <span className="text-slate-200 font-semibold">
                  {formatMoney ? formatMoney(cat.amount, currency) : `$${cat.amount}`}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#1A2332] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
