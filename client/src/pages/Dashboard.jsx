import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 p-5">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-md w-full text-center border border-white/20">

        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Welcome, {user?.username} 👋
        </h2>

        <p className="text-white/90 mt-3 text-lg">
          Play a 5-level Tic-Tac-Toe tournament.
          <br />Each level increases the difficulty.
        </p>

        <Link to="/game">
          <button className="mt-6 w-full py-3 rounded-xl bg-white text-purple-700 font-semibold text-lg shadow-md hover:bg-purple-100 transition-all duration-300 hover:scale-105">
            🎮 Start Tournament
          </button>
        </Link>
      </div>
    </div>
  );
}
