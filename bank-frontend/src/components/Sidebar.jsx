import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaUniversity,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
  FaUserTie,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Sidebar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = "#121212";
      document.body.style.color = "#ffffff";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.style.background = "#f8f9fa";
      document.body.style.color = "#000000";
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`p-3 ${
        darkMode ? "bg-dark text-white" : "bg-primary text-white"
      }`}
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h3 className="text-center mb-4">🏦 Bank MS</h3>

      <div className="d-grid mb-3">
        <button
          className="btn btn-light"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <>
              <FaSun className="me-2" />
              Light Mode
            </>
          ) : (
            <>
              <FaMoon className="me-2" />
              Dark Mode
            </>
          )}
        </button>
      </div>

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            <FaTachometerAlt className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/customers">
            <FaUsers className="me-2" />
            Customers
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/accounts">
            <FaUniversity className="me-2" />
            Accounts
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/transactions">
            <FaMoneyCheckAlt className="me-2" />
            Transactions
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/loans">
            <FaHandHoldingUsd className="me-2" />
            Loans
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/employees">
            <FaUserTie className="me-2" />
            Employees
          </Link>
        </li>

        <li className="nav-item mt-5">
          <Link className="nav-link text-white" to="/">
            <FaSignOutAlt className="me-2" />
            Logout
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;