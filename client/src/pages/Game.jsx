import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import checkWinner from "../utils/checkWinner";
import ai1 from "../gameLogic/aiLevel1";
import ai2 from "../gameLogic/aiLevel2";
import ai3 from "../gameLogic/aiLevel3";
import ai4 from "../gameLogic/aiLevel4";
import ai5 from "../gameLogic/aiLevel5";
import { useNavigate } from "react-router-dom";

const aiMap = {
  1: ai1,
  2: ai2,
  3: ai3,
  4: ai4,
  5: ai5,
};

export default function Game() {
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true); // player is 'X'
  const [results, setResults] = useState([]); // {level, result}
  const nav = useNavigate();

  useEffect(() => {
    // start level fresh
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
  }, [level]);

  useEffect(() => {
  const cur = checkWinner(board);
  if (!cur) return;

  let result;
  if (cur === "X") result = "win";
  else if (cur === "O") result = "lose";
  else result = "draw";

  // compute the next results array immediately (NO stale state)
  const updatedResults = [...results, { level, result }];

  setResults(updatedResults);

  const t = setTimeout(() => {
    if (level < 5) {
      setLevel(level + 1);
    } else {
      // USE updatedResults (NOT old results)
      nav("/result", { state: { results: updatedResults } });
    }
  }, 800);

  return () => clearTimeout(t);
}, [board]);


  const handlePlayerMove = (idx) => {
    if (!playerTurn || board[idx]) return;

    const newBoard = [...board];
    newBoard[idx] = "X";
    setBoard(newBoard);
    setPlayerTurn(false);

    // AI move after tiny delay
    setTimeout(() => {
      const aiFn = aiMap[level];
      const aiMove = aiFn(newBoard, "O", "X");
      if (aiMove != null) {
        const b2 = [...newBoard];
        b2[aiMove] = "O";
        setBoard(b2);
      } else {
        setBoard(newBoard);
      }
      setPlayerTurn(true);
    }, 300);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center p-6 text-white">
    
    {/* Header */}
    <div className="text-center mb-6">
      <h2 className="text-4xl font-bold tracking-wide drop-shadow-lg">
        Level {level}
      </h2>
      <p className="text-gray-300 text-lg mt-1">
        Difficulty: <span className="font-semibold text-purple-400">{level}</span>
      </p>
      <p className="text-gray-400 mt-1">
        Player: <span className="text-green-400">X</span> — AI: <span className="text-red-400">O</span>
      </p>
    </div>

    {/* Game Board */}
    <div className="flex justify-center my-6">
      <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/10">
        <Board board={board} onCellClick={handlePlayerMove} />
      </div>
    </div>

    {/* Results */}
    <div className="mt-6 text-center">
      <h3 className="text-lg text-gray-300">Results so far:</h3>
      <p className="text-sm text-purple-300 mt-1">
        {results.length
          ? results.map(r => (
              <span key={r.level} className="mr-2 px-2 py-1 rounded-full bg-purple-900/40">
                Level {r.level}: {r.result}
              </span>
            ))
          : "No results yet"}
      </p>
    </div>

  </div>
);

}
