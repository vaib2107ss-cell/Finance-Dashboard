-- ==========================================================
-- CASHXFLOW MULTI-USER DATABASE SCHEMA (PostgreSQL / SQLite)
-- ==========================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    tier VARCHAR(50) DEFAULT 'Standard',
    role VARCHAR(100) DEFAULT 'User',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bank Accounts & Vaults Table
CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_name VARCHAR(150) NOT NULL,
    institution VARCHAR(150) NOT NULL,
    account_type VARCHAR(50) NOT NULL, -- 'Checking', 'Savings', 'Deposit', 'Demat', 'Credit'
    account_number VARCHAR(50),
    balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    credit_limit NUMERIC(15, 2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'INR',
    is_default BOOLEAN DEFAULT FALSE,
    color VARCHAR(20) DEFAULT '#10B981',
    badge VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id INTEGER REFERENCES accounts(id) ON DELETE SET NULL,
    account_name VARCHAR(150),
    description VARCHAR(255) NOT NULL,
    merchant VARCHAR(150),
    category VARCHAR(100) NOT NULL, -- 'Food & Groceries', 'Bills & Utilities', etc.
    amount NUMERIC(15, 2) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'income', 'expense', 'transfer'
    status VARCHAR(30) DEFAULT 'Completed', -- 'Completed', 'Pending', 'Failed'
    date DATE NOT NULL,
    time VARCHAR(30),
    auth_code VARCHAR(100),
    icon VARCHAR(50) DEFAULT 'CreditCard',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Investments Portfolio Table
CREATE TABLE IF NOT EXISTS investments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    symbol VARCHAR(50) NOT NULL,
    asset_name VARCHAR(150) NOT NULL,
    asset_type VARCHAR(50) NOT NULL, -- 'Equity', 'ETF', 'Mutual Fund', 'Gold Bond', 'Crypto'
    shares NUMERIC(15, 4) NOT NULL DEFAULT 0.00,
    avg_cost NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    current_price NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    total_value NUMERIC(15, 2) GENERATED ALWAYS AS (shares * current_price) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Budgets Table
CREATE TABLE IF NOT EXISTS budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    allocated_limit NUMERIC(15, 2) NOT NULL,
    month VARCHAR(20) NOT NULL, -- e.g. '2026-08'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Financial Goals Table
CREATE TABLE IF NOT EXISTS goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    goal_name VARCHAR(150) NOT NULL,
    target_amount NUMERIC(15, 2) NOT NULL,
    current_amount NUMERIC(15, 2) DEFAULT 0.00,
    target_date DATE,
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Upcoming Payments & EMIs Table
CREATE TABLE IF NOT EXISTS upcoming_payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    payment_name VARCHAR(150) NOT NULL,
    vendor VARCHAR(150),
    amount NUMERIC(15, 2) NOT NULL,
    due_date DATE NOT NULL,
    category VARCHAR(50),
    auto_debit BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast multi-tenant queries
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_accounts_user ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_investments_user ON investments(user_id);
CREATE INDEX IF NOT EXISTS idx_budgets_user ON budgets(user_id, month);
CREATE INDEX IF NOT EXISTS idx_goals_user ON goals(user_id);
