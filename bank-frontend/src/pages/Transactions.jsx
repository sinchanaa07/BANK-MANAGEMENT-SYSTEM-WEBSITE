import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddTransaction from "../components/AddTransaction";
import api from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    api
      .get("/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">Transactions</h2>

        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          + New Transaction
        </button>

        {showForm && (
          <AddTransaction
            onClose={() => {
              setShowForm(false);
              loadTransactions();
            }}
          />
        )}

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Account Number</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.account_number}</td>
                <td>{transaction.customer_name}</td>
                <td>{transaction.transaction_type}</td>
                <td>₹ {transaction.amount}</td>
                <td>{transaction.transaction_date}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Transactions;