import { useEffect, useState } from "react";
import api from "../services/api";

function AddLoan({ loadLoans, setShowForm }) {
  const [customers, setCustomers] = useState([]);

  const [loan, setLoan] = useState({
    customer_id: "",
    amount: "",
    interest_rate: "",
    status: "pending",
    issued_date: "",
  });

  useEffect(() => {
    api
      .get("/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setLoan({
      ...loan,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/loans", loan)
      .then(() => {
        alert("Loan Added Successfully");
        loadLoans();
        setShowForm(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add loan");
      });
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Add Loan</h4>

      <form onSubmit={handleSubmit}>
        <select
          className="form-control mb-2"
          name="customer_id"
          value={loan.customer_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option
              key={customer.customer_id}
              value={customer.customer_id}
            >
              {customer.customer_id} - {customer.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="form-control mb-2"
          name="amount"
          placeholder="Loan Amount"
          value={loan.amount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          className="form-control mb-2"
          name="interest_rate"
          placeholder="Interest Rate"
          value={loan.interest_rate}
          onChange={handleChange}
        />

        <select
          className="form-control mb-2"
          name="status"
          value={loan.status}
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
          value={loan.issued_date}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-success me-2">
          Save
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddLoan;