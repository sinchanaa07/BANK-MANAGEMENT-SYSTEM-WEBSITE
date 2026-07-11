const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers ORDER BY customer_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single customer
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM customers WHERE customer_id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE customer
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const [result] = await db.query(
      'INSERT INTO customers (name, phone, email, address) VALUES (?, ?, ?, ?)',
      [name, phone, email, address]
    );

    res.status(201).json({
      customer_id: result.insertId,
      name,
      phone,
      email,
      address
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE customer
router.put('/:id', async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    const [result] = await db.query(
      'UPDATE customers SET name = ?, phone = ?, email = ?, address = ? WHERE customer_id = ?',
      [name, phone, email, address, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE customer
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM customers WHERE customer_id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;