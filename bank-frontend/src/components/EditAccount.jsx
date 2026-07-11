import { useState } from "react";
import api from "../services/api";

function EditAccount({ account, onClose }) {
  const [form, setForm] = useState({
    account_type: account.account_type,
    balance: account.balance,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/accounts/${account.account_number}`, form);
      alert("Account Updated Successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to update account");
    }
  };

  return (
    <div className="card p-4 shadow mb-3">
      <h4>Edit Account</h4>

      <form onSubmit={updateAccount}>

        <input
          className="form-control mb-3"
          value={account.customer_name}
          disabled
        />

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
          name="balance"
          value={form.balance}
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

export default EditAccount;