import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import api from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    api
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      alert("Employee Deleted Successfully");
      loadEmployees();
    } catch (err) {
      console.log(err);
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">Employees</h2>

        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          + Add Employee
        </button>

        {showForm && (
          <AddEmployee
            loadEmployees={loadEmployees}
            setShowForm={setShowForm}
          />
        )}

        {editEmployee && (
          <EditEmployee
            employee={editEmployee}
            loadEmployees={loadEmployees}
            onClose={() => setEditEmployee(null)}
          />
        )}

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>₹ {employee.salary}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditEmployee(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEmployee(employee.employee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Employees;