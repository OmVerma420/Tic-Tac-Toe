import checkWinner from "../utils/checkWinner";

function winningMove(board, mark) {
  for (let i=0;i<9;i++){
    if (!board[i]) {
      const copy = [...board];
      copy[i] = mark;
      if (checkWinner(copy) === mark) return i;
    }
  }
  return null;
}

export default function aiLevel3(board, aiMark="O", playerMark="X") {
  // 1. win if possible
  const win = winningMove(board, aiMark);
  if (win !== null) return win;

  // 2. block opponent win
  const block = winningMove(board, playerMark);
  if (block !== null) return block;

  // 3. fallback: center -> corner -> side
  const pref = [4,0,2,6,8,1,3,5,7];
  for (const i of pref) if (!board[i]) return i;
  return null;
}
