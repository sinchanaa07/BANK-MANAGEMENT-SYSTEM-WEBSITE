const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const customerRoutes = require('./routes/customers');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');
const loanRoutes = require('./routes/loans');
const employeeRoutes = require('./routes/employees');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/employees', employeeRoutes);

// Dashboard
app.get('/api/dashboard', async (req, res) => {
  try {
    const [[customerCount]] = await db.query('SELECT COUNT(*) AS total FROM customers');
    const [[accountCount]] = await db.query('SELECT COUNT(*) AS total FROM accounts');
    const [[totalBalance]] = await db.query('SELECT SUM(balance) AS total FROM accounts');
    const [[activeLoans]] = await db.query("SELECT COUNT(*) AS total FROM loans WHERE status='approved'");
    const [[employeeCount]] = await db.query('SELECT COUNT(*) AS total FROM employees');

    res.json({
      total_customers: customerCount.total,
      total_accounts: accountCount.total,
      total_balance: totalBalance.total || 0,
      active_loans: activeLoans.total,
      total_employees: employeeCount.total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Bank Management System API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});