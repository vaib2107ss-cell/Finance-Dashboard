import React, { useState } from 'react';
import {
  ShieldCheck,
  Bell,
  Lock,
  User,
  Building,
  Key
} from 'lucide-react';

export default function SettingsView({ showToast }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoReconcile, setAutoReconcile] = useState(true);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-[#11161F] border border-[#1E2633] p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-white">CASHXFLOW Settings & Preferences</h2>
        <p className="text-xs text-slate-400 mt-1">Configure Indian bank sync feeds, security credentials, automated alerts, and API webhooks.</p>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-[#1E2633] space-y-6">
        <h3 className="text-sm font-bold text-white border-b border-[#1E2633] pb-3">User Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="Vaibhav Sharma"
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">GitHub Account</label>
            <input
              type="text"
              defaultValue="vaib2107ss-cell"
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Registered Email</label>
            <input
              type="email"
              defaultValue="vaibhav@cashxflow.io"
              className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Default Base Currency</label>
            <input
              type="text"
              disabled
              defaultValue="INR (₹) — Indian Rupee"
              className="w-full bg-[#0B0F14]/60 border border-[#1E2633] rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-[#1E2633] space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-[#1E2633] pb-3">Security & Banking Safeguards</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F14] border border-[#1E2633]">
            <div>
              <p className="text-xs font-semibold text-white">Biometric & 2FA Enforcement</p>
              <p className="text-[11px] text-slate-400">Require OTP or biometric authentication for transfers exceeding ₹50,000.</p>
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
              <p className="text-xs font-semibold text-white">Automated UPI & Bank Reconciliation</p>
              <p className="text-[11px] text-slate-400">Match incoming NEFT/IMPS settlements with bank ledger feeds automatically.</p>
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
              <p className="text-xs font-semibold text-white">High-Spend WhatsApp & SMS Alerts</p>
              <p className="text-[11px] text-slate-400">Instant notice when a single card authorization exceeds ₹10,000.</p>
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
