# Apex Finance — Institutional Dark Finance Dashboard

A production-grade, dark-first institutional finance dashboard web app built with a modern fintech aesthetic (near-black `#0B0F14` background, subtle glassmorphic surfaces, tabular monospace metrics, and emerald accents).

## 🚀 Instant Launch (Zero Installation Required)

You can open the dashboard immediately in any browser with **zero installation**:

1. Double-click or open `index.html` in your favorite web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari, etc.).
2. Or in PowerShell, run:
   ```powershell
   Start-Process "C:\Users\Lenovo\.gemini\antigravity\scratch\finance-dashboard\index.html"
   ```

---

## ✨ Features & Architecture

### 1. Dashboard View (Overview)
- **Top Summary KPIs**: Total Treasury Balance (`$145,680.35`), Monthly Inflow (`$28,450.00`), Monthly Burn (`$9,140.20`), and Net Retained Capital (`$19,309.80` with 67.8% savings rate) — each featuring live trend sparklines and MoM comparisons.
- **Interactive Cash Flow Chart**: Switchable between **Area Trend** and **Bar Comparison**, supporting **7D**, **30D**, **90D**, and **1Y** timeframes with custom fintech tooltips.
- **Spending Breakdown Donut**: Category allocation with interactive hovers and budget progress tracking.
- **Recent Transactions Ledger**: Filterable by category, keyword search, account filtering, and click-to-view detailed transaction audit modal.
- **Financial Health & Runway**: Savings target gauge, monthly budget envelope, and upcoming recurring vendor subscriptions.

### 2. Transactions View
- Complete ledger view with tabs (**All**, **Inflows**, **Outflows**, **Pending**).
- Real-time search, category dropdown, and one-click **CSV Export** downloading a live-generated `.csv` ledger.

### 3. Analytics View
- Cash flow burn rate, zero-revenue runway (16.2 months), capital efficiency scoring (94.8/100), and MoM vendor cost optimization breakdown.

### 4. Investments View
- Live portfolio valuation (`$342,180.00`), asset allocation breakdown, and interactive holdings table (NVIDIA, Microsoft, S&P 500 ETF, Bitcoin, US T-Bills, Staked Ethereum).

### 5. Settings & Controls
- Base currency switcher (**USD $**, **EUR €**, **GBP £**, **SGD S$**) dynamically formatting all values across all views.
- Security controls (2FA enforcement, automated reconciliation, high-velocity spend alerts).

### 6. Interactive Modals & Command Palette
- **Transfer Money**: Move liquidity between accounts with immediate balance recalculations.
- **Record Transaction**: Add income or operating expenses directly to the stateful ledger.
- **Command Palette (`Ctrl+K` / `⌘K`)**: Quick fuzzy navigation and action shortcuts.
- **Notifications Center**: Slide-out popover with unread counter and mark-as-read.

---

## 🛠️ Tech Stack
- **React 18**
- **Tailwind CSS** (Dark-first fintech theme, glassmorphic blur, custom shadows)
- **Chart.js & Recharts**
- **Lucide Icons**
- **Plus Jakarta Sans & JetBrains Mono** typography
