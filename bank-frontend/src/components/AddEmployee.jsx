import { useState } from "react";
import api from "../services/api";

function AddEmployee({ loadEmployees, setShowForm }) {
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/employees", employee)
      .then(() => {
        alert("Employee Added Successfully");
        loadEmployees();
        setShowForm(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add employee");
      });
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Add Employee</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          placeholder="Employee Name"
          value={employee.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-2"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-2"
          name="phone"
          placeholder="Phone Number"
          value={employee.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          className="form-control mb-3"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          required
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

export default AddEmployee;