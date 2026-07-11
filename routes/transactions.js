const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===============================
// GET ALL TRANSACTIONS
// ===============================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        t.transaction_id,
        t.account_number,
        c.name AS customer_name,
        t.transaction_type,
        t.amount,
        t.transaction_date
      FROM transactions t
      JOIN accounts a
        ON t.account_number = a.account_number
      JOIN customers c
        ON a.customer_id = c.customer_id
      ORDER BY t.transaction_id DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// GET SINGLE TRANSACTION
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM transactions WHERE transaction_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// CREATE TRANSACTION
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      account_number,
      transaction_type,
      amount,
    } = req.body;

    await db.query(
      `INSERT INTO transactions
      (account_number, transaction_type, amount)
      VALUES (?, ?, ?)`,
      [account_number, transaction_type, amount]
    );

    if (transaction_type === "Deposit") {
      await db.query(
        "UPDATE accounts SET balance = balance + ? WHERE account_number = ?",
        [amount, account_number]
      );
    } else if (transaction_type === "Withdraw") {
      await db.query(
        "UPDATE accounts SET balance = balance - ? WHERE account_number = ?",
        [amount, account_number]
      );
    }

    res.status(201).json({
      message: "Transaction Successful",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// DELETE TRANSACTION
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM transactions WHERE transaction_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;