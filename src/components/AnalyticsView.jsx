import React from 'react';
import {
  ShieldCheck,
  TrendingDown,
  PieChart,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { MONEY_DISTRIBUTION } from '../data/mockData';

export default function AnalyticsView({
  monthlyIncome,
  monthlyExpenses,
  netCashFlow,
  savingsRate,
  formatINR,
  netWorth
}) {
  return (
    <div className="space-y-6">
      <div className="bg-[#11161F] border border-[#1E2633] p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-white">Financial Analytics & Runway Projections (INR ₹)</h2>
        <p className="text-xs text-slate-400 mt-1">Cash flow velocity, burn rate forecast, and wealth compounding metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <p className="text-xs text-slate-400 uppercase font-mono">Monthly Cash Surplus</p>
          <h3 className="text-2xl font-bold text-emerald-400 font-mono mt-1">+{formatINR(netCashFlow, 'compact')}</h3>
          <p className="text-[11px] text-slate-400 mt-1">Savings Rate: {savingsRate}%</p>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <p className="text-xs text-slate-400 uppercase font-mono">Zero-Income Runway</p>
          <h3 className="text-2xl font-bold text-white font-mono mt-1">17.6 Months</h3>
          <p className="text-[11px] text-slate-400 mt-1">At ₹95.4k/mo current burn</p>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <p className="text-xs text-slate-400 uppercase font-mono">Financial Health</p>
          <h3 className="text-2xl font-bold text-blue-400 font-mono mt-1">87 / 100</h3>
          <p className="text-[11px] text-slate-400 mt-1">Healthy Wealth Tier</p>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-[#1E2633]">
          <p className="text-xs text-slate-400 uppercase font-mono">Annualized Yield</p>
          <h3 className="text-2xl font-bold text-purple-400 font-mono mt-1">+14.8% p.a.</h3>
          <p className="text-[11px] text-slate-400 mt-1">Blended index + FD return</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-[#1E2633]">
          <h3 className="text-sm font-bold text-white mb-1">MoM Expenditure Optimization</h3>
          <p className="text-xs text-slate-400 mb-4">Cost reduction trajectory across lifestyle and utilities.</p>

          <div className="space-y-4">
            {[
              { name: "Cloud & Dev Infrastructure", current: "₹6,960.00", change: "-8.4%", status: "Spot Instances Optimized" },
              { name: "Food & Gourmet Dining", current: "₹17,172.00", change: "-14.1%", status: "Fewer Swiggy Gourmet Orders" },
              { name: "Travel & Flight Commute", current: "₹11,448.00", change: "-23.7%", status: "Off-peak Bookings" },
              { name: "Shopping & Lifestyle", current: "₹15,264.00", change: "-15.2%", status: "Disciplined Discretionary Spend" }
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
          <h3 className="text-sm font-bold text-white mb-1">Asset Allocation Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Wealth distribution across Indian market instruments.</p>

          <div className="space-y-3">
            {MONEY_DISTRIBUTION.map((item, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">{item.name}</span>
                  <span className="font-mono text-slate-200 font-bold">{formatINR(item.amount, 'compact')} ({item.percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-[#1A2332] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
