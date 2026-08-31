import React from 'react';
import {
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function InvestmentsView({
  holdings,
  formatINR,
  onOpenTradeModal,
  showToast
}) {
  const totalValue = holdings.reduce((acc, curr) => acc + curr.value, 0);
  const totalPnL = holdings.reduce((acc, curr) => acc + curr.pnl, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11161F] border border-[#1E2633] p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Indian Investment Portfolio & SIPs</h2>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20">
              NSE / BSE Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Nifty 50 Index, Direct Equities, Flexi-Cap MFs, and Sovereign Gold Bonds (SGB).</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-400 font-mono">Portfolio Valuation</span>
            <h3 className="text-2xl font-extrabold text-white font-mono">{formatINR(totalValue)}</h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">+{formatINR(totalPnL)} (+15.12% All-Time)</span>
          </div>
          <button
            onClick={onOpenTradeModal}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-950/40 flex items-center gap-1.5"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Trade / Rebalance</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <span className="text-xs text-slate-400 font-mono uppercase">24h Day Gain</span>
          <h4 className="text-xl font-bold text-emerald-400 font-mono mt-1">+₹18,450.00 (+0.59%)</h4>
          <p className="text-[11px] text-slate-400">Market opening session</p>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <span className="text-xs text-slate-400 font-mono uppercase">Annualized Yield</span>
          <h4 className="text-xl font-bold text-blue-400 font-mono mt-1">14.8% CAGR</h4>
          <p className="text-[11px] text-slate-400">Nifty index + SGB return</p>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <span className="text-xs text-slate-400 font-mono uppercase">Active Holdings</span>
          <h4 className="text-xl font-bold text-white font-mono mt-1">{holdings.length} Assets</h4>
          <p className="text-[11px] text-slate-400">SIP Active on 1st of month</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-[#1E2633] overflow-hidden shadow-card">
        <div className="p-4 border-b border-[#1E2633] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Active Positions & Performance (INR ₹)</h3>
          <span className="text-xs font-mono text-slate-400">Streaming ticks every 5s</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0E131A] border-b border-[#1E2633] text-[10px] font-mono uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Asset Symbol</th>
                <th className="py-3 px-4">Asset Class</th>
                <th className="py-3 px-4">Units / Shares</th>
                <th className="py-3 px-4">Avg Buy (₹)</th>
                <th className="py-3 px-4">Live Price (₹)</th>
                <th className="py-3 px-4">Total Value</th>
                <th className="py-3 px-4 text-right">Profit / Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2633]/60 font-sans">
              {holdings.map(h => {
                const isProfit = h.pnl >= 0;
                return (
                  <tr key={h.symbol} className="hover:bg-[#161D29] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-xs">
                          {h.symbol}
                        </span>
                        <span className="text-slate-300">{h.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{h.type}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-200">{h.shares}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">₹{h.avg?.toFixed(2) || h.avgCost?.toFixed(2)}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-white">₹{h.price?.toFixed(2) || h.currentPrice?.toFixed(2)}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-100">{formatINR(h.value || h.totalValue)}</td>
                    <td className={`py-3.5 px-4 text-right font-mono font-bold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isProfit ? '+' : ''}{formatINR(h.pnl || h.gainLoss)} ({isProfit ? '+' : ''}{h.pnlPct || h.gainLossPct}%)
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
