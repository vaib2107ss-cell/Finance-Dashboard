import React, { useState, useMemo, useEffect } from 'react';
import {
  USER_PROFILE,
  ACCOUNTS_DATA,
  KPI_METRICS,
  SPENDING_CATEGORIES,
  INITIAL_TRANSACTIONS,
  RECURRING_SUBSCRIPTIONS,
  INVESTMENTS_PORTFOLIO,
  NOTIFICATIONS_DATA,
  CASH_FLOW_CHART_DATA
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
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank,
  LineChart,
  BarChart2,
  Check
} from 'lucide-react';

const CURRENCY_SYMBOLS = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  SGD: { symbol: 'S$', rate: 1.34 }
};

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currency, setCurrency] = useState('USD');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [timeRange, setTimeRange] = useState('7D');
  const [chartType, setChartType] = useState('area');

  const [accounts, setAccounts] = useState(ACCOUNTS_DATA);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [holdings, setHoldings] = useState(INVESTMENTS_PORTFOLIO.holdings);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const [cards, setCards] = useState([
    { id: "c-1", name: "Apex Black Charge Card", pan: "4829 •••• •••• 7712", exp: "08/29", cvv: "492", type: "Corporate Physical", isFrozen: false, limit: 50000, spent: 3240.10, holder: "ALEXANDER VANCE" },
    { id: "c-2", name: "Cloud & AI Virtual Float", pan: "4111 •••• •••• 9301", exp: "12/28", cvv: "810", type: "Virtual SaaS", isFrozen: false, limit: 10000, spent: 2745.90, holder: "APEX DEV OPS" }
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

  const formatMoney = (amount, curr = 'USD') => {
    const { symbol, rate } = CURRENCY_SYMBOLS[curr] || CURRENCY_SYMBOLS.USD;
    const converted = amount * rate;
    const absVal = Math.abs(converted);
    const isNegative = converted < 0;
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(absVal);
    return `${isNegative ? '-' : ''}${symbol}${formatted}`;
  };

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

  const netSavings = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? ((netSavings / monthlyIncome) * 100).toFixed(1) : 0;

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
      date: "Aug 26, 2026",
      time: "Just now",
      description: `Internal Vault Transfer: ${fromAcc?.name} → ${toAcc?.name}`,
      merchant: "Internal Liquidity Move",
      category: "Transfer",
      account: fromAcc?.name || "Primary Operating",
      amount: -amt,
      type: "expense",
      status: "Completed",
      icon: "ArrowRightLeft"
    };

    setTransactions([newTxn, ...transactions]);
    showToast(`Transferred ${formatMoney(amt, currency)} to ${toAcc?.name}!`);
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
          const newAvg = +(((exists.shares * exists.avg) + cost) / newShares).toFixed(2);
          const newValue = +(newShares * exists.price).toFixed(2);
          const newPnl = +(newValue - (newShares * newAvg)).toFixed(2);
          const newPnlPct = +((newPnl / (newShares * newAvg)) * 100).toFixed(2);
          return prev.map(h => h.symbol === symbol ? { ...h, shares: newShares, avg: newAvg, value: newValue, pnl: newPnl, pnlPct: newPnlPct } : h);
        }
        return prev;
      });
      showToast(`Executed BUY ${shares} ${symbol} for ${formatMoney(cost, currency)}!`);
    } else {
      setAccounts(prev => prev.map(a => a.id === 'acc-1' ? { ...a, balance: a.balance + cost } : a));
      setHoldings(prev => prev.map(h => {
        if (h.symbol === symbol) {
          const newShares = Math.max(0, h.shares - parseFloat(shares));
          const newValue = +(newShares * h.price).toFixed(2);
          const newPnl = +(newValue - (newShares * h.avg)).toFixed(2);
          const newPnlPct = newShares > 0 ? +((newPnl / (newShares * h.avg)) * 100).toFixed(2) : 0;
          return { ...h, shares: newShares, value: newValue, pnl: newPnl, pnlPct: newPnlPct };
        }
        return h;
      }));
      showToast(`Executed SELL ${shares} ${symbol} for ${formatMoney(cost, currency)}!`);
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
    const headers = ["Transaction ID", "Date", "Description", "Merchant", "Category", "Account", "Amount", "Type", "Status"];
    const rows = transactions.map(t => [
      t.id,
      t.date,
      `"${(t.description || t.desc || '').replace(/"/g, '""')}"`,
      `"${(t.merchant || '').replace(/"/g, '""')}"`,
      t.category,
      `"${t.account}"`,
      t.amount,
      t.type,
      t.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Apex_Transactions_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV ledger export generated and downloaded!");
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
        currency={currency}
        formatMoney={formatMoney}
        transactionsCount={transactions.length}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          currentView={currentView}
          selectedAccount={selectedAccount}
          accounts={accounts}
          currency={currency}
          setCurrency={setCurrency}
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
          showToast={showToast}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#11161F]/70 border border-[#1E2633] p-4 sm:p-5 rounded-2xl backdrop-blur-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Financial Treasury Overview</h1>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Real-time multi-entity cash flow, burn rate monitoring, and automated ledger settlements.
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
                        {acc.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18202C] hover:bg-[#202B3B] border border-[#1E2633] rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <span>Report</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <KpiCard
                  title="Total Treasury Balance"
                  value={formatMoney(totalBalance, currency)}
                  change="+12.8%"
                  changeType="positive"
                  subtitle="vs last month (+$16.5k)"
                  icon={<Wallet className="w-4 h-4 text-emerald-400" />}
                  sparkline={[122, 126, 124, 131, 138, 141, 145]}
                  sparklineColor="#10B981"
                />
                <KpiCard
                  title="Monthly Income / Inflow"
                  value={formatMoney(monthlyIncome, currency)}
                  change="+8.4%"
                  changeType="positive"
                  subtitle="Target: $25,000.00/mo"
                  icon={<ArrowDownLeft className="w-4 h-4 text-emerald-400" />}
                  sparkline={[21, 24, 22, 26, 25, 27, 28]}
                  sparklineColor="#10B981"
                />
                <KpiCard
                  title="Monthly Burn / Expenses"
                  value={formatMoney(monthlyExpenses, currency)}
                  change="-3.2%"
                  changeType="favorable"
                  subtitle="Envelope: $12,000.00 max"
                  icon={<ArrowUpRight className="w-4 h-4 text-rose-400" />}
                  sparkline={[11, 10.5, 9.8, 10.1, 9.6, 9.4, 9.1]}
                  sparklineColor="#F43F5E"
                />
                <KpiCard
                  title="Net Retained Capital"
                  value={formatMoney(netSavings, currency)}
                  change={`${savingsRate}%`}
                  changeType="positive"
                  subtitle="Healthy corporate runway"
                  icon={<PiggyBank className="w-4 h-4 text-blue-400" />}
                  sparkline={[9.8, 14, 13, 15.9, 15.8, 17.6, 19.3]}
                  sparklineColor="#3B82F6"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card rounded-2xl p-5 sm:p-6 border border-[#1E2633] flex flex-col justify-between shadow-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2633]/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-white">Cash Inflow vs. Operating Outflow</h3>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Surplus: +{formatMoney(netSavings, currency)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Historical revenue streams versus vendor and payroll expenditures.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[#0B0F14] p-1 rounded-lg border border-[#1E2633]">
                        <button
                          onClick={() => setChartType('area')}
                          className={`p-1.5 rounded-md text-xs transition-colors ${chartType === 'area' ? 'bg-[#1E2633] text-emerald-400' : 'text-slate-400'}`}
                          title="Area Trend"
                        >
                          <LineChart className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setChartType('bar')}
                          className={`p-1.5 rounded-md text-xs transition-colors ${chartType === 'bar' ? 'bg-[#1E2633] text-emerald-400' : 'text-slate-400'}`}
                          title="Bar Comparison"
                        >
                          <BarChart2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center bg-[#0B0F14] p-1 rounded-lg border border-[#1E2633] text-xs font-mono font-medium">
                        {["7D", "30D", "90D", "1Y"].map(period => (
                          <button
                            key={period}
                            onClick={() => setTimeRange(period)}
                            className={`px-2.5 py-1 rounded-md transition-all ${
                              timeRange === period
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

                  <div className="my-4 h-72 w-full relative">
                    <IncomeExpenseChart
                      period={timeRange}
                      type={chartType}
                      currency={currency}
                      data={CASH_FLOW_CHART_DATA[timeRange]?.map(d => ({
                        name: d.period,
                        income: d.income,
                        expenses: d.expenses
                      }))}
                    />
                  </div>

                  <div className="pt-4 border-t border-[#1E2633]/60 grid grid-cols-3 gap-3 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></div>
                      <div>
                        <p className="text-[10px] uppercase font-mono text-slate-400">Total Inflow ({timeRange})</p>
                        <p className="text-xs sm:text-sm font-mono font-bold text-slate-100">{formatMoney(monthlyIncome, currency)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <div className="h-3 w-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></div>
                      <div>
                        <p className="text-[10px] uppercase font-mono text-slate-400">Total Outflow ({timeRange})</p>
                        <p className="text-xs sm:text-sm font-mono font-bold text-slate-100">{formatMoney(monthlyExpenses, currency)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                      <div>
                        <p className="text-[10px] uppercase font-mono text-slate-400">Net Retained</p>
                        <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400">+{formatMoney(netSavings, currency)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[#1E2633] flex flex-col justify-between shadow-card">
                  <div className="pb-4 border-b border-[#1E2633]/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">Expense Allocation</h3>
                      <p className="text-xs text-slate-400">Aug 2026 breakdown</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-semibold">{formatMoney(monthlyExpenses, currency)}</span>
                  </div>

                  <div className="my-3 flex-1 flex items-center justify-center">
                    <CategoryBreakdown
                      categories={SPENDING_CATEGORIES}
                      currency={currency}
                      formatMoney={formatMoney}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FinancialOverview
                  savingsRate={savingsRate}
                  monthlyExpenses={monthlyExpenses}
                  currency={currency}
                  formatMoney={formatMoney}
                  recurringBills={RECURRING_SUBSCRIPTIONS}
                  onTransferClick={() => setIsTransferModalOpen(true)}
                  onAddTxnClick={() => setIsAddTxnModalOpen(true)}
                />

                <div className="lg:col-span-2">
                  <TransactionsTable
                    transactions={transactions}
                    currency={currency}
                    formatMoney={formatMoney}
                    onSelectTransaction={(txn) => setSelectedTxnForModal(txn)}
                    onExportCSV={handleExportCSV}
                    limit={7}
                  />
                </div>
              </div>
            </div>
          )}

          {currentView === 'transactions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11161F] border border-[#1E2633] p-5 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white">Audited Transactions Ledger</h2>
                  <p className="text-xs text-slate-400 mt-1">Multi-currency bank authorizations, merchant wires, and categorized expenses.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18202C] hover:bg-[#202B3B] border border-[#1E2633] text-xs font-semibold text-slate-200 transition-colors"
                  >
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
                currency={currency}
                formatMoney={formatMoney}
                onSelectTransaction={(txn) => setSelectedTxnForModal(txn)}
                onExportCSV={handleExportCSV}
                limit={0}
              />
            </div>
          )}

          {currentView === 'cards' && (
            <CardsView
              cards={cards}
              currency={currency}
              formatMoney={formatMoney}
              onToggleFreeze={handleToggleFreezeCard}
              showToast={showToast}
            />
          )}

          {currentView === 'analytics' && (
            <AnalyticsView
              currency={currency}
              monthlyIncome={monthlyIncome}
              monthlyExpenses={monthlyExpenses}
              netSavings={netSavings}
              savingsRate={savingsRate}
              transactions={transactions}
              formatMoney={formatMoney}
            />
          )}

          {currentView === 'investments' && (
            <InvestmentsView
              holdings={holdings}
              currency={currency}
              formatMoney={formatMoney}
              onOpenTradeModal={() => setIsTradeModalOpen(true)}
              showToast={showToast}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              currency={currency}
              setCurrency={setCurrency}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {isTransferModalOpen && (
        <TransferModal
          accounts={accounts}
          currency={currency}
          formatMoney={formatMoney}
          onClose={() => setIsTransferModalOpen(false)}
          onTransfer={handleTransfer}
        />
      )}

      {isAddTxnModalOpen && (
        <AddTransactionModal
          accounts={accounts}
          currency={currency}
          onClose={() => setIsAddTxnModalOpen(false)}
          onAdd={handleAddTransaction}
        />
      )}

      {isTradeModalOpen && (
        <TradeOrderModal
          holdings={holdings}
          accounts={accounts}
          currency={currency}
          formatMoney={formatMoney}
          onClose={() => setIsTradeModalOpen(false)}
          onTrade={handleTrade}
        />
      )}

      {selectedTxnForModal && (
        <TransactionDetailModal
          txn={selectedTxnForModal}
          currency={currency}
          formatMoney={formatMoney}
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
