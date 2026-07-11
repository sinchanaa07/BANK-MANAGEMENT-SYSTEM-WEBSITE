const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===============================
// GET ALL EMPLOYEES
// ===============================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM employees ORDER BY employee_id DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// GET SINGLE EMPLOYEE
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// ADD EMPLOYEE
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, position, phone, email, salary } = req.body;

    const [result] = await db.query(
      `INSERT INTO employees
      (name, position, phone, email, salary)
      VALUES (?, ?, ?, ?, ?)`,
      [name, position, phone, email, salary]
    );

    res.status(201).json({
      employee_id: result.insertId,
      message: "Employee Added Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// UPDATE EMPLOYEE
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const { name, position, phone, email, salary } = req.body;

    const [result] = await db.query(
      `UPDATE employees
       SET
       name = ?,
       position = ?,
       phone = ?,
       email = ?,
       salary = ?
       WHERE employee_id = ?`,
      [name, position, phone, email, salary, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    res.json({
      message: "Employee Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// DELETE EMPLOYEE
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM employees WHERE employee_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    res.json({
      message: "Employee Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;