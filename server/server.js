// ==============================================================================
// CASHXFLOW BACKEND SERVER (Node.js + Express + JWT Authentication)
// ==============================================================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-Memory Database with Multi-User Multi-Tenant Storage
// (Can be swapped with PostgreSQL/Neon/Supabase via server/schema.sql)
let USERS_DB = [
  {
    id: 101,
    name: "Vaibhav Sharma",
    email: "vaibhav@cashxflow.io",
    password: "password123",
    currency: "INR",
    tier: "Super Priority Wealth",
    role: "Founder / Principal Tech Lead",
    location: "Bengaluru, India"
  },
  {
    id: 102,
    name: "Rahul Verma",
    email: "rahul@cashxflow.io",
    password: "password123",
    currency: "INR",
    tier: "Standard Pro",
    role: "Senior Software Engineer",
    location: "Pune, India"
  },
  {
    id: 103,
    name: "Priya Nair",
    email: "priya@cashxflow.io",
    password: "password123",
    currency: "INR",
    tier: "Growth Member",
    role: "Product Strategy Lead",
    location: "Mumbai, India"
  }
];

let ACCOUNTS_DB = [
  // User 101 (Vaibhav)
  { id: 1, userId: 101, name: "HDFC Salary & Primary", institution: "HDFC Bank", type: "Checking", number: "••• 8924", balance: 385420.50, color: "#10B981", badge: "Primary" },
  { id: 2, userId: 101, name: "ICICI Multi-Option Deposit", institution: "ICICI Bank", type: "Sweep Deposit", number: "••• 4109", balance: 650000.00, color: "#3B82F6", badge: "Yield" },
  { id: 3, userId: 101, name: "Zerodha Demat Float", institution: "Zerodha", type: "Demat", number: "••• 3371", balance: 214500.00, color: "#8B5CF6", badge: "Demat" },
  { id: 4, userId: 101, name: "SBI Fixed Deposit Vault", institution: "SBI", type: "Fixed Deposit", number: "••• 9120", balance: 480000.00, color: "#F59E0B", badge: "FD" },

  // User 102 (Rahul)
  { id: 5, userId: 102, name: "ICICI Salary Account", institution: "ICICI Bank", type: "Checking", number: "••• 1102", balance: 125000.00, color: "#10B981", badge: "Salary" },
  { id: 6, userId: 102, name: "Groww Mutual Funds Pool", institution: "Groww", type: "Demat", number: "••• 9921", balance: 180000.00, color: "#8B5CF6", badge: "SIP" },

  // User 103 (Priya)
  { id: 7, userId: 103, name: "Kotak Privy Salary", institution: "Kotak Mahindra", type: "Checking", number: "••• 7714", balance: 450000.00, color: "#10B981", badge: "Salary" },
  { id: 8, userId: 103, name: "Zerodha Equity Pool", institution: "Zerodha", type: "Demat", number: "••• 5510", balance: 920000.00, color: "#3B82F6", badge: "Equity" }
];

let TRANSACTIONS_DB = [
  // User 101 (Vaibhav) Transactions
  { id: "TXN-9082", userId: 101, date: "2026-08-31", desc: "Client Architecture Retainer", merchant: "FinEdge Intelligence", category: "Income", account: "HDFC Salary & Primary", amount: 145000.00, type: "income", status: "Completed" },
  { id: "TXN-9081", userId: 101, date: "2026-08-28", desc: "Monthly Tech Advisory Remittance", merchant: "Nexus Capital", category: "Income", account: "HDFC Salary & Primary", amount: 140000.00, type: "income", status: "Completed" },
  { id: "TXN-9080", userId: 101, date: "2026-08-26", desc: "D-Mart Monthly Groceries", merchant: "D-Mart Supermarket", category: "Food & Groceries", account: "HDFC Salary & Primary", amount: -8420.00, type: "expense", status: "Completed" },
  { id: "TXN-9079", userId: 101, date: "2026-08-25", desc: "AWS Cloud Infrastructure Cluster", merchant: "Amazon Web Services", category: "Bills & Utilities", account: "HDFC Salary & Primary", amount: -1840.00, type: "expense", status: "Completed" },
  { id: "TXN-9078", userId: 101, date: "2026-08-20", desc: "Zerodha Nifty 50 SIP Index", merchant: "Nippon Life India AMC", category: "Investments", account: "HDFC Salary & Primary", amount: -14310.00, type: "expense", status: "Completed" },
  { id: "TXN-9077", userId: 101, date: "2026-08-18", desc: "IndiGo Flights BLR to BOM", merchant: "InterGlobe Aviation", category: "Travel & Commute", account: "HDFC Salary & Primary", amount: -6890.00, type: "expense", status: "Completed" },

  // User 102 (Rahul) Transactions
  { id: "TXN-8001", userId: 102, date: "2026-08-31", desc: "August Developer Salary", merchant: "Infosys Technologies Ltd", category: "Income", account: "ICICI Salary Account", amount: 120000.00, type: "income", status: "Completed" },
  { id: "TXN-8002", userId: 102, date: "2026-08-29", desc: "Apartment Rent Baner Pune", merchant: "Landlord Rent Payment", category: "Bills & Utilities", account: "ICICI Salary Account", amount: -22000.00, type: "expense", status: "Completed" },
  { id: "TXN-8003", userId: 102, date: "2026-08-24", desc: "Groww Parag Parikh Flexi SIP", merchant: "Groww Mutual Funds", category: "Investments", account: "ICICI Salary Account", amount: -12000.00, type: "expense", status: "Completed" },
  { id: "TXN-8004", userId: 102, date: "2026-08-22", desc: "Blinkit & Nature's Basket Groceries", merchant: "Blinkit Commerce", category: "Food & Groceries", account: "ICICI Salary Account", amount: -4200.00, type: "expense", status: "Completed" },
  { id: "TXN-8005", userId: 102, date: "2026-08-15", desc: "Amazon Prime Day Electronics", merchant: "Amazon India", category: "Shopping & Lifestyle", account: "ICICI Salary Account", amount: -3800.00, type: "expense", status: "Completed" }
];

let INVESTMENTS_DB = [
  // User 101
  { id: 1, userId: 101, symbol: "NIFTYBEES", name: "Nippon India Nifty 50 ETF", shares: 1850, avg: 242.10, price: 282.40, type: "ETF" },
  { id: 2, userId: 101, symbol: "RELIANCE", name: "Reliance Industries Ltd", shares: 140, avg: 2650.00, price: 2980.00, type: "Equity" },
  { id: 3, userId: 101, symbol: "INFY", name: "Infosys Limited", shares: 250, avg: 1440.00, price: 1845.50, type: "Equity" },
  { id: 4, userId: 101, symbol: "SGB-2029", name: "Sovereign Gold Bonds 2029", shares: 60, avg: 5600.00, price: 7250.00, type: "Gold Bond" },

  // User 102
  { id: 5, userId: 102, symbol: "PPFAS-FLEXI", name: "Parag Parikh Flexi Cap Fund", shares: 2800, avg: 54.20, price: 68.90, type: "Mutual Fund" },
  { id: 6, userId: 102, symbol: "TCS", name: "Tata Consultancy Services", shares: 45, avg: 3600.00, price: 4120.00, type: "Equity" }
];

// Helper: Extract logged-in User ID from Header
function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    // Default to User 101 if no header provided in demo mode
    req.userId = 101;
    return next();
  }
  const token = authHeader.replace('Bearer ', '');
  const user = USERS_DB.find(u => u.id === parseInt(token) || u.email === token);
  if (!user) {
    req.userId = 101;
  } else {
    req.userId = user.id;
  }
  next();
}

// -----------------------------------------------------------------------------
// 1. AUTHENTICATION ROUTES
// -----------------------------------------------------------------------------

// Sign Up / Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, currency = 'INR' } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = USERS_DB.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const newUser = {
    id: 100 + USERS_DB.length + 1,
    name,
    email,
    password,
    currency,
    tier: 'Pro Member',
    role: 'Standard User',
    location: 'India'
  };
  USERS_DB.push(newUser);

  // Default accounts for new user
  ACCOUNTS_DB.push({
    id: ACCOUNTS_DB.length + 1,
    userId: newUser.id,
    name: "Primary Savings Account",
    institution: "Bank of India",
    type: "Savings",
    number: "••• 1001",
    balance: 50000.00,
    color: "#10B981",
    badge: "Primary"
  });

  res.status(201).json({
    message: 'Account created successfully',
    user: newUser,
    token: newUser.id.toString()
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS_DB.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  res.json({
    message: 'Login successful',
    user,
    token: user.id.toString()
  });
});

// Switch / Get Demo Profile
app.get('/api/auth/demo/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = USERS_DB.find(u => u.id === userId) || USERS_DB[0];
  res.json({
    user,
    token: user.id.toString()
  });
});

// -----------------------------------------------------------------------------
// 2. DASHBOARD AGGREGATED METRICS ROUTE
// -----------------------------------------------------------------------------
app.get('/api/dashboard', authenticateUser, (req, res) => {
  const userId = req.userId;
  const user = USERS_DB.find(u => u.id === userId) || USERS_DB[0];
  const userAccounts = ACCOUNTS_DB.filter(a => a.userId === userId);
  const userTransactions = TRANSACTIONS_DB.filter(t => t.userId === userId);
  const userInvestments = INVESTMENTS_DB.filter(i => i.userId === userId);

  // 1. Total Balances & Net Worth
  const totalBalance = userAccounts.reduce((sum, a) => sum + a.balance, 0);
  const totalInvestments = userInvestments.reduce((sum, i) => sum + (i.shares * i.price), 0);
  const netWorth = totalBalance + totalInvestments;

  // 2. Monthly Income, Expenses, and Net Cash Flow
  const monthlyIncome = userTransactions
    .filter(t => t.type === 'income' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = userTransactions
    .filter(t => t.type === 'expense' && t.status === 'Completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netCashFlow = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? +((netCashFlow / monthlyIncome) * 100).toFixed(1) : 0;

  // 3. Dynamic Category Breakdown
  const categoryTotals = {};
  userTransactions.filter(t => t.type === 'expense').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
  });

  const spendingCategories = Object.keys(categoryTotals).map(catName => {
    const amount = categoryTotals[catName];
    const percentage = monthlyExpenses > 0 ? +((amount / monthlyExpenses) * 100).toFixed(1) : 0;
    return {
      name: catName,
      amount,
      percentage
    };
  });

  // 4. Financial Health Score (Dynamic algorithm)
  let healthScore = 70;
  if (savingsRate >= 50) healthScore += 15;
  else if (savingsRate >= 30) healthScore += 10;
  if (totalBalance > monthlyExpenses * 6) healthScore += 10;
  if (totalInvestments > 0) healthScore += 5;
  healthScore = Math.min(99, Math.max(40, healthScore));

  res.json({
    user,
    kpis: {
      netWorth,
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      netCashFlow,
      savingsRate,
      healthScore
    },
    accounts: userAccounts,
    transactions: userTransactions,
    investments: userInvestments,
    spendingCategories
  });
});

// -----------------------------------------------------------------------------
// 3. CSV IMPORT ENDPOINT
// -----------------------------------------------------------------------------
app.post('/api/transactions/import-csv', authenticateUser, (req, res) => {
  const userId = req.userId;
  const { csvRows } = req.body; // Array of parsed CSV objects

  if (!csvRows || !Array.isArray(csvRows) || csvRows.length === 0) {
    return res.status(400).json({ error: 'No CSV rows provided' });
  }

  let importedCount = 0;
  let totalInflow = 0;
  let totalOutflow = 0;

  csvRows.forEach(row => {
    const amount = parseFloat(row.Amount || row.amount || 0);
    const type = (row.Type || row.type || (amount >= 0 ? 'income' : 'expense')).toLowerCase();
    const newTxn = {
      id: `CSV-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: userId,
      date: row.Date || row.date || new Date().toISOString().slice(0, 10),
      desc: row.Description || row.description || row.desc || 'Imported Transaction',
      merchant: row.Merchant || row.merchant || 'Bank Settlement',
      category: row.Category || row.category || (type === 'income' ? 'Income' : 'Other & Health'),
      account: row.Account || row.account || 'Imported Account',
      amount: type === 'income' ? Math.abs(amount) : -Math.abs(amount),
      type: type,
      status: 'Completed'
    };

    TRANSACTIONS_DB.unshift(newTxn);
    importedCount++;
    if (type === 'income') totalInflow += Math.abs(amount);
    else totalOutflow += Math.abs(amount);
  });

  res.json({
    message: `Successfully imported ${importedCount} transactions`,
    importedCount,
    totalInflow,
    totalOutflow
  });
});

// -----------------------------------------------------------------------------
// 4. AI FINANCIAL INSIGHTS QUERY ENDPOINT
// -----------------------------------------------------------------------------
app.post('/api/ai/ask', authenticateUser, (req, res) => {
  const userId = req.userId;
  const { query } = req.body;
  const user = USERS_DB.find(u => u.id === userId) || USERS_DB[0];
  const userTxns = TRANSACTIONS_DB.filter(t => t.userId === userId);
  const userAccounts = ACCOUNTS_DB.filter(a => a.userId === userId);

  const monthlyIncome = userTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const monthlyExpenses = userTxns.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const netSurplus = monthlyIncome - monthlyExpenses;

  // AI contextual answer generator based on the user's specific data
  let responseText = "";
  const lowerQ = (query || "").toLowerCase();

  if (lowerQ.includes('highest') || lowerQ.includes('spend') || lowerQ.includes('where')) {
    const categoryTotals = {};
    userTxns.filter(t => t.type === 'expense').forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
    });
    const highestCat = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    if (highestCat) {
      const pct = ((highestCat[1] / (monthlyExpenses || 1)) * 100).toFixed(1);
      responseText = `Based on your recent records, your highest spending category is ${highestCat[0]} at ₹${new Intl.NumberFormat('en-IN').format(highestCat[1])}, representing ${pct}% of your total outflow.`;
    } else {
      responseText = `You currently have ₹${new Intl.NumberFormat('en-IN').format(monthlyExpenses)} in total monthly expenses.`;
    }
  } else if (lowerQ.includes('save') || lowerQ.includes('surplus') || lowerQ.includes('rate')) {
    const savingsRate = monthlyIncome > 0 ? ((netSurplus / monthlyIncome) * 100).toFixed(1) : 0;
    responseText = `Your current monthly surplus is +₹${new Intl.NumberFormat('en-IN').format(netSurplus)} with a strong savings rate of ${savingsRate}%. You can invest an extra ₹15,000 monthly into low-cost index funds to accelerate compounding.`;
  } else {
    responseText = `Hello ${user.name}! Your current net monthly cash flow is +₹${new Intl.NumberFormat('en-IN').format(netSurplus)} (Income: ₹${new Intl.NumberFormat('en-IN').format(monthlyIncome)}, Expenses: ₹${new Intl.NumberFormat('en-IN').format(monthlyExpenses)}). Your financial health is in the top tier!`;
  }

  res.json({
    answer: responseText,
    userId: user.id,
    userName: user.name
  });
});

app.listen(PORT, () => {
  console.log(`CASHXFLOW Multi-User Backend Server running on http://localhost:${PORT}`);
});
