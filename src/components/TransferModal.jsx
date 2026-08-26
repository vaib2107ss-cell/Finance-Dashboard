import React, { useState } from 'react';
import { ArrowRightLeft, X } from 'lucide-react';

export default function TransferModal({ accounts, currency, formatMoney, onClose, onTransfer }) {
  const [fromId, setFromId] = useState(accounts[0]?.id || '');
  const [toId, setToId] = useState(accounts[1]?.id || '');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromId === toId) {
      alert("Source and destination accounts must be different.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid transfer amount.");
      return;
    }
    onTransfer({ fromId, toId, amount, note });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#11161F] border border-[#1E2633] rounded-2xl shadow-modal overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[#1E2633]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Internal Vault Transfer</h3>
              <p className="text-[11px] text-slate-400">Zero fee instant treasury liquidity move</p>
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
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Source Account (From)</label>
            <select
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            >
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} — Balance: {formatMoney(acc.balance, currency)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Destination Vault (To)</label>
            <select
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            >
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id} disabled={acc.id === fromId}>
                  {acc.name} — Balance: {formatMoney(acc.balance, currency)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Transfer Amount ({currency})</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl pl-8 pr-4 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Transfer Memo</label>
            <input
              type="text"
              placeholder="e.g. Yield rebalance or reserve top-up"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
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
              Confirm Instant Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
