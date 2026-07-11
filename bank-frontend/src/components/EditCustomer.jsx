import { useState } from "react";
import api from "../services/api";

function EditCustomer({ customer, onClose }) {
  const [form, setForm] = useState(customer);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateCustomer = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/customers/${customer.customer_id}`, form);
      alert("Customer Updated Successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to update customer");
    }
  };

  return (
    <div className="card p-4 shadow mb-3">
      <h4>Edit Customer</h4>

      <form onSubmit={updateCustomer}>
        <input
          className="form-control mb-2"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="address"
          value={form.address}
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

export default EditCustomer;