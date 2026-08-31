import React from 'react';
import {
  ShieldCheck,
  Zap,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  PieChart
} from 'lucide-react';

export default function FinancialOverview({
  savingsRate,
  monthlyExpenses,
  formatINR,
  upcomingPayments,
  onTransferClick,
  onAddTxnClick
}) {
  return (
    <div className="space-y-6">
      {/* Financial Health Summary Card */}
      <div className="glass-card rounded-2xl p-5 border border-[#1E2633] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Financial Health Score</h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-bold">
            Top 5% Tier
          </span>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-emerald-400 font-mono leading-none">87</span>
              <span className="text-[9px] font-mono text-slate-400">/ 100</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">HEALTHY STATUS</h4>
              <p className="text-[11px] text-slate-400">Safe leverage & emergency cash</p>
            </div>
          </div>
          <div className="text-right font-mono">
            <span className="text-[10px] uppercase text-slate-400 block">Runway</span>
            <span className="text-xs font-bold text-emerald-400">17.6 Mo</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Savings Target Rate</span>
            <span className="font-mono text-emerald-400 font-bold">{savingsRate}% (Min: 40%)</span>
          </div>
          <div className="h-1.5 w-full bg-[#1A2332] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(savingsRate, 100)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Upcoming Payments (EMIs & Subscriptions) */}
      <div className="glass-card rounded-2xl p-5 border border-[#1E2633] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2633]/60">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Upcoming Payments & EMIs</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Next 14 Days</span>
        </div>

        <div className="space-y-2">
          {upcomingPayments?.map(pay => (
            <div key={pay.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0E131A] border border-[#1E2633]/60">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-200 truncate">{pay.name}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                  <span className="text-amber-400">Due: {pay.due}</span>
                  <span>•</span>
                  <span className="text-emerald-400">Auto-Debit</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-200">
                {formatINR(pay.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
