"use client";
import React, { useState , useEffect } from "react";
import Admin_Access from "../components/Admin/index";
import Stafs_Access from "../components/Stafs/index";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("https://crud-with-mongo-express.onrender.com/api/Skynet/get-users");
        const data = await res.json();

        if (data.success) {
          setCustomers(data.data); // backend sends { success, data }
        } else {
          alert("Failed to fetch customers");
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
        alert("Error fetching customers");
      } 
    };

    fetchCustomers();
  }, []); 

  const handleLogin = (e) => {
    e.preventDefault();

    const adminMail = "admin@example.com";
    const staffMail = "staff@example.com";
    const dummyPassword = "123456";

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (email === adminMail && password === dummyPassword) {
      setRole("admin");
      setError("");
    } else if (email === staffMail && password === dummyPassword) {
      setRole("staff");
      setError("");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  if (role === "admin") return <Admin_Access customers={customers} />;
  if (role === "staff") return <Stafs_Access />;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #e0f2fe, #ffffff, #eff6ff)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          border: "1px solid #f0f0f0",
        }}
      >
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "8px",
            color: "#1e293b",
          }}
        >
          Welcome Back 👋
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#64748b",
            marginBottom: "20px",
          }}
        >
          Please login with your credentials to continue
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              fontSize: "14px",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px",
                color: "#334155",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                fontSize: "14px",
                color: "#1e293b",
                outline: "none",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "6px",
                color: "#334155",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                fontSize: "14px",
                color: "#1e293b",
                outline: "none",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "600",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(37, 99, 235, 0.4)",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Sign In
          </button>
        </form>

        {/* Dummy Info */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "12px",
            color: "#94a3b8",
            borderTop: "1px solid #f1f5f9",
            paddingTop: "12px",
          }}
        >
          <p>
            <b>Admin:</b> admin@example.com / 123456
          </p>
          <p>
            <b>Staff:</b> staff@example.com / 123456
          </p>
        </div>
      </div>
    </div>
  );
}
