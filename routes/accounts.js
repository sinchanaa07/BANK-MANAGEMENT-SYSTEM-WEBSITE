const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all accounts (with customer name)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT a.*, c.name AS customer_name
      FROM accounts a
      JOIN customers c ON a.customer_id = c.customer_id
      ORDER BY a.account_number
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET single account
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM accounts WHERE account_number = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// CREATE account
router.post('/', async (req, res) => {
  try {
    const { customer_id, account_type, balance } = req.body;

    if (!customer_id) {
      return res.status(400).json({
        error: 'customer_id is required'
      });
    }

    const [result] = await db.query(
      'INSERT INTO accounts (customer_id, account_type, balance) VALUES (?, ?, ?)',
      [
        customer_id,
        account_type || 'savings',
        balance || 0
      ]
    );

    res.status(201).json({
      account_number: result.insertId,
      customer_id,
      account_type,
      balance
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE account
router.put('/:id', async (req, res) => {
  try {
    const { account_type, balance } = req.body;

    const [result] = await db.query(
      'UPDATE accounts SET account_type = ?, balance = ? WHERE account_number = ?',
      [
        account_type,
        balance,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Account not found'
      });
    }

    res.json({
      message: 'Account updated'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE account
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM accounts WHERE account_number = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Account not found'
      });
    }

    res.json({
      message: 'Account deleted'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;