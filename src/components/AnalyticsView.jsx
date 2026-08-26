import React from 'react';

export default function AnalyticsView({ currency, monthlyIncome, monthlyExpenses, netSavings, savingsRate, transactions, formatMoney }) {
  return (
    <div className="space-y-6">
      <div className="bg-[#11161F] border border-[#1E2633] p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-white">Financial Analytics & Runway Projections</h2>
        <p className="text-xs text-slate-400 mt-1">Institutional cash flow velocity, burn rate forecast, and revenue concentration.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <p className="text-xs text-slate-400 uppercase font-mono">Net Burn Rate / Mo</p>
          <h3 className="text-2xl font-bold text-emerald-400 font-mono mt-1">+$19.3k Surplus</h3>
          <p className="text-[11px] text-slate-400 mt-1">Cash flow positive</p>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <p className="text-xs text-slate-400 uppercase font-mono">Zero-Revenue Runway</p>
          <h3 className="text-2xl font-bold text-white font-mono mt-1">16.2 Months</h3>
          <p className="text-[11px] text-slate-400 mt-1">At current $9.1k/mo burn</p>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <p className="text-xs text-slate-400 uppercase font-mono">Capital Efficiency</p>
          <h3 className="text-2xl font-bold text-blue-400 font-mono mt-1">94.8 / 100</h3>
          <p className="text-[11px] text-slate-400 mt-1">Top decile peer benchmark</p>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <p className="text-xs text-slate-400 uppercase font-mono">Gross Margin</p>
          <h3 className="text-2xl font-bold text-purple-400 font-mono mt-1">{savingsRate}%</h3>
          <p className="text-[11px] text-slate-400 mt-1">+{formatMoney(netSavings, currency)} net delta</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-[#1E2633]">
          <h3 className="text-sm font-bold text-white mb-1">MoM Expenditure Optimization</h3>
          <p className="text-xs text-slate-400 mb-4">Cost reduction trajectory across core infrastructure lines.</p>

          <div className="space-y-4">
            {[
              { name: "Cloud Compute (AWS + GCP)", current: "$3,535.80", change: "-8.4%", status: "Optimized (Spot Instances)" },
              { name: "SaaS Licenses & Seats", current: "$2,180.00", change: "-12.1%", status: "Pruned 6 Inactive Seats" },
              { name: "Contractor Engineering", current: "$1,850.00", change: "+4.2%", status: "Refactoring Delivery Milestone" },
              { name: "Growth & Acquisition", current: "$1,120.80", change: "-25.0%", status: "High Organic Conversion" }
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#0B0F14] border border-[#1E2633] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-200">{item.name}</p>
                  <p className="text-[10px] text-emerald-400 font-mono">{item.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono font-bold text-white">{item.current}</p>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-[#1E2633]">
          <h3 className="text-sm font-bold text-white mb-1">Treasury Diversification Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Risk-adjusted allocation across bank institutions and money markets.</p>

          <div className="space-y-3">
            {[
              { name: "Mercury Treasury MM (Yield 5.1%)", pct: 54, amount: "$142,950.25", color: "#10B981" },
              { name: "Silicon Valley Bank (Operating)", pct: 28, amount: "$74,100.00", color: "#3B82F6" },
              { name: "US Short-Term Sovereign T-Bills", pct: 12, amount: "$31,740.00", color: "#8B5CF6" },
              { name: "Institutional Clearing Float", pct: 6, amount: "$15,870.00", color: "#F59E0B" }
            ].map((item, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">{item.name}</span>
                  <span className="font-mono text-slate-200 font-bold">{item.amount} ({item.pct}%)</span>
                </div>
                <div className="h-2 w-full bg-[#1A2332] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
