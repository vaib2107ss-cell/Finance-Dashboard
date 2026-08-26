import React from 'react';
import { Shield, RefreshCw, Send, PlusCircle } from 'lucide-react';

export default function FinancialOverview({
  savingsRate,
  monthlyExpenses,
  budgetCap = 12000,
  currency,
  formatMoney,
  recurringBills,
  onTransferClick,
  onAddTxnClick
}) {
  const budgetUsedPct = ((monthlyExpenses / budgetCap) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Savings & Budget Metrics Card */}
      <div className="glass-card rounded-2xl p-5 border border-[#1E2633] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]/60">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Financial Health & Runway
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Optimal
          </span>
        </div>

        {/* Savings Rate Progress Gauge */}
        <div className="bg-[#0E131A] p-3.5 rounded-xl border border-[#1E2633]/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Savings Target Rate</span>
            <span className="text-emerald-400 font-bold font-mono">{savingsRate}% / 60.0%</span>
          </div>
          <div className="h-2 w-full bg-[#1A2332] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              style={{ width: `${Math.min(savingsRate, 100)}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400">You are saving +7.8% above your corporate liquidity benchmark.</p>
        </div>

        {/* Monthly Budget Envelope */}
        <div className="bg-[#0E131A] p-3.5 rounded-xl border border-[#1E2633]/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Monthly Budget Cap</span>
            <span className="text-slate-200 font-mono font-semibold">
              {formatMoney(monthlyExpenses, currency)} / {formatMoney(budgetCap, currency)}
            </span>
          </div>
          <div className="h-2 w-full bg-[#1A2332] rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full"
              style={{ width: `${Math.min(budgetUsedPct, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Used: {budgetUsedPct}%</span>
            <span>Remaining: {formatMoney(budgetCap - monthlyExpenses, currency)}</span>
          </div>
        </div>

        {/* Quick Liquidity Action */}
        <div className="pt-1 flex gap-2">
          <button
            onClick={onTransferClick}
            className="flex-1 py-2 rounded-xl bg-[#161D29] hover:bg-[#1E2633] border border-[#1E2633] text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            Move Funds
          </button>
          <button
            onClick={onAddTxnClick}
            className="flex-1 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400 transition-colors flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Record Spend
          </button>
        </div>
      </div>

      {/* Upcoming Recurring Subscriptions */}
      <div className="glass-card rounded-2xl p-5 border border-[#1E2633] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2633]/60">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-400" />
            Upcoming Recurring
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Next 14 Days</span>
        </div>

        <div className="space-y-2">
          {recurringBills.map(bill => (
            <div key={bill.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0E131A] border border-[#1E2633]/60">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-200 truncate">{bill.name}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                  <span>Due: {bill.due}</span>
                  <span>•</span>
                  <span className="text-emerald-400">Auto-Debit</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-200">
                {formatMoney(bill.amount, currency)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
