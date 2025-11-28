import React from "react";

export default function Cell({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 80, height: 80, fontSize: 32, display: "flex",
        alignItems: "center", justifyContent: "center", border: "1px solid #ddd",
        background: "#fff", cursor: value ? "default" : "pointer"
      }}
      disabled={Boolean(value)}
    >
      {value}
    </button>
  );
}
