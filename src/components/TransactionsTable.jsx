import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, ArrowDownLeft, CreditCard } from 'lucide-react';

export default function TransactionsTable({
  transactions,
  currency,
  formatMoney,
  onSelectTransaction,
  onExportCSV,
  limit = 7,
  showPagination = false
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.desc.toLowerCase().includes(search.toLowerCase()) ||
                          t.merchant.toLowerCase().includes(search.toLowerCase()) ||
                          t.id.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || t.category === category;
      return matchSearch && matchCat;
    });
  }, [transactions, search, category]);

  const displayedList = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[#1E2633] flex flex-col justify-between shadow-card">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2633]/60">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Recent Transactions</h3>
            <p className="text-xs text-slate-400">Audited settlement ledger and card authorizations.</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search merchant, desc..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#0B0F14] border border-[#1E2633] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44 sm:w-52"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#0B0F14] border border-[#1E2633] text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Categories</option>
              <option value="Income">Income</option>
              <option value="Cloud & Tech">Cloud & Tech</option>
              <option value="Software & SaaS">Software & SaaS</option>
              <option value="Contractors & Payroll">Contractors</option>
              <option value="Marketing & Ads">Marketing</option>
              <option value="Travel & Dining">Travel</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E2633] text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3 font-semibold">Transaction & Merchant</th>
                <th className="py-3 px-3 font-semibold hidden md:table-cell">Account</th>
                <th className="py-3 px-3 font-semibold hidden sm:table-cell">Date</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Amount</th>
                <th className="py-3 px-2 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2633]/50 font-sans">
              {displayedList.map(txn => {
                const isIncome = txn.type === 'income';
                return (
                  <tr
                    key={txn.id}
                    onClick={() => onSelectTransaction(txn)}
                    className="hover:bg-[#161D29]/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isIncome ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800/80 text-slate-300 border border-slate-700'
                        }`}>
                          {isIncome ? <ArrowDownLeft className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-200 group-hover:text-white truncate max-w-[180px] sm:max-w-[240px]">
                            {txn.desc}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono truncate">{txn.merchant}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 hidden md:table-cell text-slate-400 font-mono text-[11px] truncate max-w-[140px]">
                      {txn.account}
                    </td>
                    <td className="py-3 px-3 hidden sm:table-cell text-slate-400 font-mono text-[11px]">
                      {txn.date}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                        txn.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        txn.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          txn.status === 'Completed' ? 'bg-emerald-400' :
                          txn.status === 'Pending' ? 'bg-amber-400' : 'bg-blue-400'
                        }`}></span>
                        {txn.status}
                      </span>
                    </td>
                    <td className={`py-3 px-3 text-right font-mono font-bold tabular-nums ${
                      isIncome ? 'text-emerald-400' : 'text-slate-200'
                    }`}>
                      {isIncome ? '+' : ''}{formatMoney(txn.amount, currency)}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectTransaction(txn); }}
                        className="p-1 rounded text-slate-500 hover:text-white hover:bg-[#1E2633] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {displayedList.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500 text-xs">
                    No transactions matched the active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-3 border-t border-[#1E2633]/60 flex items-center justify-between text-xs text-slate-400">
        <span>Showing top {displayedList.length} of {transactions.length} entries</span>
        {onExportCSV && (
          <button
            onClick={onExportCSV}
            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            Download CSV Report
          </button>
        )}
      </div>
    </div>
  );
}
