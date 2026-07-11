import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (
      email === "sinchanaks005@gmail.com" &&
      password === "123456"
    ) {
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-bg">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaUniversity size={60} className="bank-icon" />
        </motion.div>

        <h2 className="login-title">
          Bank Management System
        </h2>

        <p className="login-subtitle">
          Secure • Fast • Reliable
        </p>

        <form onSubmit={login}>
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="login-btn"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;