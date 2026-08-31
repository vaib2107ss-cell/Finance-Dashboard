// CASHXFLOW — Indian Fintech Dataset (INR ₹)

export const USER_PROFILE = {
  name: "Vaibhav",
  fullName: "Vaibhav Sharma",
  email: "vaibhav@cashxflow.io",
  role: "Principal Tech Lead / Founder",
  organization: "CASHXFLOW Technologies India",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  tier: "Super Priority Wealth",
  unreadNotificationsCount: 3,
  location: "Bengaluru, India"
};

export const ACCOUNTS_DATA = [
  {
    id: "acc-1",
    name: "HDFC Salary & Primary",
    institution: "HDFC Bank Ltd",
    type: "Checking / Salary",
    accountNumber: "•••• 8924",
    balance: 385420.50,
    currency: "INR",
    changeMoM: 12.8,
    isDefault: true,
    color: "#10B981",
    badge: "Primary"
  },
  {
    id: "acc-2",
    name: "ICICI Multi-Option Deposit (7.1% APY)",
    institution: "ICICI Bank Ltd",
    type: "Sweep Deposit",
    accountNumber: "•••• 4109",
    balance: 650000.00,
    currency: "INR",
    changeMoM: 7.1,
    isDefault: false,
    color: "#3B82F6",
    badge: "Yield"
  },
  {
    id: "acc-3",
    name: "Zerodha Trading & Demat Float",
    institution: "Zerodha Broking Ltd",
    type: "Investment Pool",
    accountNumber: "•••• 3371",
    balance: 214500.00,
    currency: "INR",
    changeMoM: 14.5,
    isDefault: false,
    color: "#8B5CF6",
    badge: "Demat"
  },
  {
    id: "acc-4",
    name: "SBI Fixed Deposit Vault (7.25% p.a.)",
    institution: "State Bank of India",
    type: "Fixed Deposit",
    accountNumber: "•••• 9120",
    balance: 480000.00,
    currency: "INR",
    changeMoM: 7.25,
    isDefault: false,
    color: "#F59E0B",
    badge: "FD"
  },
  {
    id: "acc-5",
    name: "Axis Bank Magnus Black Card",
    institution: "Axis Bank Cards",
    type: "Credit / Charge",
    accountNumber: "•••• 7712",
    balance: -42300.00,
    limit: 500000.00,
    currency: "INR",
    changeMoM: -4.2,
    isDefault: false,
    color: "#EC4899",
    badge: "Magnus"
  }
];

export const KPI_METRICS = {
  netWorth: {
    value: 4850000.00,
    formatted: "₹48,50,000.00",
    compact: "₹48.50 Lakh",
    changePercentage: 14.2,
    isPositive: true,
    comparisonText: "↑ 14.2% vs last month (+₹6,02,400)",
    sparkline: [3850000, 4020000, 4180000, 4390000, 4520000, 4710000, 4850000]
  },
  totalBalance: {
    value: 1687620.50,
    formatted: "₹16,87,620.50",
    compact: "₹16.88 Lakh",
    changePercentage: 8.6,
    isPositive: true,
    comparisonText: "↑ 8.6% vs last month (+₹1,33,800)",
    sparkline: [1350000, 1420000, 1380000, 1490000, 1540000, 1610000, 1687620]
  },
  monthlyIncome: {
    value: 285000.00,
    formatted: "₹2,85,000.00",
    compact: "₹2.85 Lakh",
    changePercentage: 12.4,
    isPositive: true,
    comparisonText: "↑ 12.4% vs last month (+₹31,500)",
    sparkline: [240000, 245000, 260000, 255000, 270000, 278000, 285000]
  },
  monthlyExpenses: {
    value: 95400.00,
    formatted: "₹95,400.00",
    compact: "₹95.4k",
    changePercentage: -4.2,
    isPositive: true, // Dropping expenses is favorable/positive
    comparisonText: "↓ 4.2% vs last month (-₹4,180 Favorable)",
    sparkline: [110000, 105000, 118000, 98000, 102000, 99500, 95400]
  },
  netCashFlow: {
    value: 189600.00,
    formatted: "+₹1,89,600.00",
    compact: "+₹1.90 Lakh",
    savingsRate: 66.5,
    changePercentage: 18.2,
    isPositive: true,
    comparisonText: "↑ 18.2% surplus (66.5% savings rate)",
    sparkline: [130000, 140000, 142000, 157000, 168000, 178500, 189600]
  }
};

export const MONEY_DISTRIBUTION = [
  { name: "Direct Equity & MFs", amount: 2450000.00, percentage: 50.5, color: "#3B82F6", icon: "TrendingUp" },
  { name: "Savings & Liquid Cash", amount: 1250000.00, percentage: 25.8, color: "#10B981", icon: "Wallet" },
  { name: "Fixed Deposits (FD)", amount: 480000.00, percentage: 9.9, color: "#F59E0B", icon: "Lock" },
  { name: "Gold Bonds (SGB)", amount: 420000.00, percentage: 8.7, color: "#EC4899", icon: "Coins" },
  { name: "Digital Assets / Other", amount: 250000.00, percentage: 5.1, color: "#8B5CF6", icon: "Cpu" }
];

export const CASH_FLOW_HISTORY = [
  { month: "Jan", income: 240000, expenses: 110000, net: 130000 },
  { month: "Feb", income: 245000, expenses: 105000, net: 140000 },
  { month: "Mar", income: 260000, expenses: 118000, net: 142000 },
  { month: "Apr", income: 255000, expenses: 98000, net: 157000 },
  { month: "May", income: 270000, expenses: 102000, net: 168000 },
  { month: "Jun", income: 265000, expenses: 94000, net: 171000 },
  { month: "Jul", income: 278000, expenses: 99500, net: 178500 },
  { month: "Aug", income: 285000, expenses: 95400, net: 189600 }
];

export const SPENDING_CATEGORIES = [
  { id: "cat-bills", name: "Bills & Utilities", amount: 22896.00, percentage: 24.0, color: "#3B82F6", icon: "Zap", budget: 25000, variance: -8.4 },
  { id: "cat-food", name: "Food & Groceries", amount: 17172.00, percentage: 18.0, color: "#10B981", icon: "Utensils", budget: 20000, variance: -14.1 },
  { id: "cat-shopping", name: "Shopping & Lifestyle", amount: 15264.00, percentage: 16.0, color: "#8B5CF6", icon: "ShoppingBag", budget: 18000, variance: -15.2 },
  { id: "cat-invest", name: "Investments (SIPs)", amount: 14310.00, percentage: 15.0, color: "#06B6D4", icon: "TrendingUp", budget: 15000, variance: -4.6 },
  { id: "cat-travel", name: "Travel & Fuel", amount: 11448.00, percentage: 12.0, color: "#F59E0B", icon: "Plane", budget: 15000, variance: -23.7 },
  { id: "cat-ent", name: "Entertainment & Subs", amount: 7632.00, percentage: 8.0, color: "#EC4899", icon: "Film", budget: 10000, variance: -23.7 },
  { id: "cat-other", name: "Other & Health", amount: 6678.00, percentage: 7.0, color: "#64748B", icon: "Layers", budget: 8000, variance: -16.5 }
];

export const FINANCIAL_HEALTH_METRICS = {
  score: 87,
  status: "HEALTHY",
  statusBadge: "Top 5% Tier",
  savingsRate: 66.5,
  cashRunway: "17.6 Months",
  investmentReturn: "+14.8% p.a.",
  debtToIncome: "14.8%",
  emergencyFundStatus: "100% Fully Funded (₹12.5L)",
  breakdown: [
    { label: "Savings Rate", score: "94/100", note: "66.5% vs 30% benchmark", status: "Optimal" },
    { label: "Emergency Runway", score: "92/100", note: "17.6 months burn covered", status: "Strong" },
    { label: "Debt & EMI Ratio", score: "88/100", note: "EMIs 14.8% of monthly income", status: "Safe" },
    { label: "Asset Diversification", score: "84/100", note: "Balanced equity, FD & gold", status: "Good" }
  ]
};

export const FINANCIAL_INSIGHTS = [
  {
    type: "positive",
    title: "Monthly Expenses Reduced by 4.2%",
    description: "You spent ₹4,100 less compared to July. Food and travel expenses saw the highest drop.",
    icon: "TrendingDown",
    badge: "Efficiency"
  },
  {
    type: "info",
    title: "Investments Represent 50.5% of Total Assets",
    description: "Equity & Mutual Fund portfolios reached ₹24.50 Lakh, generating ₹32,400 unrealized returns this month.",
    icon: "PieChart",
    badge: "Portfolio"
  },
  {
    type: "alert",
    title: "Shopping Envelope at 84% Capacity",
    description: "You spent ₹15,264 out of your ₹18,000 shopping budget with 5 days remaining in August.",
    icon: "AlertTriangle",
    badge: "Budget Warning"
  }
];

export const AI_SMART_RECOMMENDATIONS = [
  {
    id: "rec-1",
    action: "Move ₹50,000 to Sweep FD",
    impact: "Earn +₹3,550/year in interest",
    reason: "Your primary checking balance (₹3.85L) exceeds your monthly liquidity requirement (₹1.5L).",
    tag: "High Yield"
  },
  {
    id: "rec-2",
    action: "Switch 2 Inactive Cloud Seats",
    impact: "Save ₹3,200/month",
    reason: "AWS & GCP dev instances have 0% utilization over the last 14 days.",
    tag: "Cost Saving"
  },
  {
    id: "rec-3",
    action: "Step-Up Nifty 50 SIP by 10%",
    impact: "Accelerate ₹1 Cr Goal by 1.8 years",
    reason: "Your monthly surplus (+₹1.89L) easily supports an additional ₹10,000 monthly SIP index allocation.",
    tag: "Wealth Growth"
  }
];

export const UPCOMING_PAYMENTS = [
  {
    id: "pay-1",
    name: "HDFC Home Loan EMI",
    vendor: "HDFC Limited Housing Finance",
    amount: 38500.00,
    due: "Sep 05, 2026",
    daysLeft: 5,
    category: "EMI",
    account: "HDFC Salary & Primary",
    autoDebit: true
  },
  {
    id: "pay-2",
    name: "Zerodha Monthly Nifty 50 SIP",
    vendor: "Nippon India Mutual Fund",
    amount: 25000.00,
    due: "Sep 01, 2026",
    daysLeft: 1,
    category: "SIP Investment",
    account: "HDFC Salary & Primary",
    autoDebit: true
  },
  {
    id: "pay-3",
    name: "Tata Nexon EV Auto Loan EMI",
    vendor: "Tata Motors Finance",
    amount: 14200.00,
    due: "Sep 10, 2026",
    daysLeft: 10,
    category: "EMI",
    account: "HDFC Salary & Primary",
    autoDebit: true
  },
  {
    id: "pay-4",
    name: "Tata Power Mumbai Electricity",
    vendor: "Tata Power Company Ltd",
    amount: 3450.00,
    due: "Sep 04, 2026",
    daysLeft: 4,
    category: "Utility Bill",
    account: "Axis Bank Magnus Black",
    autoDebit: true
  },
  {
    id: "pay-5",
    name: "AWS Cloud Infrastructure",
    vendor: "Amazon Web Services India",
    amount: 1840.00,
    due: "Sep 01, 2026",
    daysLeft: 1,
    category: "Cloud Hosting",
    account: "Axis Bank Magnus Black",
    autoDebit: true
  },
  {
    id: "pay-6",
    name: "JioFiber 1Gbps Broadband",
    vendor: "Reliance Jio Infocomm",
    amount: 1499.00,
    due: "Sep 08, 2026",
    daysLeft: 8,
    category: "Broadband",
    account: "Axis Bank Magnus Black",
    autoDebit: true
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-9082",
    date: "Aug 31, 2026",
    time: "14:15 IST",
    desc: "Client Architecture Milestone Retainer",
    merchant: "FinEdge Intelligence Bengaluru",
    category: "Income",
    account: "HDFC Salary & Primary",
    amount: 145000.00,
    type: "income",
    status: "Completed",
    icon: "ShieldCheck",
    authCode: "NEFT-IN8829104"
  },
  {
    id: "TXN-9081",
    date: "Aug 28, 2026",
    time: "10:30 IST",
    desc: "Monthly Client Tech Advisory Remittance",
    merchant: "Nexus Capital Mumbai",
    category: "Income",
    account: "HDFC Salary & Primary",
    amount: 140000.00,
    type: "income",
    status: "Completed",
    icon: "CheckCircle",
    authCode: "RTGS-NX99210"
  },
  {
    id: "TXN-9080",
    date: "Aug 26, 2026",
    time: "19:40 IST",
    desc: "D-Mart Supermarket Monthly Groceries",
    merchant: "Avenue Supermarts D-Mart",
    category: "Food & Groceries",
    account: "Axis Bank Magnus Black",
    amount: -8420.00,
    type: "expense",
    status: "Completed",
    icon: "ShoppingBag",
    authCode: "POS-DM4491"
  },
  {
    id: "TXN-9079",
    date: "Aug 25, 2026",
    time: "09:15 IST",
    desc: "AWS Cloud Server Cluster Invoicing",
    merchant: "Amazon Web Services India",
    category: "Bills & Utilities",
    account: "Axis Bank Magnus Black",
    amount: -1840.00,
    type: "expense",
    status: "Completed",
    icon: "Cloud",
    authCode: "PG-AWS2209"
  },
  {
    id: "TXN-9078",
    date: "Aug 24, 2026",
    time: "18:22 IST",
    desc: "OpenAI Platform API Developer Compute",
    merchant: "OpenAI LLC API",
    category: "Bills & Utilities",
    account: "Axis Bank Magnus Black",
    amount: -5120.00,
    type: "expense",
    status: "Completed",
    icon: "Cpu",
    authCode: "PG-OAI771"
  },
  {
    id: "TXN-9077",
    date: "Aug 22, 2026",
    time: "00:01 IST",
    desc: "ICICI Sweep Deposit Monthly Interest",
    merchant: "ICICI Bank Ltd Interest Batch",
    category: "Income",
    account: "ICICI Multi-Option Deposit",
    amount: 3840.00,
    type: "income",
    status: "Completed",
    icon: "Coins",
    authCode: "SYS-INT091"
  },
  {
    id: "TXN-9076",
    date: "Aug 20, 2026",
    time: "16:45 IST",
    desc: "Zerodha Automated Index SIP (Nifty 50)",
    merchant: "Nippon Life India AMC",
    category: "Investments (SIPs)",
    account: "HDFC Salary & Primary",
    amount: -14310.00,
    type: "expense",
    status: "Completed",
    icon: "TrendingUp",
    authCode: "ACH-ZD8812"
  },
  {
    id: "TXN-9075",
    date: "Aug 19, 2026",
    time: "20:30 IST",
    desc: "Indiranagar Weekend Dining & Swiggy Gourmet",
    merchant: "Toit Brewpub & Swiggy",
    category: "Food & Groceries",
    account: "Axis Bank Magnus Black",
    amount: -4750.00,
    type: "expense",
    status: "Completed",
    icon: "Utensils",
    authCode: "UPI-SWG991"
  },
  {
    id: "TXN-9074",
    date: "Aug 18, 2026",
    time: "15:10 IST",
    desc: "Indigo Flight Tickets - BLR to BOM Summit",
    merchant: "InterGlobe Aviation IndiGo",
    category: "Travel & Fuel",
    account: "Axis Bank Magnus Black",
    amount: -6890.00,
    type: "expense",
    status: "Completed",
    icon: "Plane",
    authCode: "PG-IND771"
  },
  {
    id: "TXN-9073",
    date: "Aug 15, 2026",
    time: "12:00 IST",
    desc: "Apple Store Mumbai BKC - Accessories",
    merchant: "Apple India Retail BKC",
    category: "Shopping & Lifestyle",
    account: "Axis Bank Magnus Black",
    amount: -9800.00,
    type: "expense",
    status: "Completed",
    icon: "ShoppingBag",
    authCode: "POS-APL882"
  },
  {
    id: "TXN-9072",
    date: "Aug 12, 2026",
    time: "11:00 IST",
    desc: "Contract Backend Optimization Payout",
    merchant: "DevSquad Studios Bengaluru",
    category: "Bills & Utilities",
    account: "HDFC Salary & Primary",
    amount: -15000.00,
    type: "expense",
    status: "Completed",
    icon: "Users",
    authCode: "IMPS-DS9910"
  },
  {
    id: "TXN-9071",
    date: "Aug 10, 2026",
    time: "14:30 IST",
    desc: "Tata Power & Torrent Energy Bills",
    merchant: "Tata Power Utility",
    category: "Bills & Utilities",
    account: "HDFC Salary & Primary",
    amount: -3450.00,
    type: "expense",
    status: "Completed",
    icon: "Zap",
    authCode: "BBPS-TP3319"
  }
];

export const INVESTMENTS_PORTFOLIO = {
  totalValue: 3140000.00,
  formatted: "₹31,40,000.00",
  compact: "₹31.40 Lakh",
  allTimeReturn: 412500.00,
  allTimeReturnPct: 15.12,
  dailyChange: 18450.00,
  dailyChangePct: 0.59,
  allocations: [
    { label: "Nifty 50 & Bluechip Index", percentage: 42, value: 1318800.00, color: "#3B82F6" },
    { label: "Flexi-Cap Mutual Funds", percentage: 28, value: 879200.00, color: "#10B981" },
    { label: "Sovereign Gold Bonds (SGB)", percentage: 18, value: 565200.00, color: "#F59E0B" },
    { label: "Digital Assets (BTC/ETH)", percentage: 12, value: 376800.00, color: "#8B5CF6" }
  ],
  holdings: [
    {
      symbol: "NIFTYBEES",
      name: "Nippon India Nifty 50 ETF",
      shares: 1850,
      avgCost: 242.10,
      currentPrice: 282.40,
      totalValue: 522440.00,
      gainLoss: 74555.00,
      gainLossPct: 16.65,
      isPositive: true,
      type: "ETF"
    },
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Limited",
      shares: 140,
      avgCost: 2650.00,
      currentPrice: 2980.00,
      totalValue: 417200.00,
      gainLoss: 46200.00,
      gainLossPct: 12.45,
      isPositive: true,
      type: "Equity"
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      shares: 250,
      avgCost: 1440.00,
      currentPrice: 1845.50,
      totalValue: 461375.00,
      gainLoss: 101375.00,
      gainLossPct: 28.16,
      isPositive: true,
      type: "Equity"
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Limited",
      shares: 220,
      avgCost: 1520.00,
      currentPrice: 1648.00,
      totalValue: 362560.00,
      gainLoss: 28160.00,
      gainLossPct: 8.42,
      isPositive: true,
      type: "Equity"
    },
    {
      symbol: "SGB-2029",
      name: "Sovereign Gold Bonds 2029",
      shares: 60,
      avgCost: 5600.00,
      currentPrice: 7250.00,
      totalValue: 435000.00,
      gainLoss: 99000.00,
      gainLossPct: 29.46,
      isPositive: true,
      type: "Gold Bond"
    },
    {
      symbol: "PPFAS-FLEXI",
      name: "Parag Parikh Flexi Cap Fund",
      shares: 9800,
      avgCost: 54.20,
      currentPrice: 68.90,
      totalValue: 675220.00,
      gainLoss: 144060.00,
      gainLossPct: 27.12,
      isPositive: true,
      type: "Mutual Fund"
    },
    {
      symbol: "BTC",
      name: "Bitcoin (Cold Storage)",
      shares: 0.05,
      avgCost: 4800000.00,
      currentPrice: 5420000.00,
      totalValue: 271000.00,
      gainLoss: 31000.00,
      gainLossPct: 12.92,
      isPositive: true,
      type: "Crypto"
    }
  ]
};

export const NOTIFICATIONS_DATA = [
  {
    id: "notif-1",
    title: "Client Retainer Credited",
    message: "₹1,45,000.00 from FinEdge Intelligence settled in HDFC Salary Account.",
    time: "15 mins ago",
    type: "success",
    read: false
  },
  {
    id: "notif-2",
    title: "ICICI Sweep Interest Credited",
    message: "₹3,840.00 monthly deposit interest added to Multi-Option Deposit.",
    time: "2 hours ago",
    type: "info",
    read: false
  },
  {
    id: "notif-3",
    title: "Shopping Budget Alert",
    message: "Shopping expenditure reached 84% of your ₹18,000 monthly limit.",
    time: "1 day ago",
    type: "warning",
    read: false
  },
  {
    id: "notif-4",
    title: "HDFC Home Loan EMI Upcoming",
    message: "₹38,500 due on Sep 05 via Auto-Debit ECS.",
    time: "2 days ago",
    type: "neutral",
    read: true
  }
];
