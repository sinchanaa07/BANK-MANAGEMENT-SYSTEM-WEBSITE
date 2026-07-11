import { useEffect, useState } from "react";
import api from "../services/api";

function AddTransaction({ onClose }) {
  const [accounts, setAccounts] = useState([]);

  const [form, setForm] = useState({
    account_number: "",
    transaction_type: "Deposit",
    amount: "",
  });

  useEffect(() => {
    api.get("/accounts")
      .then((res) => setAccounts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveTransaction = async (e) => {
    e.preventDefault();

    try {
      await api.post("/transactions", form);
      alert("Transaction Successful!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to save transaction");
    }
  };

  return (
    <div className="card p-4 shadow mb-3">
      <h4>New Transaction</h4>

      <form onSubmit={saveTransaction}>

        <select
          className="form-control mb-3"
          name="account_number"
          value={form.account_number}
          onChange={handleChange}
          required
        >
          <option value="">Select Account</option>

          {accounts.map((account) => (
            <option
              key={account.account_number}
              value={account.account_number}
            >
              {account.account_number} - {account.customer_name}
            </option>
          ))}
        </select>

        <select
          className="form-control mb-3"
          name="transaction_type"
          value={form.transaction_type}
          onChange={handleChange}
        >
          <option>Deposit</option>
          <option>Withdraw</option>
        </select>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
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

export default AddTransaction;