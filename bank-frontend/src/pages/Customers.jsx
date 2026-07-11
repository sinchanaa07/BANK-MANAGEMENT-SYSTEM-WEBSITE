import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddCustomer from "../components/AddCustomer";
import EditCustomer from "../components/EditCustomer";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    api
      .get("/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/customers/${id}`);
      loadCustomers();
      alert("Customer Deleted Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">Customers</h2>

        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          + Add Customer
        </button>

        {showForm && (
          <AddCustomer
            onClose={() => {
              setShowForm(false);
              loadCustomers();
            }}
          />
        )}

        {editCustomer && (
          <EditCustomer
            customer={editCustomer}
            onClose={() => {
              setEditCustomer(null);
              loadCustomers();
            }}
          />
        )}

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditCustomer(customer)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCustomer(customer.customer_id)}
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

export default Customers;