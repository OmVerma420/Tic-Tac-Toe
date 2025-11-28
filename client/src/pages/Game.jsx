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
  const [playerTurn, setPlayerTurn] = useState(true);
  const [results, setResults] = useState([]);
  
  const [levelFinished, setLevelFinished] = useState(false);  // 🔥 FIX

  const nav = useNavigate();

  useEffect(() => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
    setLevelFinished(false);   // reset for next level
  }, [level]);

  useEffect(() => {
    if (levelFinished) return; // 🔥 prevent double results
    
    const cur = checkWinner(board);
    if (!cur) return;

    setLevelFinished(true);

    let result;
    if (cur === "X") result = "win";
    else if (cur === "O") result = "lose";
    else result = "draw";

    const finalList = [...results, { level, result }];
    setResults(finalList);

    setTimeout(() => {
      if (level < 5) {
        setLevel(level + 1);
      } else {
        nav("/result", { state: { results: finalList } });
      }
    }, 700);

  }, [board]);

  const handlePlayerMove = (idx) => {
    if (!playerTurn || board[idx] || levelFinished) return;

    const newBoard = [...board];
    newBoard[idx] = "X";
    setBoard(newBoard);
    setPlayerTurn(false);

    setTimeout(() => {
      const aiFn = aiMap[level];
      const aiMove = aiFn(newBoard, "O", "X");

      if (aiMove != null) {
        const b2 = [...newBoard];
        b2[aiMove] = "O";
        setBoard(b2);
      }

      setPlayerTurn(true);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center p-6 text-white">
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold">Level {level}</h2>
        <p className="text-gray-300 text-lg">Difficulty: {level}</p>
      </div>

      <div className="p-5 rounded-2xl bg-white/10 border-white/10">
        <Board board={board} onCellClick={handlePlayerMove} />
      </div>

      <h3 className="mt-6 text-gray-300">Results so far:</h3>
      <p className="text-sm text-purple-300 mt-1">
        {results.map(r => (
          <span key={r.level} className="mr-2 px-2 py-1 rounded-full bg-purple-900/40">
            L{r.level}: {r.result}
          </span>
        ))}
      </p>

    </div>
  );
}
