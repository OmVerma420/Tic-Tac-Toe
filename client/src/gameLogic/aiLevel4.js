import checkWinner from "../utils/checkWinner";

function minimax(board, depth, isMaximizing, aiMark, playerMark) {
  const result = checkWinner(board);
  if (result === aiMark) return 10 - depth;
  if (result === playerMark) return depth - 10;
  if (result === "draw") return 0;

  if (depth >= 6) { // depth limit to keep it fast
    return 0;
  }

  if (isMaximizing) {
    let best = -Infinity;
    for (let i=0;i<9;i++) {
      if (!board[i]) {
        board[i] = aiMark;
        const score = minimax(board, depth+1, false, aiMark, playerMark);
        board[i] = null;
        best = Math.max(best, score);
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i=0;i<9;i++) {
      if (!board[i]) {
        board[i] = playerMark;
        const score = minimax(board, depth+1, true, aiMark, playerMark);
        board[i] = null;
        best = Math.min(best, score);
      }
    }
    return best;
  }
}

export default function aiLevel4(board, aiMark="O", playerMark="X") {
  let bestScore = -Infinity;
  let move = null;
  for (let i=0;i<9;i++){
    if (!board[i]) {
      board[i] = aiMark;
      const score = minimax(board, 0, false, aiMark, playerMark);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}
