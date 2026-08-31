# 💰 CASHXFLOW — Smart Multi-User Cash Flow & Financial Management Platform

<div align="center">

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**A modern, multi-user personal treasury and cash flow management platform designed with an Indian-fintech dark aesthetic (INR ₹).**

</div>

---

## 📖 Short Description

**CASHXFLOW** is an institutional-grade, multi-tenant financial management dashboard built for tracking income, managing living expenses, monitoring investments, and projecting savings runway in real time. 

Instead of static data, CASHXFLOW operates as a dynamic **multi-user application** where each authenticated user (e.g., **Vaibhav**, **Rahul**, or any newly registered user) gets their own isolated financial database, customizable bank accounts, automated CSV import processing, and contextual AI recommendations.

---

## 📊 Dashboard Architecture & Layout

```text
┌──────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ CASH FLOW (Income vs Expenses vs Net)│ │ SPENDING DISTRIBUTION               │
│ Inflow  ────────────────────         │ │       ◯  Bills: 28%  Food: 22%      │
│ Outflow - - - - - - - - - -          │ │          Shopping: 18%  SIP: 15%    │
│ Net     ····················         │ │          Travel: 10%    Other: 7%   │
│ Mar   Apr   May   Jun   Jul   Aug    │ │ Total Outflow: ₹28,400              │
└──────────────────────────────────────┘ └─────────────────────────────────────┘

┌──────────────────────────────────────┐ ┌─────────────────────────────────────┐
│ MONTHLY SPENDING TREND               │ │ FINANCIAL HEALTH SCORE              │
│ ₹40k ┤    ╭──╮                       │ │              88 / 100               │
│ ₹30k ┤───╯   ╰────╮                  │ │           HEALTHY STATUS            │
│ ₹20k ┤            ╰────              │ │ Savings Rate: 66%                   │
│ Jan   Feb   Mar   Apr   May   Jun    │ │ Cash Runway: 5.1 Months             │
└──────────────────────────────────────┘ └─────────────────────────────────────┘
```

---

## ✨ Key Features

### 1. 🔐 Multi-User Authentication & Data Isolation
- **Sign In / Sign Up System:** User accounts with password visibility toggle (👁️ eye button).
- **Preset User Profiles:** Instant switching between **User 1 (Vaibhav)** and **User 2 (Rahul)**, plus a **+ Add User** action.
- **Tenant Isolation:** Accounts, transactions, holdings, and metrics are isolated per `userId`.

### 2. 💳 Bank Accounts & Vault Management
- **Add Bank Accounts:** Add customizable accounts (Savings, Checking/Salary, Fixed Deposit, Credit Line, Demat) with live balance updates.
- **Multi-Bank Overview:** Track balances across multiple banks with one-click liquidity transfers.

### 3. 📈 3-Series Cash Flow & Real-Time Analytics
- **Inflow vs. Outflow vs. Net Cash:** Dynamic comparison across 6-month and 12-month periods.
- **Dynamic Category Grouping:** Real-time percentage breakdowns calculated from transaction records.
- **Financial Health Score (0–100):** Algorithm evaluating savings rate (`%`), liquidity runway (`months`), and debt ratio.

### 4. 📂 Bank CSV Bulk Import Engine
- **One-Click CSV Ingestion:** Drag-and-drop or select bank statements (`.csv`).
- **Instant Graph Recalculation:** Automatically parses transactions, updates KPI cards, category donuts, and cash flow charts.

### 5. 💹 Investment Portfolio & Rebalancing
- **Stock & ETF Holdings:** Track index funds, equities, mutual funds, and gold bonds.
- **Interactive Trade Order Modal:** Buy and sell positions with simulated cash debit/credit adjustments.

### 6. 🤖 Contextual AI Financial Copilot
- Natural language financial query engine analyzing the active user's transactions to identify high-spend categories, surplus margins, and optimization tips.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Tailwind CSS, Chart.js, Recharts, Lucide Icons
- **Backend:** Node.js, Express, JWT Authentication, CORS
- **Database Schema:** PostgreSQL / SQLite relational architecture (`server/schema.sql`)
- **Formatting:** Indian Numbering System (`en-IN`) with standard currency representation (`₹`)

---

## 🚀 Getting Started

### ⚡ Option 1: Instant Browser Launch (Zero Setup)
Open the application directly in any browser:
```powershell
Start-Process "index.html"
```

### 💻 Option 2: Run with Node.js & Vite
```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev

# 3. Start the Express backend API (optional)
node server/server.js
```

---

## 📁 Repository Structure

```text
finance-dashboard/
├── index.html                  # Standalone zero-setup multi-user web application
├── sample_transactions.csv     # Sample CSV dataset for testing import
├── package.json                # Project dependencies and build scripts
├── tailwind.config.js          # Dark fintech theme definitions
├── server/
│   ├── server.js               # Express REST API & JWT authentication backend
│   └── schema.sql              # Relational database schema (PostgreSQL/SQLite)
└── src/
    ├── App.jsx                 # Root React multi-user application component
    ├── data/
    │   └── mockData.js         # Initial mock financial records
    └── components/             # Reusable UI cards, charts, and modal components
```

---

## 📄 License
This project is open-source and available under the **MIT License**.
