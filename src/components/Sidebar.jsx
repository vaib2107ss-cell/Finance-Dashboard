import React from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  CreditCard,
  BarChart3,
  PieChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X
} from 'lucide-react';

export default function Sidebar({
  currentView,
  setCurrentView,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  accounts,
  selectedAccount,
  setSelectedAccount,
  formatINR,
  transactionsCount
}) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#1E2633] bg-[#0E131A]/95 backdrop-blur-xl transition-all duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header Brand */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-[#1E2633]/80">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setCurrentView('dashboard');
            setMobileMenuOpen(false);
          }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md shadow-emerald-900/40 text-slate-950 font-black text-lg tracking-tighter">
            ₹
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-sans">CASH<span className="text-emerald-400">X</span>FLOW</span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight truncate max-w-[150px]">Smart Cash Flow & Treasury</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md border border-[#1E2633] text-slate-400 hover:text-white hover:bg-[#161D29] transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden h-8 w-8 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-[#161D29]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          {!sidebarCollapsed && (
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Workspace
            </p>
          )}
          <nav className="space-y-1">
            <SidebarItem
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard"
              active={currentView === 'dashboard'}
              collapsed={sidebarCollapsed}
              onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}
            />
            <SidebarItem
              icon={<ArrowLeftRight className="w-4 h-4" />}
              label="Transactions"
              badge={transactionsCount}
              active={currentView === 'transactions'}
              collapsed={sidebarCollapsed}
              onClick={() => { setCurrentView('transactions'); setMobileMenuOpen(false); }}
            />
            <SidebarItem
              icon={<CreditCard className="w-4 h-4" />}
              label="Cards & Limits"
              badge="2 Cards"
              badgeColor="blue"
              active={currentView === 'cards'}
              collapsed={sidebarCollapsed}
              onClick={() => { setCurrentView('cards'); setMobileMenuOpen(false); }}
            />
            <SidebarItem
              icon={<BarChart3 className="w-4 h-4" />}
              label="Analytics & Runway"
              active={currentView === 'analytics'}
              collapsed={sidebarCollapsed}
              onClick={() => { setCurrentView('analytics'); setMobileMenuOpen(false); }}
            />
            <SidebarItem
              icon={<PieChart className="w-4 h-4" />}
              label="Investments (SIPs)"
              badge="+15.1%"
              badgeColor="emerald"
              active={currentView === 'investments'}
              collapsed={sidebarCollapsed}
              onClick={() => { setCurrentView('investments'); setMobileMenuOpen(false); }}
            />
            <SidebarItem
              icon={<Settings className="w-4 h-4" />}
              label="Settings"
              active={currentView === 'settings'}
              collapsed={sidebarCollapsed}
              onClick={() => { setCurrentView('settings'); setMobileMenuOpen(false); }}
            />
          </nav>
        </div>

        {/* Linked Accounts */}
        {!sidebarCollapsed && (
          <div className="pt-2 border-t border-[#1E2633]/60">
            <div className="flex items-center justify-between px-3 mb-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Bank Vaults & Cards
              </p>
              <span className="text-[11px] text-emerald-400 font-mono font-medium">{accounts.length} Active</span>
            </div>
            <div className="space-y-1.5">
              {accounts.map(acc => (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccount(selectedAccount === acc.id ? 'all' : acc.id)}
                  className={`group flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                    selectedAccount === acc.id
                      ? 'bg-[#18202C] border-emerald-500/40 shadow-sm'
                      : 'bg-[#11161F]/60 border-transparent hover:border-[#1E2633] hover:bg-[#161D29]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: acc.color }}></span>
                    <div className="truncate">
                      <p className="text-xs font-medium text-slate-200 truncate group-hover:text-white">{acc.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{acc.number || acc.accountNumber}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-300 tabular-nums">
                    {formatINR(acc.balance, 'compact')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Profile Mini Footer */}
      <div className="p-3 border-t border-[#1E2633]/80 bg-[#0B0F14]/60">
        <div
          className="flex items-center gap-3 p-2 rounded-xl bg-[#11161F] border border-[#1E2633] hover:border-slate-700 transition-colors cursor-pointer"
          onClick={() => { setCurrentView('settings'); setMobileMenuOpen(false); }}
        >
          <div className="relative flex-shrink-0">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center font-bold text-sm text-emerald-400">
              VS
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#11161F]"></span>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-white truncate">Vaibhav Sharma</span>
              <span className="text-[10px] text-emerald-400 font-mono truncate">Super Priority Wealth</span>
            </div>
          )}
          {!sidebarCollapsed && <ChevronUp className="w-4 h-4 text-slate-400" />}
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, badge, badgeColor = "slate", active, collapsed, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
        active
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
          : 'text-slate-400 hover:text-slate-100 hover:bg-[#161D29] border border-transparent'
      }`}
      title={collapsed ? label : undefined}
    >
      <div className={`${active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
        {icon}
      </div>
      {!collapsed && (
        <span className="flex-1 text-left tracking-tight truncate">{label}</span>
      )}
      {!collapsed && badge !== undefined && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
          badgeColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
          badgeColor === 'blue' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
          'bg-slate-800 text-slate-300 border border-slate-700'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}
