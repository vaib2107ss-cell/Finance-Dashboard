import React from 'react';
import {
  Menu,
  Search,
  ArrowRightLeft,
  Plus,
  Bell,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  currentView,
  selectedAccount,
  accounts,
  currency,
  setCurrency,
  onOpenCommandPalette,
  onOpenTransferModal,
  onOpenAddTxnModal,
  onToggleMobileMenu,
  isNotificationsOpen,
  setIsNotificationsOpen,
  notifications,
  unreadCount,
  onMarkAllRead,
  showToast
}) {
  return (
    <header className="h-16 border-b border-[#1E2633] bg-[#0E131A]/80 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between gap-4 z-30">
      {/* Mobile Hamburger & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg border border-[#1E2633] text-slate-300 hover:text-white hover:bg-[#161D29]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400 font-medium hidden sm:inline">Workspace</span>
          <span className="text-slate-500 hidden sm:inline">/</span>
          <span className="text-white font-semibold capitalize flex items-center gap-2">
            {currentView}
            {selectedAccount !== 'all' && (
              <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Filter: {accounts.find(a => a.id === selectedAccount)?.name}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Search / Command trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#11161F] border border-[#1E2633] text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all text-xs w-64 justify-between shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Quick search or command...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#1E2633] text-slate-300 rounded border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Currency Switcher */}
        <div className="relative">
          <select
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
              showToast(`Currency switched to ${e.target.value}`);
            }}
            className="bg-[#11161F] border border-[#1E2633] text-xs text-slate-200 font-mono font-medium rounded-lg px-2.5 py-1.5 hover:border-slate-600 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none pr-7"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="SGD">SGD (S$)</option>
          </select>
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {/* Move Funds / Transfer */}
        <button
          onClick={onOpenTransferModal}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18202C] hover:bg-[#202B3B] border border-[#1E2633] text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>Transfer</span>
        </button>

        {/* Add Entry */}
        <button
          onClick={onOpenAddTxnModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-emerald-950/40"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">Add Entry</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#1E2633] bg-[#11161F] text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#11161F] border border-[#1E2633] shadow-modal z-50 p-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                    {unreadCount} unread
                  </span>
                </div>
                <button
                  onClick={onMarkAllRead}
                  className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Mark all read
                </button>
              </div>
              <div className="divide-y divide-[#1E2633]/60 max-h-72 overflow-y-auto mt-2">
                {notifications.map(n => (
                  <div key={n.id} className={`py-2.5 px-1 flex gap-3 ${n.unread ? 'bg-emerald-500/5' : ''}`}>
                    <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${n.unread ? 'bg-emerald-400' : 'bg-slate-600'}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.desc || n.message}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
