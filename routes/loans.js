const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===============================
// GET ALL LOANS
// ===============================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        l.loan_id,
        l.customer_id,
        c.name AS customer_name,
        l.amount,
        l.interest_rate,
        l.status,
        l.issued_date
      FROM loans l
      JOIN customers c
      ON l.customer_id = c.customer_id
      ORDER BY l.loan_id DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// ADD LOAN
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      customer_id,
      amount,
      interest_rate,
      status,
      issued_date,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO loans
      (customer_id, amount, interest_rate, status, issued_date)
      VALUES (?, ?, ?, ?, ?)`,
      [
        customer_id,
        amount,
        interest_rate,
        status,
        issued_date,
      ]
    );

    res.status(201).json({
      message: "Loan Added Successfully",
      loan_id: result.insertId,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// UPDATE LOAN
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const {
      amount,
      interest_rate,
      status,
      issued_date,
    } = req.body;

    const [result] = await db.query(
      `UPDATE loans
       SET
       amount = ?,
       interest_rate = ?,
       status = ?,
       issued_date = ?
       WHERE loan_id = ?`,
      [
        amount,
        interest_rate,
        status,
        issued_date,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Loan not found",
      });
    }

    res.json({
      message: "Loan Updated Successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// DELETE LOAN
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM loans WHERE loan_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Loan not found",
      });
    }

    res.json({
      message: "Loan Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;