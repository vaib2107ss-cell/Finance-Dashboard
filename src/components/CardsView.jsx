import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Unlock, CreditCard, ShieldCheck } from 'lucide-react';

export default function CardsView({ cards, currency, formatMoney, onToggleFreeze, showToast }) {
  const [showCardNumber, setShowCardNumber] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11161F] border border-[#1E2633] p-5 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white">Commercial Card Fleet</h2>
          <p className="text-xs text-slate-400 mt-1">Multi-user physical & virtual corporate cards with configurable limit rules.</p>
        </div>
        <button
          onClick={() => setShowCardNumber(!showCardNumber)}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-[#18202C] hover:bg-[#202B3B] border border-[#1E2633] rounded-lg text-xs font-semibold text-slate-200 transition-colors"
        >
          {showCardNumber ? <EyeOff className="w-3.5 h-3.5 text-emerald-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{showCardNumber ? 'Hide Card Details' : 'Reveal Card Numbers'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(card => (
          <div key={card.id} className="space-y-4">
            {/* Card Graphic */}
            <div className={`p-6 rounded-2xl relative overflow-hidden transition-all duration-300 border ${
              card.isFrozen
                ? 'bg-[#0E131A] border-rose-500/30 opacity-60'
                : 'bg-gradient-to-br from-[#161F2E] to-[#0B0F14] border-slate-700 hover:border-slate-500 shadow-2xl shadow-black/80'
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                    ▲
                  </div>
                  <span className="font-bold text-sm text-white">APEX BLACK</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-[#0B0F14]/70 px-2 py-0.5 rounded border border-white/10">
                  {card.type}
                </span>
              </div>

              <div className="my-6">
                <p className="font-mono text-lg tracking-widest text-slate-100 font-bold">
                  {showCardNumber ? (card.id === 'c-1' ? '4829 9012 3456 7712' : '4111 8820 1923 9301') : card.pan}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-mono uppercase text-slate-400">Cardholder</p>
                  <p className="text-xs font-semibold font-mono text-white">{card.holder}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase text-slate-400">Expires</p>
                  <p className="text-xs font-mono text-slate-300">{card.exp}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase text-slate-400">CVV</p>
                  <p className="text-xs font-mono text-slate-300">{showCardNumber ? card.cvv : '•••'}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="glass-card rounded-2xl p-4 border border-[#1E2633] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Monthly Spending Limit</span>
                <span className="font-mono text-white font-bold">{formatMoney(card.spent, currency)} / {formatMoney(card.limit, currency)}</span>
              </div>
              <div className="h-1.5 w-full bg-[#1A2332] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(card.spent / card.limit) * 100}%` }}></div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onToggleFreeze(card.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                    card.isFrozen
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                  }`}
                >
                  {card.isFrozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{card.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}</span>
                </button>
                <button
                  onClick={() => showToast(`Spending limit adjusted for ${card.name}`)}
                  className="px-3 py-2 rounded-xl bg-[#161D29] hover:bg-[#1E2633] border border-[#1E2633] text-xs font-semibold text-slate-200"
                >
                  Edit Limit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
