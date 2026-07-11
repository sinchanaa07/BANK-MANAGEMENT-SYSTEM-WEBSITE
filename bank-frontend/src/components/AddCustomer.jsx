import { useState } from "react";
import api from "../services/api";

function AddCustomer({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveCustomer = async (e) => {
    e.preventDefault();

    try {
      await api.post("/customers", form);
      alert("Customer Added Successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to add customer.");
    }
  };

  return (
    <div className="card p-4 shadow mb-3">
      <h4 className="mb-3">Add Customer</h4>

      <form onSubmit={saveCustomer}>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            className="form-control"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
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

export default AddCustomer;