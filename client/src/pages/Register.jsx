import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async ({ username, email, password }) => {
    try {
      await register(username, email, password);
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-600 via-purple-700 to-blue-700 p-5">

    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md border border-white/20 animate-fadeIn">
      
      <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-xl">
        Create Your Account ✨
      </h2>

      <p className="text-center text-gray-200 mb-6">
        Register to start the 5-level Tic-Tac-Toe Tournament.
      </p>

      <AuthForm mode="register" onSubmit={handleSubmit} />
    </div>
  </div>
);

}
