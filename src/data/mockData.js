// Mock financial dataset for Apex Finance Dashboard

export const USER_PROFILE = {
  name: "Alexander Vance",
  email: "alex.vance@apexcap.io",
  role: "Principal & Founder",
  organization: "Apex Technologies Corp",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  tier: "Enterprise Tier",
  unreadNotificationsCount: 3,
};

export const ACCOUNTS_DATA = [
  {
    id: "acc-1",
    name: "Primary Operating",
    institution: "Silicon Valley Bank",
    type: "Checking",
    accountNumber: "•••• 8924",
    balance: 118450.25,
    currency: "USD",
    changeMoM: 14.2,
    isDefault: true,
    color: "#10B981"
  },
  {
    id: "acc-2",
    name: "Treasury Vault (Yield 5.1%)",
    institution: "Mercury Treasury",
    type: "Money Market",
    accountNumber: "•••• 4109",
    balance: 24500.00,
    currency: "USD",
    changeMoM: 5.1,
    isDefault: false,
    color: "#3B82F6"
  },
  {
    id: "acc-3",
    name: "Stripe Settlement",
    institution: "Stripe Balance",
    type: "Merchant Clearing",
    accountNumber: "•••• 3371",
    balance: 5970.20,
    currency: "USD",
    changeMoM: -2.4,
    isDefault: false,
    color: "#8B5CF6"
  },
  {
    id: "acc-4",
    name: "Apex Corporate Black Card",
    institution: "Brex Commercial",
    type: "Credit / Charge",
    accountNumber: "•••• 7712",
    balance: -3240.10,
    limit: 50000.00,
    currency: "USD",
    changeMoM: -8.5,
    isDefault: false,
    color: "#F59E0B"
  }
];

export const KPI_METRICS = {
  totalBalance: {
    value: 145680.35,
    formatted: "$145,680.35",
    changePercentage: 12.8,
    isPositive: true,
    comparisonText: "vs last month (+$16,520.00)",
    sparkline: [122000, 126500, 124000, 131000, 138500, 141200, 145680]
  },
  monthlyIncome: {
    value: 28450.00,
    formatted: "$28,450.00",
    changePercentage: 8.4,
    isPositive: true,
    comparisonText: "vs $26,245.00 last month",
    sparkline: [21000, 24500, 22800, 26000, 25400, 27100, 28450]
  },
  monthlyExpenses: {
    value: 9140.20,
    formatted: "$9,140.20",
    changePercentage: -3.2,
    isPositive: true, // Dropping expenses is positive!
    comparisonText: "vs $9,445.00 last month (Favorable)",
    sparkline: [11200, 10500, 9800, 10100, 9600, 9445, 9140]
  },
  netSavings: {
    value: 19309.80,
    formatted: "$19,309.80",
    savingsRate: 67.8,
    changePercentage: 14.6,
    isPositive: true,
    comparisonText: "67.8% savings rate target met",
    sparkline: [9800, 14000, 13000, 15900, 15800, 17655, 19310]
  }
};

export const CASH_FLOW_CHART_DATA = {
  "7D": [
    { period: "Aug 20", income: 3200, expenses: 850, net: 2350 },
    { period: "Aug 21", income: 1400, expenses: 1200, net: 200 },
    { period: "Aug 22", income: 4800, expenses: 620, net: 4180 },
    { period: "Aug 23", income: 950, expenses: 2100, net: -1150 },
    { period: "Aug 24", income: 6200, expenses: 1400, net: 4800 },
    { period: "Aug 25", income: 2800, expenses: 950, net: 1850 },
    { period: "Aug 26", income: 9100, expenses: 2020, net: 7080 }
  ],
  "30D": [
    { period: "Week 1", income: 6200, expenses: 2400, net: 3800 },
    { period: "Week 2", income: 7800, expenses: 1950, net: 5850 },
    { period: "Week 3", income: 5900, expenses: 2650, net: 3250 },
    { period: "Week 4", income: 8550, expenses: 2140, net: 6410 }
  ],
  "90D": [
    { period: "Jun", income: 24500, expenses: 10500, net: 14000 },
    { period: "Jul", income: 26245, expenses: 9445, net: 16800 },
    { period: "Aug", income: 28450, expenses: 9140, net: 19310 }
  ],
  "1Y": [
    { period: "Sep '25", income: 18200, expenses: 8900, net: 9300 },
    { period: "Oct '25", income: 19500, expenses: 9200, net: 10300 },
    { period: "Nov '25", income: 21400, expenses: 8700, net: 12700 },
    { period: "Dec '25", income: 25800, expenses: 12400, net: 13400 },
    { period: "Jan '26", income: 20100, expenses: 8400, net: 11700 },
    { period: "Feb '26", income: 22000, expenses: 8600, net: 13400 },
    { period: "Mar '26", income: 23500, expenses: 9100, net: 14400 },
    { period: "Apr '26", income: 24200, expenses: 9800, net: 14400 },
    { period: "May '26", income: 25100, expenses: 8950, net: 16150 },
    { period: "Jun '26", income: 24500, expenses: 10500, net: 14000 },
    { period: "Jul '26", income: 26245, expenses: 9445, net: 16800 },
    { period: "Aug '26", income: 28450, expenses: 9140, net: 19310 }
  ]
};

export const SPENDING_CATEGORIES = [
  {
    id: "cat-cloud",
    name: "Cloud & Infrastructure",
    amount: 3250.40,
    percentage: 35.6,
    color: "#3B82F6",
    icon: "Server",
    budget: 3500,
    variance: -7.1
  },
  {
    id: "cat-saas",
    name: "Software & SaaS Subscriptions",
    amount: 2180.00,
    percentage: 23.9,
    color: "#10B981",
    icon: "Layers",
    budget: 2500,
    variance: -12.8
  },
  {
    id: "cat-payroll",
    name: "Contractors & Payroll",
    amount: 1850.00,
    percentage: 20.2,
    color: "#8B5CF6",
    icon: "Users",
    budget: 2000,
    variance: 0.0
  },
  {
    id: "cat-marketing",
    name: "Marketing & Growth",
    amount: 1120.80,
    percentage: 12.3,
    color: "#F59E0B",
    icon: "TrendingUp",
    budget: 1500,
    variance: -25.2
  },
  {
    id: "cat-travel",
    name: "Travel & Hospitality",
    amount: 739.00,
    percentage: 8.0,
    color: "#EC4899",
    icon: "Plane",
    budget: 1000,
    variance: -26.1
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-9082",
    date: "Aug 26, 2026",
    description: "Enterprise SaaS Retainer - Helix AI",
    merchant: "Helix Intelligence Corp",
    category: "Income",
    account: "Primary Operating (SVB)",
    amount: 12500.00,
    type: "income",
    status: "Completed",
    icon: "ShieldCheck",
    receiptUrl: "#"
  },
  {
    id: "TXN-9081",
    date: "Aug 25, 2026",
    description: "Amazon Web Services (AWS)",
    merchant: "AWS Cloud Infrastructure",
    category: "Cloud & Infrastructure",
    account: "Apex Corporate Black Card",
    amount: -1840.50,
    type: "expense",
    status: "Completed",
    icon: "Cloud",
    receiptUrl: "#"
  },
  {
    id: "TXN-9080",
    date: "Aug 24, 2026",
    description: "OpenAI API Platform Invoicing",
    merchant: "OpenAI LLC",
    category: "Software & SaaS",
    account: "Apex Corporate Black Card",
    amount: -620.00,
    type: "expense",
    status: "Completed",
    icon: "Cpu",
    receiptUrl: "#"
  },
  {
    id: "TXN-9079",
    date: "Aug 24, 2026",
    description: "Client Project Milestone Payment",
    merchant: "Aegis Capital Partners",
    category: "Income",
    account: "Primary Operating (SVB)",
    amount: 8200.00,
    type: "income",
    status: "Completed",
    icon: "CheckCircle",
    receiptUrl: "#"
  },
  {
    id: "TXN-9078",
    date: "Aug 22, 2026",
    description: "Monthly Yield Distribution",
    merchant: "Mercury Treasury MM",
    category: "Income",
    account: "Treasury Vault",
    amount: 104.16,
    type: "income",
    status: "Completed",
    icon: "Coins",
    receiptUrl: "#"
  },
  {
    id: "TXN-9077",
    date: "Aug 21, 2026",
    description: "GitHub Enterprise & Copilot Seats",
    merchant: "GitHub, Inc.",
    category: "Software & SaaS",
    account: "Apex Corporate Black Card",
    amount: -340.00,
    type: "expense",
    status: "Completed",
    icon: "Code",
    receiptUrl: "#"
  },
  {
    id: "TXN-9076",
    date: "Aug 20, 2026",
    description: "Google Workspace & GCP Storage",
    merchant: "Google Cloud LLC",
    category: "Cloud & Infrastructure",
    account: "Primary Operating (SVB)",
    amount: -285.40,
    type: "expense",
    status: "Completed",
    icon: "Mail",
    receiptUrl: "#"
  },
  {
    id: "TXN-9075",
    date: "Aug 19, 2026",
    description: "Contract Engineering - Backend Refactor",
    merchant: "DevSquad Studios Ltd",
    category: "Contractors & Payroll",
    account: "Primary Operating (SVB)",
    amount: -1850.00,
    type: "expense",
    status: "Pending",
    icon: "UserCheck",
    receiptUrl: "#"
  },
  {
    id: "TXN-9074",
    date: "Aug 18, 2026",
    description: "Figma Organization Design License",
    merchant: "Figma, Inc.",
    category: "Software & SaaS",
    account: "Apex Corporate Black Card",
    amount: -150.00,
    type: "expense",
    status: "Completed",
    icon: "Figma",
    receiptUrl: "#"
  },
  {
    id: "TXN-9073",
    date: "Aug 16, 2026",
    description: "Stripe Merchant Daily Payout",
    merchant: "Stripe Transfers",
    category: "Income",
    account: "Stripe Settlement",
    amount: 3950.00,
    type: "income",
    status: "Completed",
    icon: "CreditCard",
    receiptUrl: "#"
  },
  {
    id: "TXN-9072",
    date: "Aug 15, 2026",
    description: "Flight & Hotel - SF Tech Summit",
    merchant: "United Airlines & Hyatt",
    category: "Travel & Hospitality",
    account: "Apex Corporate Black Card",
    amount: -739.00,
    type: "expense",
    status: "Completed",
    icon: "Navigation",
    receiptUrl: "#"
  },
  {
    id: "TXN-9071",
    date: "Aug 14, 2026",
    description: "Google Ads Growth Campaign",
    merchant: "Google Advertising",
    category: "Marketing & Growth",
    account: "Apex Corporate Black Card",
    amount: -620.80,
    type: "expense",
    status: "Processing",
    icon: "Target",
    receiptUrl: "#"
  }
];

export const RECURRING_SUBSCRIPTIONS = [
  {
    id: "sub-1",
    name: "AWS Infrastructure Cluster",
    vendor: "Amazon Web Services",
    amount: 1840.50,
    billingCycle: "Monthly",
    nextDue: "Sep 01, 2026",
    category: "Cloud",
    status: "Active"
  },
  {
    id: "sub-2",
    name: "GitHub Enterprise (20 seats)",
    vendor: "GitHub Inc",
    amount: 340.00,
    billingCycle: "Monthly",
    nextDue: "Sep 05, 2026",
    category: "Engineering",
    status: "Active"
  },
  {
    id: "sub-3",
    name: "OpenAI Tier 4 Compute",
    vendor: "OpenAI LLC",
    amount: 620.00,
    billingCycle: "Usage Based",
    nextDue: "Sep 01, 2026",
    category: "AI & ML",
    status: "Active"
  },
  {
    id: "sub-4",
    name: "Slack Business+ Tier",
    vendor: "Slack Technologies",
    amount: 250.00,
    billingCycle: "Monthly",
    nextDue: "Sep 12, 2026",
    category: "Comms",
    status: "Active"
  }
];

export const INVESTMENTS_PORTFOLIO = {
  totalValue: 342180.00,
  allTimeReturn: 18420.50,
  allTimeReturnPct: 5.69,
  dailyChange: 2140.20,
  dailyChangePct: 0.63,
  allocations: [
    { label: "US Tech Growth Equities", percentage: 48, value: 164246.40, color: "#3B82F6" },
    { label: "Treasury Bills & Short Bonds", percentage: 27, value: 92388.60, color: "#10B981" },
    { label: "Crypto Assets (BTC / ETH)", percentage: 15, value: 51327.00, color: "#8B5CF6" },
    { label: "Liquid Money Market Cash", percentage: 10, value: 34218.00, color: "#F59E0B" }
  ],
  holdings: [
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      shares: 185,
      avgCost: 112.40,
      currentPrice: 128.50,
      totalValue: 23772.50,
      gainLoss: 2978.50,
      gainLossPct: 14.32,
      isPositive: true
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      shares: 120,
      avgCost: 410.00,
      currentPrice: 448.20,
      totalValue: 53784.00,
      gainLoss: 4584.00,
      gainLossPct: 9.32,
      isPositive: true
    },
    {
      symbol: "VOO",
      name: "Vanguard S&P 500 ETF",
      shares: 180,
      avgCost: 480.00,
      currentPrice: 512.40,
      totalValue: 92232.00,
      gainLoss: 5832.00,
      gainLossPct: 6.75,
      isPositive: true
    },
    {
      symbol: "BTC",
      name: "Bitcoin (Spot)",
      shares: 0.65,
      avgCost: 58200.00,
      currentPrice: 64150.00,
      totalValue: 41697.50,
      gainLoss: 3867.50,
      gainLossPct: 10.22,
      isPositive: true
    },
    {
      symbol: "ETH",
      name: "Ethereum (Staked)",
      shares: 3.2,
      avgCost: 3100.00,
      currentPrice: 3009.20,
      totalValue: 9629.50,
      gainLoss: -290.50,
      gainLossPct: -2.93,
      isPositive: false
    }
  ]
};

export const NOTIFICATIONS_DATA = [
  {
    id: "notif-1",
    title: "Large Inbound Wire Received",
    message: "$12,500.00 from Helix Intelligence Corp settled in Primary Operating.",
    time: "10 mins ago",
    type: "success",
    read: false
  },
  {
    id: "notif-2",
    title: "Treasury Yield Credited",
    message: "$104.16 monthly yield added to Mercury Treasury MM.",
    time: "2 hours ago",
    type: "info",
    read: false
  },
  {
    id: "notif-3",
    title: "AWS Budget Threshold Alert",
    message: "Cloud spend reached 85% of standard projected monthly envelope.",
    time: "1 day ago",
    type: "warning",
    read: false
  },
  {
    id: "notif-4",
    title: "Security: New Device Login",
    message: "Chrome on macOS verified in San Francisco, CA.",
    time: "2 days ago",
    type: "neutral",
    read: true
  }
];
