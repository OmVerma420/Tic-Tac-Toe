import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Result() {
  const location = useLocation();
  const nav = useNavigate();
  const results = location.state?.results || [];

  // compute winner
  const wins = results.filter(r => r.result === "win").length;
  const losses = results.filter(r => r.result === "lose").length;
  const draws = results.filter(r => r.result === "draw").length;

  const winner = wins > losses ? "Player" : losses > wins ? "AI" : "Tie";

  useEffect(() => {
    // attempt to save to backend
    const save = async () => {
      try {
        await api.post("/game/save", { levelResults: results });
      } catch (err) {
        // ignore errors — it's optional
        console.error("Failed to save game:", err?.response?.data || err.message);
      }
    };
    if (results.length) save();
  }, []); // eslint-disable-line

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-indigo-800 p-6 text-white">

    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-10 w-full max-w-lg text-center animate-fadeIn">
      
      {/* Title */}
      <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
        Tournament Result 🏆
      </h2>

      {/* Stats */}
      <div className="flex justify-center gap-4 my-6">
        <div className="px-4 py-2 bg-green-500/20 rounded-xl border border-green-400/30">
          <span className="font-bold text-green-300">Wins:</span> {wins}
        </div>

        <div className="px-4 py-2 bg-red-500/20 rounded-xl border border-red-400/30">
          <span className="font-bold text-red-300">Losses:</span> {losses}
        </div>

        <div className="px-4 py-2 bg-yellow-500/20 rounded-xl border border-yellow-400/30">
          <span className="font-bold text-yellow-300">Draws:</span> {draws}
        </div>
      </div>

      {/* Winner */}
      <h3
        className={`text-3xl font-extrabold mt-4 drop-shadow-xl ${
          winner === "Player" ? "text-green-400" :
          winner === "AI" ? "text-red-400" :
          "text-yellow-300"
        }`}
      >
        {winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`}
      </h3>

      {/* Back Button */}
      <button
        onClick={() => nav("/dashboard")}
        className="mt-8 w-full py-3 rounded-xl bg-white text-purple-700 font-semibold text-lg shadow-md hover:bg-purple-100 transition-all duration-300 hover:scale-105"
      >
        Back to Dashboard
      </button>

    </div>
  </div>
);

}
