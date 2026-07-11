import React from "react";

function Footer() {
  return (
    <footer
      style={{
        marginTop: "30px",
        background: "linear-gradient(90deg,#0d6efd,#2575fc)",
        color: "white",
        textAlign: "center",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h5 style={{ margin: "0" }}>🏦 Bank Management System</h5>

      <p style={{ margin: "5px 0" }}>
        © 2026 Bank Management System. All Rights Reserved.
      </p>

      <p style={{ margin: "0" }}>
        Developed by <strong>Sinchana K S</strong>
      </p>
    </footer>
  );
}

export default Footer;