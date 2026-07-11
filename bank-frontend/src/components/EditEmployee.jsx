import { useState } from "react";
import api from "../services/api";

function EditEmployee({ employee, loadEmployees, onClose }) {
  const [form, setForm] = useState({
    name: employee.name,
    position: employee.position,
    phone: employee.phone,
    email: employee.email,
    salary: employee.salary,
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
      .put(`/employees/${employee.employee_id}`, form)
      .then(() => {
        alert("Employee Updated Successfully");
        loadEmployees();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update employee");
      });
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Edit Employee</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-2"
          name="position"
          value={form.position}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-2"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          className="form-control mb-2"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          className="form-control mb-3"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-success me-2">
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

export default EditEmployee;