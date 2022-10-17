function createBoard(width = 8) {
  return Array(width).fill(null).map(() => Array(width).fill(null));
}

function toPosition(pos) {
  return {
    x: pos[0] - 1,
    y: pos[1] - 1,
  };
}

function withinBounds(pos, bounds = 8) {
  return !!(pos.x < bounds && pos.x >= 0 && pos.y < bounds && pos.y >= 0);
}

function createKnight(board, pos = toPosition([0, 0])) {
  const newBoard = board;
  if (withinBounds(pos)) newBoard[pos.y][pos.x] = 1;
  return newBoard;
}
