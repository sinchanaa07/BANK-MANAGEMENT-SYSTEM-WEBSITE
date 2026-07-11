import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    total_customers: 0,
    total_accounts: 0,
    total_balance: 0,
    active_loans: 0,
    total_employees: 0,
  });

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setDashboard(res.data))
      .catch((err) => console.log(err));

    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4 bg-light min-vh-100">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary">
              🏦 Bank Management System
            </h2>
            <p className="text-muted">
              Welcome, Admin 👋
            </p>
          </div>

          <div className="text-end">
            <h5>{dateTime.toLocaleDateString()}</h5>
            <h6>{dateTime.toLocaleTimeString()}</h6>
          </div>
        </div>

        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="card text-white bg-primary shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5>👥 Customers</h5>
                <h1>{dashboard.total_customers}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card text-white bg-success shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5>💳 Accounts</h5>
                <h1>{dashboard.total_accounts}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card text-dark bg-warning shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5>🏦 Active Loans</h5>
                <h1>{dashboard.active_loans}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card text-white bg-danger shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5>👨‍💼 Employees</h5>
                <h1>{dashboard.total_employees}</h1>
              </div>
            </div>
          </div>

        </div>

        <div className="row">

          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <h3 className="text-success">
                💰 Total Bank Balance
              </h3>

              <h1 className="display-4 fw-bold">
                ₹ {dashboard.total_balance}
              </h1>

              <hr />

              <h5 className="text-secondary">
                Banking Summary
              </h5>

              <p>✔ Customers Registered : {dashboard.total_customers}</p>
              <p>✔ Total Accounts : {dashboard.total_accounts}</p>
              <p>✔ Active Loans : {dashboard.active_loans}</p>
              <p>✔ Employees : {dashboard.total_employees}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4 p-4 text-center">

              <h4>👤 Admin Profile</h4>

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Admin"
                width="100"
                className="mx-auto my-3"
              />

              <h5>Sinchana K S</h5>

              <p className="text-muted">
                System Administrator
              </p>

              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/profile")}
              >
                Manage Profile
              </button>

            </div>
          </div>

        </div>

        <Footer />

      </div>
    </div>
  );
}

export default Dashboard;