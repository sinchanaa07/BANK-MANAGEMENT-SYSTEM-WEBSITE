import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddAccount from "../components/AddAccount";
import EditAccount from "../components/EditAccount";
import api from "../services/api";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAccount, setEditAccount] = useState(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    api
      .get("/accounts")
      .then((res) => setAccounts(res.data))
      .catch((err) => console.log(err));
  };

  const deleteAccount = async (accountNumber) => {
    if (!window.confirm("Delete this account?")) return;

    try {
      await api.delete(`/accounts/${accountNumber}`);
      alert("Account Deleted Successfully!");
      loadAccounts();
    } catch (err) {
      console.log(err);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">Accounts</h2>

        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          + Add Account
        </button>

        {showForm && (
          <AddAccount
            onClose={() => {
              setShowForm(false);
              loadAccounts();
            }}
          />
        )}

        {editAccount && (
          <EditAccount
            account={editAccount}
            onClose={() => {
              setEditAccount(null);
              loadAccounts();
            }}
          />
        )}

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Account Number</th>
              <th>Customer</th>
              <th>Account Type</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => (
              <tr key={account.account_number}>
                <td>{account.account_number}</td>
                <td>{account.customer_name}</td>
                <td>{account.account_type}</td>
                <td>₹ {account.balance}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditAccount(account)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteAccount(account.account_number)}
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

export default Accounts;