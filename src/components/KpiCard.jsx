import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function KpiCard({
  title,
  value,
  change,
  changeType,
  subtitle,
  icon,
  sparkline,
  sparklineColor = "#10B981"
}) {
  const points = generateSparklinePoints(sparkline, 100, 30);

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 border border-[#1E2633] shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-slate-400 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
          <div className="h-8 w-8 rounded-lg bg-[#161D29] border border-[#1E2633] flex items-center justify-center text-slate-300">
            {icon}
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight tabular-nums">
            {value}
          </h2>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1E2633]/60 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold ${
            changeType === 'positive' || changeType === 'favorable'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}>
            {changeType === 'positive' || changeType === 'favorable' ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {change}
          </span>
          <span className="text-[11px] text-slate-400 truncate max-w-[130px]">{subtitle}</span>
        </div>

        {/* Mini SVG Sparkline */}
        <div className="w-16 h-6 flex-shrink-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
            {sparkline && (
              <polyline
                fill="none"
                stroke={sparklineColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

function generateSparklinePoints(data, width, height) {
  if (!data || data.length === 0) return "";
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  return data
    .map((val, idx) => {
      const x = idx * step;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
