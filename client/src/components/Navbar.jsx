import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between",
      padding: "10px 20px", borderBottom: "1px solid #eee"
    }}>
      <div>
        <Link to="/dashboard" style={{ marginRight: 12 }}>Dashboard</Link>
        {user && <Link to="/game">Play</Link>}
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>{user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
