import React from 'react';
import { X, FileText } from 'lucide-react';

export default function TransactionDetailModal({ txn, currency, formatMoney, onClose, showToast }) {
  const isIncome = txn.type === 'income';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#11161F] border border-[#1E2633] rounded-2xl shadow-modal overflow-hidden">
        <div className="p-5 border-b border-[#1E2633] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              {txn.id}
            </span>
            <span className="text-xs font-bold text-white">Audited Settlement Record</span>
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2633]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="text-center py-3 bg-[#0B0F14] rounded-2xl border border-[#1E2633]">
            <span className="text-[10px] font-mono uppercase text-slate-400">Total Cleared Value</span>
            <h3 className={`text-3xl font-mono font-extrabold mt-1 ${isIncome ? 'text-emerald-400' : 'text-slate-100'}`}>
              {isIncome ? '+' : ''}{formatMoney(txn.amount, currency)}
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-2 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Reconciled & Cleared
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[#1E2633]/60">
              <span className="text-slate-400">Description</span>
              <span className="font-semibold text-slate-200 text-right">{txn.desc || txn.description}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1E2633]/60">
              <span className="text-slate-400">Counterparty Merchant</span>
              <span className="font-mono text-slate-200">{txn.merchant}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1E2633]/60">
              <span className="text-slate-400">Category Tag</span>
              <span className="text-slate-200">{txn.category}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1E2633]/60">
              <span className="text-slate-400">Treasury Account</span>
              <span className="font-mono text-slate-200">{txn.account}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1E2633]/60">
              <span className="text-slate-400">Clearing Timestamp</span>
              <span className="font-mono text-slate-400">{txn.date} 14:22:59 UTC</span>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                showToast(`Receipt PDF for ${txn.id} downloaded.`);
                onClose();
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#18202C] hover:bg-[#202B3B] text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 border border-[#1E2633]"
            >
              <FileText className="w-3.5 h-3.5" />
              Download Receipt
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
