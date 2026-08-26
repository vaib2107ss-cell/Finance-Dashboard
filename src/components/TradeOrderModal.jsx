import React, { useState } from 'react';
import { TrendingUp, X } from 'lucide-react';

export default function TradeOrderModal({ holdings, accounts, currency, formatMoney, onClose, onTrade }) {
  const [symbol, setSymbol] = useState(holdings[0]?.symbol || 'NVDA');
  const [action, setAction] = useState('BUY');
  const [shares, setShares] = useState('10');

  const selectedAsset = holdings.find(h => h.symbol === symbol) || holdings[0];
  const estimatedTotal = (parseFloat(shares) || 0) * (selectedAsset?.price || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shares || parseFloat(shares) <= 0) return;
    onTrade({ symbol, action, shares, price: selectedAsset.price, total: estimatedTotal });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#11161F] border border-[#1E2633] rounded-2xl shadow-modal overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[#1E2633]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Institutional Execution Order</h3>
              <p className="text-[11px] text-slate-400">Smart routing order book settlement</p>
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
              onClick={() => setAction('BUY')}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                action === 'BUY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
              }`}
            >
              Buy Asset
            </button>
            <button
              type="button"
              onClick={() => setAction('SELL')}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                action === 'SELL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-slate-400'
              }`}
            >
              Sell / Liquidate
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Select Portfolio Asset</label>
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            >
              {holdings.map(h => (
                <option key={h.symbol} value={h.symbol}>
                  {h.symbol} — {h.name} (${h.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Shares / Quantity</label>
              <input
                type="number"
                step="any"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                required
                className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Limit Price</label>
              <input
                type="text"
                disabled
                value={`$${selectedAsset?.price?.toFixed(2)}`}
                className="w-full bg-[#0B0F14]/60 border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-slate-400 font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-[#0B0F14] rounded-xl border border-[#1E2633] flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Estimated Order Value:</span>
            <span className="font-mono font-extrabold text-white text-sm">
              {formatMoney(estimatedTotal, currency)}
            </span>
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
              className={`px-4 py-2 rounded-xl text-slate-950 font-bold text-xs shadow-md ${
                action === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-rose-500 hover:bg-rose-400 text-white'
              }`}
            >
              Confirm {action} Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
