import React from "react";
import Cell from "./Cell";

export default function Board({ board, onCellClick }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 80px)",
      gridTemplateRows: "repeat(3, 80px)",
      gap: 0
    }}>
      {board.map((val, idx) => (
        <Cell key={idx} value={val} onClick={() => onCellClick(idx)} />
      ))}
    </div>
  );
}
