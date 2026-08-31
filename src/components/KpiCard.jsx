import React from 'react';

export default function KpiCard({
  title,
  value,
  compactValue,
  change,
  changeType = 'positive',
  subtitle,
  icon,
  sparkline = [],
  sparklineColor = '#10B981'
}) {
  const isPositiveOrFavorable = changeType === 'positive' || changeType === 'favorable';

  const generateSparklinePoints = (data, width = 100, height = 30) => {
    if (!data || data.length === 0) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);

    return data.map((val, idx) => {
      const x = idx * step;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 border border-[#1E2633] shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-slate-400 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">{title}</span>
          <div className="h-8 w-8 rounded-lg bg-[#161D29] border border-[#1E2633] flex items-center justify-center text-slate-300">
            {icon}
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight tabular-nums truncate">
            {value}
          </h2>
          {compactValue && (
            <span className="text-[11px] font-mono text-slate-400 mt-0.5">{compactValue}</span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1E2633]/60 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold ${
              isPositiveOrFavorable
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {change}
          </span>
          <span className="text-[10px] text-slate-400 truncate max-w-[130px]">{subtitle}</span>
        </div>

        <div className="w-16 h-6 flex-shrink-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
            {sparkline.length > 0 && (
              <polyline
                fill="none"
                stroke={sparklineColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={generateSparklinePoints(sparkline, 100, 30)}
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
