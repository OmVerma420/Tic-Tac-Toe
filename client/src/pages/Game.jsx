import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import checkWinner from "../utils/checkWinner";
import ai1 from "../gameLogic/aiLevel1";
import ai2 from "../gameLogic/aiLevel2";
import ai3 from "../gameLogic/aiLevel3";
import ai4 from "../gameLogic/aiLevel4";
import ai5 from "../gameLogic/aiLevel5";
import { useNavigate } from "react-router-dom";

const aiMap = { 1: ai1, 2: ai2, 3: ai3, 4: ai4, 5: ai5 };

export default function Game() {
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [results, setResults] = useState([]);
  const [isLevelDone, setIsLevelDone] = useState(false);
  const nav = useNavigate();

  // Reset board when level changes
  useEffect(() => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
    setIsLevelDone(false);
  }, [level]);

  // Check winner after each move
  useEffect(() => {
    if (isLevelDone) return;

    const cur = checkWinner(board);
    if (!cur) return;

    setIsLevelDone(true);

    let result =
      cur === "X" ? "win" : cur === "O" ? "lose" : "draw";

    setResults(prev => {
      const updated = [...prev, { level, result }];

      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          nav("/result", { state: { results: updated } });
        }
      }, 600);

      return updated;
    });
  }, [board]);

  // AI turn handler (runs only when it's AI's turn)
  useEffect(() => {
    if (isLevelDone) return;
    if (playerTurn) return; // wait for player's move

    const aiFn = aiMap[level];

    setTimeout(() => {
      const move = aiFn(board, "O", "X");
      if (move != null) {
        setBoard(prev => {
          const b = [...prev];
          b[move] = "O";
          return b;
        });
      }
      setPlayerTurn(true);
    }, 300);
  }, [playerTurn, level, board, isLevelDone]);

  const handlePlayerMove = (idx) => {
    if (!playerTurn || board[idx] || isLevelDone) return;

    setBoard(prev => {
      const b = [...prev];
      b[idx] = "X";
      return b;
    });

    setPlayerTurn(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center text-white p-6">
      <h2 className="text-4xl font-bold mb-4">Level {level}</h2>

      <div className="p-5 bg-white/10 rounded-xl shadow-xl">
        <Board board={board} onCellClick={handlePlayerMove} />
      </div>

      <p className="text-purple-300 mt-4">
        Results so far: {JSON.stringify(results)}
      </p>
    </div>
  );
}
