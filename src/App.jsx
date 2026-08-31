import React, { useState, useMemo, useEffect } from 'react';
import {
  USER_PROFILE,
  ACCOUNTS_DATA,
  KPI_METRICS,
  SPENDING_CATEGORIES,
  INITIAL_TRANSACTIONS,
  UPCOMING_PAYMENTS,
  INVESTMENTS_PORTFOLIO,
  NOTIFICATIONS_DATA,
  CASH_FLOW_HISTORY,
  MONEY_DISTRIBUTION,
  FINANCIAL_HEALTH_METRICS
} from './data/mockData';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import KpiCard from './components/KpiCard';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import CategoryBreakdown from './components/CategoryBreakdown';
import TransactionsTable from './components/TransactionsTable';
import FinancialOverview from './components/FinancialOverview';
import TransferModal from './components/TransferModal';
import AddTransactionModal from './components/AddTransactionModal';
import TransactionDetailModal from './components/TransactionDetailModal';
import TradeOrderModal from './components/TradeOrderModal';
import CommandPalette from './components/CommandPalette';
import CardsView from './components/CardsView';
import AnalyticsView from './components/AnalyticsView';
import InvestmentsView from './components/InvestmentsView';
import SettingsView from './components/SettingsView';

import {
  Gem,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingDown,
  ShieldCheck,
  BarChart3,
  LineChart,
  BarChart2,
  PieChart,
  Layers,
  Sparkles,
  Zap,
  AlertTriangle,
  Calendar,
  Check,
  Download
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [cashFlowRange, setCashFlowRange] = useState('6M');
  const [chartType, setChartType] = useState('area');

  const [accounts, setAccounts] = useState(ACCOUNTS_DATA);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [holdings, setHoldings] = useState(INVESTMENTS_PORTFOLIO.holdings);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const [cards, setCards] = useState([
    { id: "c-1", name: "Axis Magnus Metal Card", pan: "4829 •••• •••• 7712", exp: "08/29", cvv: "492", type: "Priority Metal", isFrozen: false, limit: 500000, spent: 42300.00, holder: "VAIBHAV SHARMA" },
    { id: "c-2", name: "HDFC Corporate Virtual Float", pan: "4111 •••• •••• 9301", exp: "12/28", cvv: "810", type: "Virtual Cloud", isFrozen: false, limit: 100000, spent: 18400.00, holder: "CASHXFLOW DEV OPS" }
  ]);

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAddTxnModalOpen, setIsAddTxnModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedTxnForModal, setSelectedTxnForModal] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Indian Rupee (₹) Formatter
  const formatINR = (amount, formatType = 'standard') => {
    const absVal = Math.abs(amount);
    const isNegative = amount < 0;
    const sign = isNegative ? '-' : '';

    if (formatType === 'compact') {
      if (absVal >= 10000000) {
        return `${sign}₹${(absVal / 10000000).toFixed(2)} Cr`;
      }
      if (absVal >= 100000) {
        return `${sign}₹${(absVal / 100000).toFixed(2)} Lakh`;
      }
      if (absVal >= 1000) {
        return `${sign}₹${(absVal / 1000).toFixed(1)}k`;
      }
    }

    return `${sign}₹${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(absVal)}`;
  };

  const dynamicGreeting = useMemo(() => {
    const hour = new Date().getHours();
    let greeting = "Good Evening";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";
    return `${greeting}, ${USER_PROFILE.name} 👋`;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsTransferModalOpen(false);
        setIsAddTxnModalOpen(false);
        setIsTradeModalOpen(false);
        setSelectedTxnForModal(null);
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalBalance = useMemo(() => {
    return accounts.reduce((acc, curr) => acc + curr.balance, 0);
  }, [accounts]);

  const totalInvestments = useMemo(() => {
    return holdings.reduce((acc, curr) => acc + curr.totalValue, 0);
  }, [holdings]);

  const netWorth = useMemo(() => {
    return totalBalance + totalInvestments;
  }, [totalBalance, totalInvestments]);

  const monthlyIncome = useMemo(() => {
    return transactions
      .filter(t => t.type === 'income' && t.status === 'Completed')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const monthlyExpenses = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense' && t.status === 'Completed')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [transactions]);

  const netCashFlow = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? ((netCashFlow / monthlyIncome) * 100).toFixed(1) : 0;

  const handleAddTransaction = (newTxn) => {
    setTransactions([newTxn, ...transactions]);
    setAccounts(prev => prev.map(acc => {
      if (acc.name === newTxn.account) {
        return { ...acc, balance: acc.balance + newTxn.amount };
      }
      return acc;
    }));
    showToast(`Transaction recorded successfully!`);
    setIsAddTxnModalOpen(false);
  };

  const handleTransfer = ({ fromId, toId, amount, note }) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;

    setAccounts(prev => prev.map(acc => {
      if (acc.id === fromId) return { ...acc, balance: acc.balance - amt };
      if (acc.id === toId) return { ...acc, balance: acc.balance + amt };
      return acc;
    }));

    const fromAcc = accounts.find(a => a.id === fromId);
    const toAcc = accounts.find(a => a.id === toId);

    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Aug 31, 2026",
      time: "Just now",
      desc: `Internal Transfer: ${fromAcc?.name} → ${toAcc?.name}`,
      merchant: "Self Liquidity Transfer",
      category: "Transfer",
      account: fromAcc?.name || "HDFC Salary & Primary",
      amount: -amt,
      type: "expense",
      status: "Completed",
      icon: "ArrowRightLeft",
      authCode: `IMPS-IN${Math.floor(10000 + Math.random() * 90000)}`
    };

    setTransactions([newTxn, ...transactions]);
    showToast(`Transferred ${formatINR(amt)} to ${toAcc?.name}!`);
    setIsTransferModalOpen(false);
  };

  const handleTrade = ({ symbol, action, shares, price, total }) => {
    const cost = parseFloat(total);
    if (action === 'BUY') {
      setAccounts(prev => prev.map(a => a.id === 'acc-1' ? { ...a, balance: a.balance - cost } : a));
      setHoldings(prev => {
        const exists = prev.find(h => h.symbol === symbol);
        if (exists) {
          const newShares = exists.shares + parseFloat(shares);
          const newAvg = +(((exists.shares * exists.avgCost) + cost) / newShares).toFixed(2);
          const newValue = +(newShares * exists.currentPrice).toFixed(2);
          const newPnl = +(newValue - (newShares * newAvg)).toFixed(2);
          const newPnlPct = +((newPnl / (newShares * newAvg)) * 100).toFixed(2);
          return prev.map(h => h.symbol === symbol ? { ...h, shares: newShares, avgCost: newAvg, totalValue: newValue, gainLoss: newPnl, gainLossPct: newPnlPct } : h);
        }
        return prev;
      });
      showToast(`Executed BUY ${shares} ${symbol} for ${formatINR(cost)}!`);
    } else {
      setAccounts(prev => prev.map(a => a.id === 'acc-1' ? { ...a, balance: a.balance + cost } : a));
      setHoldings(prev => prev.map(h => {
        if (h.symbol === symbol) {
          const newShares = Math.max(0, h.shares - parseFloat(shares));
          const newValue = +(newShares * h.currentPrice).toFixed(2);
          const newPnl = +(newValue - (newShares * h.avgCost)).toFixed(2);
          const newPnlPct = newShares > 0 ? +((newPnl / (newShares * h.avgCost)) * 100).toFixed(2) : 0;
          return { ...h, shares: newShares, totalValue: newValue, gainLoss: newPnl, gainLossPct: newPnlPct };
        }
        return h;
      }));
      showToast(`Executed SELL ${shares} ${symbol} for ${formatINR(cost)}!`);
    }
    setIsTradeModalOpen(false);
  };

  const handleToggleFreezeCard = (cardId) => {
    setCards(prev => prev.map(c => {
      if (c.id === cardId) {
        const nextState = !c.isFrozen;
        showToast(`${c.name} ${nextState ? 'Frozen / Locked' : 'Active & Unfrozen'}`);
        return { ...c, isFrozen: nextState };
      }
      return c;
    }));
  };

  const handleExportCSV = () => {
    const headers = ["Transaction ID", "Date", "Description", "Merchant", "Category", "Account", "Amount (INR)", "Type", "Status", "Auth Code"];
    const rows = transactions.map(t => [
      t.id,
      t.date,
      `"${(t.desc || t.description || '').replace(/"/g, '""')}"`,
      `"${(t.merchant || '').replace(/"/g, '""')}"`,
      t.category,
      `"${t.account}"`,
      t.amount,
      t.type,
      t.status,
      t.authCode || 'N/A'
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CASHXFLOW_Ledger_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CASHXFLOW CSV ledger export generated and downloaded!");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F14] text-slate-100">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#11161F]/95 border border-emerald-500/30 text-slate-100 px-4 py-3 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-md border-l-4 border-l-emerald-500 animate-fade-in">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Check className="w-4 h-4" />
          </span>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        accounts={accounts}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        formatINR={formatINR}
        transactionsCount={transactions.length}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          currentView={currentView}
          selectedAccount={selectedAccount}
          accounts={accounts}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenTransferModal={() => setIsTransferModalOpen(true)}
          onOpenAddTxnModal={() => setIsAddTxnModalOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAllRead={() => {
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            showToast("All notifications marked as read");
          }}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              {/* Header Greeting */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#11161F]/70 border border-[#1E2633] p-5 rounded-2xl backdrop-blur-md">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{dynamicGreeting}</h1>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Smart Cash Flow & Financial Management Dashboard • <span className="text-emerald-400 font-mono">Net Surplus: +{formatINR(netCashFlow)} this month</span>
                  </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-[#0B0F14] border border-[#1E2633] rounded-lg p-1 text-xs">
                    <button
                      onClick={() => setSelectedAccount('all')}
                      className={`px-2.5 py-1 rounded-md transition-all font-medium ${selectedAccount === 'all' ? 'bg-[#1E2633] text-white' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      All Accounts
                    </button>
                    {accounts.map(acc => (
                      <button
                        key={acc.id}
                        onClick={() => setSelectedAccount(acc.id)}
                        className={`px-2.5 py-1 rounded-md transition-all font-medium ${selectedAccount === acc.id ? 'bg-[#1E2633] text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        {acc.badge || acc.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18202C] hover:bg-[#202B3B] border border-[#1E2633] rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Report</span>
                  </button>
                </div>
              </div>

              {/* 4 Main KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <KpiCard
                  title="Net Worth"
                  value={formatINR(netWorth)}
                  compactValue={formatINR(netWorth, 'compact')}
                  change="↑ 14.2%"
                  changeType="positive"
                  subtitle="vs last month (+₹6.02L)"
                  icon={<Gem className="w-4 h-4 text-blue-400" />}
                  sparkline={[3850000, 4020000, 4180000, 4390000, 4520000, 4710000, 4850000]}
                  sparklineColor="#3B82F6"
                />
                <KpiCard
                  title="Total Balance"
                  value={formatINR(totalBalance)}
                  compactValue={formatINR(totalBalance, 'compact')}
                  change="↑ 8.6%"
                  changeType="positive"
                  subtitle="vs last month (+₹1.33L)"
                  icon={<Wallet className="w-4 h-4 text-emerald-400" />}
                  sparkline={[1350000, 1420000, 1380000, 1490000, 1540000, 1610000, 1687620]}
                  sparklineColor="#10B981"
                />
                <KpiCard
                  title="Monthly Income"
                  value={formatINR(monthlyIncome)}
                  compactValue={formatINR(monthlyIncome, 'compact')}
                  change="↑ 12.4%"
                  changeType="positive"
                  subtitle="vs ₹2.53 Lakh last mo"
                  icon={<ArrowDownLeft className="w-4 h-4 text-emerald-400" />}
                  sparkline={[240000, 245000, 260000, 255000, 270000, 278000, 285000]}
                  sparklineColor="#10B981"
                />
                <KpiCard
                  title="Monthly Expenses"
                  value={formatINR(monthlyExpenses)}
                  compactValue={formatINR(monthlyExpenses, 'compact')}
                  change="↓ 4.2%"
                  changeType="favorable"
                  subtitle="vs ₹99.5k last mo (Favorable)"
                  icon={<ArrowUpRight className="w-4 h-4 text-rose-400" />}
                  sparkline={[110000, 105000, 118000, 98000, 102000, 99500, 95400]}
                  sparklineColor="#F43F5E"
                />
              </div>

              {/* Net Cash Flow Banner */}
              <div className="glass-card rounded-2xl p-4 sm:p-5 border border-emerald-500/30 bg-gradient-to-r from-[#11161F] via-[#121E23] to-[#11161F] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-glow-green">
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ₹
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Net Monthly Cash Flow (Income − Expenses)</span>
                    <div className="flex items-baseline gap-3 mt-0.5">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">{formatINR(netCashFlow)}</h2>
                      <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                        Savings Rate: {savingsRate}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="px-3 py-2 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
                    <span className="text-slate-400 text-[10px] block">Inflow</span>
                    <span className="font-bold text-emerald-400">{formatINR(monthlyIncome)}</span>
                  </div>
                  <span className="text-slate-500 font-bold">−</span>
                  <div className="px-3 py-2 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
                    <span className="text-slate-400 text-[10px] block">Outflow</span>
                    <span className="font-bold text-rose-400">{formatINR(monthlyExpenses)}</span>
                  </div>
                  <span className="text-slate-500 font-bold">=</span>
                  <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="text-emerald-400 text-[10px] block">Surplus</span>
                    <span className="font-bold text-white">{formatINR(netCashFlow)}</span>
                  </div>
                </div>
              </div>

              {/* 2x2 Middle Section:
                  1. Cash Flow (Income vs Expenses vs Net)
                  2. Spending Distribution Donut
                  3. Monthly Spending Trend
                  4. Financial Health Score
              */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Cash Flow Chart */}
                <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[#1E2633] flex flex-col justify-between shadow-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2633]/60">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-400" />
                        Cash Flow (Income vs Expenses vs Net)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">3-Series comparison across months with net retained cash.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[#0B0F14] p-1 rounded-lg border border-[#1E2633]">
                        <button
                          onClick={() => setChartType('area')}
                          className={`p-1.5 rounded-md text-xs transition-colors ${chartType === 'area' ? 'bg-[#1E2633] text-emerald-400' : 'text-slate-400'}`}
                        >
                          <LineChart className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setChartType('bar')}
                          className={`p-1.5 rounded-md text-xs transition-colors ${chartType === 'bar' ? 'bg-[#1E2633] text-emerald-400' : 'text-slate-400'}`}
                        >
                          <BarChart2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center bg-[#0B0F14] p-1 rounded-lg border border-[#1E2633] text-xs font-mono font-medium">
                        {["6M", "12M"].map(period => (
                          <button
                            key={period}
                            onClick={() => setCashFlowRange(period)}
                            className={`px-2.5 py-1 rounded-md transition-all ${
                              cashFlowRange === period
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="my-4 h-64 w-full relative">
                    <IncomeExpenseChart
                      period={cashFlowRange}
                      type={chartType}
                      data={CASH_FLOW_HISTORY.map(d => ({
                        name: d.month,
                        income: d.income,
                        expenses: d.expenses,
                        net: d.net
                      }))}
                    />
                  </div>

                  <div className="pt-3 border-t border-[#1E2633]/60 grid grid-cols-3 gap-2 text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
                      <span className="text-[11px] font-mono text-slate-300">Income</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500"></div>
                      <span className="text-[11px] font-mono text-slate-300">Expenses</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>
                      <span className="text-[11px] font-mono text-slate-300">Net Cash</span>
                    </div>
                  </div>
                </div>

                {/* 2. Spending Distribution */}
                <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[#1E2633] flex flex-col justify-between shadow-card">
                  <div className="pb-4 border-b border-[#1E2633]/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-purple-400" />
                        Spending Distribution
                      </h3>
                      <p className="text-xs text-slate-400">Food, Bills, Shopping, Travel, Investments, etc.</p>
                    </div>
                    <span className="text-xs font-mono text-slate-300 font-bold">{formatINR(monthlyExpenses)}</span>
                  </div>

                  <div className="my-2 flex-1">
                    <CategoryBreakdown
                      categories={SPENDING_CATEGORIES}
                      formatINR={formatINR}
                    />
                  </div>
                </div>

                {/* 3. Monthly Spending Trend */}
                <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[#1E2633] flex flex-col justify-between shadow-card">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1E2633]/60">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-emerald-400" />
                        Monthly Spending Trend
                      </h3>
                      <p className="text-xs text-slate-400">Expense trajectory (Decreasing = Healthy).</p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ↓ 4.2% MoM Drop
                    </span>
                  </div>

                  <div className="my-4 h-60 w-full relative">
                    <IncomeExpenseChart
                      period="6M"
                      type="area"
                      data={CASH_FLOW_HISTORY.map(d => ({
                        name: d.month,
                        expenses: d.expenses
                      }))}
                    />
                  </div>

                  <div className="pt-3 border-t border-[#1E2633]/60 flex items-center justify-between text-xs text-slate-400">
                    <span>Avg Monthly Burn: <strong className="text-white font-mono">₹1,02,737</strong></span>
                    <span className="text-emerald-400 font-mono font-medium">Within ₹1.2L Budget Envelope</span>
                  </div>
                </div>

                {/* 4. Financial Health Score */}
                <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[#1E2633] flex flex-col justify-between shadow-card">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]/60">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Financial Health Score
                      </h3>
                      <p className="text-xs text-slate-400">Multi-factor liquidity, savings rate, runway & debt analysis.</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                      Top 5% Tier
                    </span>
                  </div>

                  <div className="my-3 flex items-center justify-between p-4 rounded-2xl bg-[#0B0F14] border border-[#1E2633]">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-emerald-400 font-mono leading-none">87</span>
                        <span className="text-[9px] font-mono text-slate-400">/ 100</span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">HEALTHY STATUS</h4>
                        <p className="text-xs text-slate-400">Optimal savings & low leverage debt</p>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[10px] uppercase text-slate-400 block">Emergency Cash</span>
                      <span className="text-sm font-bold text-emerald-400">17.6 Months</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Savings Target Rate</span>
                      <span className="text-emerald-400 font-mono font-bold">{savingsRate}% (Benchmark: 40%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1A2332] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(savingsRate, 100)}%` }}></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                      <div className="p-2 rounded-lg bg-[#11161F] border border-[#1E2633]">
                        <span className="text-[10px] text-slate-400 block">Investments Return</span>
                        <span className="font-bold text-blue-400">+14.8% p.a.</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#11161F] border border-[#1E2633]">
                        <span className="text-[10px] text-slate-400 block">EMI / Income Ratio</span>
                        <span className="font-bold text-emerald-400">14.8% (Safe)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Money Distribution + AI Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card rounded-2xl p-5 border border-[#1E2633] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]/60">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" />
                      Money Distribution
                    </h3>
                    <span className="text-xs font-mono text-slate-300 font-bold">{formatINR(netWorth, 'compact')} Total</span>
                  </div>

                  <div className="space-y-3">
                    {MONEY_DISTRIBUTION.map(item => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">{item.name}</span>
                          <span className="font-mono text-slate-200 font-bold">{formatINR(item.amount, 'compact')} ({item.percentage}%)</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#1A2332] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 glass-card rounded-2xl p-5 sm:p-6 border border-[#1E2633] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]/60">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Financial Insights & AI Recommendations
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Automated Synthesis
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-xl bg-[#0B0F14] border border-[#1E2633] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <TrendingDown className="w-3.5 h-3.5" />
                          Spending Reduced 4.2%
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">Efficiency</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        You saved ₹4,180 compared to last month. Food and travel expenses saw the most significant drop.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0B0F14] border border-[#1E2633] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                          <PieChart className="w-3.5 h-3.5" />
                          Investments at 50.5% Net Worth
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">Growth</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Equity & Mutual Fund assets reached ₹24.50 Lakh, generating ₹32,400 in unrealized gains this month.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#121B27] to-[#0E141D] border border-blue-500/20 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-blue-400" />
                          Move ₹50k to ICICI Sweep Deposit
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">+₹3,550/yr</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        HDFC Primary balance (₹3.85L) exceeds monthly liquidity needs. Earn 7.1% APY without locking funds.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#1B1812] to-[#14120E] border border-amber-500/20 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          Shopping Envelope at 84%
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">₹2,736 Left</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        You spent ₹15,264 out of your ₹18,000 shopping budget with 5 days remaining in the billing cycle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Section: Upcoming Payments & Recent Transactions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FinancialOverview
                  savingsRate={savingsRate}
                  monthlyExpenses={monthlyExpenses}
                  formatINR={formatINR}
                  upcomingPayments={UPCOMING_PAYMENTS}
                  onTransferClick={() => setIsTransferModalOpen(true)}
                  onAddTxnClick={() => setIsAddTxnModalOpen(true)}
                />

                <div className="lg:col-span-2">
                  <TransactionsTable
                    transactions={transactions}
                    formatINR={formatINR}
                    onSelectTransaction={(txn) => setSelectedTxnForModal(txn)}
                    onExportCSV={handleExportCSV}
                    limit={6}
                  />
                </div>
              </div>
            </div>
          )}

          {currentView === 'transactions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11161F] border border-[#1E2633] p-5 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white">Audited Transactions Ledger (INR ₹)</h2>
                  <p className="text-xs text-slate-400 mt-1">Multi-account bank authorizations, merchant wires, and categorized expenses.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18202C] hover:bg-[#202B3B] border border-[#1E2633] text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setIsAddTxnModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-colors"
                  >
                    <span>Add Record</span>
                  </button>
                </div>
              </div>

              <TransactionsTable
                transactions={transactions}
                formatINR={formatINR}
                onSelectTransaction={(txn) => setSelectedTxnForModal(txn)}
                onExportCSV={handleExportCSV}
                limit={0}
              />
            </div>
          )}

          {currentView === 'cards' && (
            <CardsView
              cards={cards}
              formatINR={formatINR}
              onToggleFreeze={handleToggleFreezeCard}
              showToast={showToast}
            />
          )}

          {currentView === 'analytics' && (
            <AnalyticsView
              monthlyIncome={monthlyIncome}
              monthlyExpenses={monthlyExpenses}
              netCashFlow={netCashFlow}
              savingsRate={savingsRate}
              formatINR={formatINR}
              netWorth={netWorth}
            />
          )}

          {currentView === 'investments' && (
            <InvestmentsView
              holdings={holdings}
              formatINR={formatINR}
              onOpenTradeModal={() => setIsTradeModalOpen(true)}
              showToast={showToast}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {isTransferModalOpen && (
        <TransferModal
          accounts={accounts}
          formatINR={formatINR}
          onClose={() => setIsTransferModalOpen(false)}
          onTransfer={handleTransfer}
        />
      )}

      {isAddTxnModalOpen && (
        <AddTransactionModal
          accounts={accounts}
          formatINR={formatINR}
          onClose={() => setIsAddTxnModalOpen(false)}
          onAdd={handleAddTransaction}
        />
      )}

      {isTradeModalOpen && (
        <TradeOrderModal
          holdings={holdings}
          accounts={accounts}
          formatINR={formatINR}
          onClose={() => setIsTradeModalOpen(false)}
          onTrade={handleTrade}
        />
      )}

      {selectedTxnForModal && (
        <TransactionDetailModal
          txn={selectedTxnForModal}
          formatINR={formatINR}
          onClose={() => setSelectedTxnForModal(null)}
          showToast={showToast}
        />
      )}

      {isCommandPaletteOpen && (
        <CommandPalette
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={(view) => { setCurrentView(view); setIsCommandPaletteOpen(false); }}
          onAction={(action) => {
            setIsCommandPaletteOpen(false);
            if (action === 'transfer') setIsTransferModalOpen(true);
            if (action === 'add-txn') setIsAddTxnModalOpen(true);
            if (action === 'trade') setIsTradeModalOpen(true);
            if (action === 'export-csv') handleExportCSV();
          }}
        />
      )}
    </div>
  );
}
