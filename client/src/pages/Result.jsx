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
    <div>
      <h2>Tournament Result</h2>
      <p>Wins: {wins} | Losses: {losses} | Draws: {draws}</p>
      <h3>Winner: {winner}</h3>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => nav("/dashboard")}>Back to Dashboard</button>
      </div>
    </div>
  );
}
