import { useState, useEffect } from "react";
import api from "../services/api";

function AddAccount({ onClose }) {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    account_type: "Savings",
    balance: "",
  });

  useEffect(() => {
    api.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAccount = async (e) => {
    e.preventDefault();

    try {
      await api.post("/accounts", form);
      alert("Account Added Successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to add account");
    }
  };

  return (
    <div className="card p-4 shadow mb-3">
      <h4>Add Account</h4>

      <form onSubmit={saveAccount}>

        <select
          className="form-control mb-3"
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option
              key={customer.customer_id}
              value={customer.customer_id}
            >
              {customer.name}
            </option>
          ))}
        </select>

        <select
          className="form-control mb-3"
          name="account_type"
          value={form.account_type}
          onChange={handleChange}
        >
          <option>Savings</option>
          <option>Current</option>
        </select>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Balance"
          name="balance"
          value={form.balance}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-success me-2"
        >
          Save
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

export default AddAccount;