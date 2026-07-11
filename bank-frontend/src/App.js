import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Loans from "./pages/Loans";
import Employees from "./pages/Employees";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Customers */}
        <Route path="/customers" element={<Customers />} />

        {/* Accounts */}
        <Route path="/accounts" element={<Accounts />} />

        {/* Transactions */}
        <Route path="/transactions" element={<Transactions />} />

        {/* Loans */}
        <Route path="/loans" element={<Loans />} />

        {/* Employees */}
        <Route path="/employees" element={<Employees />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;