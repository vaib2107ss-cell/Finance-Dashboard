import React, { useState } from 'react';

export default function SettingsView({ currency, setCurrency, showToast }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoReconcile, setAutoReconcile] = useState(true);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-[#11161F] border border-[#1E2633] p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-white">Organization & Treasury Settings</h2>
        <p className="text-xs text-slate-400 mt-1">Configure base currencies, security credentials, automated alerts, and API webhooks.</p>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-[#1E2633] space-y-6">
        <h3 className="text-sm font-bold text-white border-b border-[#1E2633] pb-3">Corporate Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Company Legal Entity</label>
            <input
              type="text"
              defaultValue="Apex Technologies Corporation"
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Principal Executive</label>
            <input
              type="text"
              defaultValue="Alexander Vance (VP Engineering)"
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Authorized Billing Email</label>
            <input
              type="email"
              defaultValue="alex.vance@apexcap.io"
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Global Base Currency</label>
            <select
              value={currency}
              onChange={(e) => { setCurrency(e.target.value); showToast(`Default currency changed to ${e.target.value}`); }}
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="USD">USD - United States Dollar ($)</option>
              <option value="EUR">EUR - Euro (€)</option>
              <option value="GBP">GBP - British Pound (£)</option>
              <option value="SGD">SGD - Singapore Dollar (S$)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-[#1E2633] space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-[#1E2633] pb-3">Security & Automated Safeguards</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
            <div>
              <p className="text-xs font-semibold text-white">Hardware Key / 2FA Enforcement</p>
              <p className="text-[11px] text-slate-400">Require YubiKey or TOTP for transfers exceeding $10,000.</p>
            </div>
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => { setTwoFactor(e.target.checked); showToast("Security policy updated"); }}
              className="h-4 w-4 accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
            <div>
              <p className="text-xs font-semibold text-white">Automated Real-time Bank Reconciliation</p>
              <p className="text-[11px] text-slate-400">Match Stripe merchant settlement batches with bank deposits every 6 hours.</p>
            </div>
            <input
              type="checkbox"
              checked={autoReconcile}
              onChange={(e) => { setAutoReconcile(e.target.checked); showToast("Reconciliation settings saved"); }}
              className="h-4 w-4 accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
            <div>
              <p className="text-xs font-semibold text-white">High-Velocity Spend SMS Alerts</p>
              <p className="text-[11px] text-slate-400">Instant push notice when single card authorization exceeds $2,500.</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => { setEmailAlerts(e.target.checked); showToast("Alert preference updated"); }}
              className="h-4 w-4 accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
