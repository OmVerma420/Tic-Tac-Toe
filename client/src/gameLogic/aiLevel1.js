export default function aiLevel1(board) {
  const empties = board.map((v,i) => v ? null : i).filter(v => v !== null);
  if (!empties.length) return null;
  return empties[Math.floor(Math.random() * empties.length)];
}
