export default function aiLevel2(board) {
  const preferred = [4,0,2,6,8,1,3,5,7];
  for (const i of preferred) {
    if (!board[i]) return i;
  }
  return null;
}
