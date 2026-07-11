import { useState } from "react";
import api from "../services/api";

function EditLoan({ loan, loadLoans, onClose }) {
  const [form, setForm] = useState({
    amount: loan.amount,
    interest_rate: loan.interest_rate,
    status: loan.status,
    issued_date: loan.issued_date
      ? loan.issued_date.substring(0, 10)
      : "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .put(`/loans/${loan.loan_id}`, form)
      .then(() => {
        alert("Loan Updated Successfully");
        loadLoans();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update loan");
      });
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Edit Loan</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          className="form-control mb-2"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          className="form-control mb-2"
          name="interest_rate"
          value={form.interest_rate}
          onChange={handleChange}
        />

        <select
          className="form-control mb-2"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="date"
          className="form-control mb-3"
          name="issued_date"
          value={form.issued_date}
          onChange={handleChange}
        />

        <button className="btn btn-success me-2">
          Update
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditLoan;