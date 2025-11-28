import React, { useState } from "react";

export default function AuthForm({ initial = {}, mode = "login", onSubmit }) {
  const [form, setForm] = useState({
    username: initial.username || "",
    email: initial.email || "",
    password: initial.password || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} style={{ maxWidth: 420 }}>
      {mode === "register" && (
        <div style={{ marginBottom: 8 }}>
          <label>Username</label><br />
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <label>Email</label><br />
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Password</label><br />
        <input name="password" type="password" value={form.password} onChange={handleChange} required />
      </div>

      <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
    </form>
  );
}
