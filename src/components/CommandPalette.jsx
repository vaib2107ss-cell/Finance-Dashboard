import React, { useState } from 'react';
import {
  Search,
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  PieChart,
  Settings,
  Send,
  PlusCircle,
  Download
} from 'lucide-react';

export default function CommandPalette({ onClose, onNavigate, onAction }) {
  const [search, setSearch] = useState('');

  const commands = [
    { id: 'view-dash', label: 'Go to Dashboard Overview', category: 'Navigation', icon: <LayoutDashboard className="w-3.5 h-3.5" />, action: () => onNavigate('dashboard') },
    { id: 'view-txns', label: 'View All Transactions Ledger', category: 'Navigation', icon: <ArrowLeftRight className="w-3.5 h-3.5" />, action: () => onNavigate('transactions') },
    { id: 'view-analytics', label: 'Open Analytics & Burn Runway', category: 'Navigation', icon: <BarChart3 className="w-3.5 h-3.5" />, action: () => onNavigate('analytics') },
    { id: 'view-inv', label: 'Open Investments Portfolio', category: 'Navigation', icon: <PieChart className="w-3.5 h-3.5" />, action: () => onNavigate('investments') },
    { id: 'view-set', label: 'Open Workspace Settings', category: 'Navigation', icon: <Settings className="w-3.5 h-3.5" />, action: () => onNavigate('settings') },
    { id: 'act-transfer', label: 'Transfer Money Between Vaults', category: 'Actions', icon: <Send className="w-3.5 h-3.5" />, action: () => onAction('transfer') },
    { id: 'act-add', label: 'Record New Transaction / Spend', category: 'Actions', icon: <PlusCircle className="w-3.5 h-3.5" />, action: () => onAction('add-txn') },
    { id: 'act-export', label: 'Export Complete CSV Ledger', category: 'Actions', icon: <Download className="w-3.5 h-3.5" />, action: () => onAction('export-csv') },
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#11161F] border border-[#1E2633] rounded-2xl shadow-modal overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1E2633]">
          <Search className="w-4 h-4 text-emerald-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or jump to page..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#1E2633] text-slate-400 rounded">ESC</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map(cmd => (
            <div
              key={cmd.id}
              onClick={cmd.action}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#18202C] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-[#0B0F14] border border-[#1E2633] flex items-center justify-center text-slate-400 group-hover:text-emerald-400">
                  {cmd.icon}
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{cmd.label}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{cmd.category}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-6 text-center text-xs text-slate-500">
              No matching actions found for "{search}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
