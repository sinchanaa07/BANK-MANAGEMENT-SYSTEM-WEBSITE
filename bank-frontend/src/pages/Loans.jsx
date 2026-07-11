import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddLoan from "../components/AddLoan";
import EditLoan from "../components/EditLoan";
import api from "../services/api";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editLoan, setEditLoan] = useState(null);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = () => {
    api
      .get("/loans")
      .then((res) => setLoans(res.data))
      .catch((err) => console.log(err));
  };

  const deleteLoan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this loan?")) return;

    try {
      await api.delete(`/loans/${id}`);
      alert("Loan Deleted Successfully");
      loadLoans();
    } catch (err) {
      console.log(err);
      alert("Failed to delete loan");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">Loans</h2>

        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          + Add Loan
        </button>

        {showForm && (
          <AddLoan
            loadLoans={loadLoans}
            setShowForm={setShowForm}
          />
        )}

        {editLoan && (
          <EditLoan
            loan={editLoan}
            loadLoans={loadLoans}
            onClose={() => setEditLoan(null)}
          />
        )}

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Interest %</th>
              <th>Status</th>
              <th>Issued Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan.loan_id}>
                <td>{loan.loan_id}</td>
                <td>{loan.customer_name}</td>
                <td>₹ {loan.amount}</td>
                <td>{loan.interest_rate}%</td>
                <td>{loan.status}</td>
                <td>{loan.issued_date?.substring(0, 10)}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditLoan(loan)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteLoan(loan.loan_id)}
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

export default Loans;