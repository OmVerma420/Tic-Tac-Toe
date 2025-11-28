import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-700 to-black p-5">

    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md border border-white/20 animate-fadeIn">
      
      <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-xl">
        Welcome Back 👋
      </h2>

      <p className="text-center text-gray-200 mb-6">
        Login to continue and play the tournament.
      </p>

      <AuthForm mode="login" onSubmit={handleSubmit} />

    </div>
  </div>
);

}
