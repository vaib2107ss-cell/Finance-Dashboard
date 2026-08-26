import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function AddTransactionModal({ accounts, currency, onClose, onAdd }) {
  const [desc, setDesc] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('Cloud & Tech');
  const [account, setAccount] = useState(accounts[0]?.name || 'Primary Treasury');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // expense | income

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;

    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Aug 26, 2026",
      time: "Just now",
      desc: desc || (type === 'income' ? 'Client Remittance' : 'Operating Expense'),
      merchant: merchant || 'Apex Verified Counterparty',
      category: type === 'income' ? 'Income' : category,
      account: account,
      amount: type === 'income' ? amt : -amt,
      type: type,
      status: "Completed",
      icon: type === 'income' ? 'ArrowDownLeft' : 'CreditCard',
      fee: 0
    };

    onAdd(newTxn);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#11161F] border border-[#1E2633] rounded-2xl shadow-modal overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[#1E2633]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Record New Transaction</h3>
              <p className="text-[11px] text-slate-400">Direct manual ledger entry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2633]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#0B0F14] rounded-xl border border-[#1E2633]">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                type === 'expense' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-slate-400'
              }`}
            >
              Operating Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
              }`}
            >
              Revenue Inflow
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Description</label>
            <input
              type="text"
              placeholder="e.g. OpenAI Compute API or Client Retainer"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Merchant / Entity</label>
              <input
                type="text"
                placeholder="e.g. AWS, Stripe"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Amount ({currency})</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={type === 'income'}
                className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Cloud & Tech">Cloud & Tech</option>
                <option value="Software & SaaS">Software & SaaS</option>
                <option value="Contractors & Payroll">Contractors & Payroll</option>
                <option value="Marketing & Ads">Marketing & Ads</option>
                <option value="Travel & Dining">Travel & Dining</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Charged Account</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.name}>{acc.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1E2633] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#18202C] hover:bg-[#202B3B] text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-950/40"
            >
              Add to Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
