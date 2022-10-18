const boardLocation = (index) => ({
  index,
  explored: false,
});

function toIndex(pos) {
  return {
    x: pos[0],
    y: pos[1],
  };
}

function createBoard(width = 8) {
  const board = Array(width).fill(null)
    .map(() => Array(width).fill(null));
  return board.map(((y, row) => y.map((_, col) => boardLocation(toIndex([row, col])))));
}

function withinBounds(index, bounds = 8) {
  return !!(index.x < bounds && index.x >= 0 && index.y < bounds && index.y >= 0);
}

function createMoveTree(board, root) {
  const STEPS = [
    [1, -2], [1, 2],
    [2, -1], [2, 1],
    [-1, -2], [-1, 2],
    [-2, -1], [-2, 1],
  ];
  const moves = STEPS.reduce((result, move) => {
    const thisMove = toIndex([root.x + move[0], root.y + move[1]]);
    if (withinBounds(thisMove)) result.push(board[thisMove.x][thisMove.y]);
    return result;
  }, []);
  return moves;
}

function BFSRec(board, queue, adjacent, target, path = []) {
  if (queue.length === 0) return;
  const current = queue.shift();
  path.push(current);
  if (current.index.x === target[0] && current.index.y === target[1]) console.log(path);
  adjacent.forEach((node) => {
    if (node.explored === false) {
      node.explored = true;
      queue.push(node);
    }
  });
  BFSRec(board, queue, createMoveTree(board, current.index), target, path);
}

function knightMoves(origin, target) {
  const board = createBoard();
  const adjacent = createMoveTree(board, toIndex(origin));
  const queue = [];
  adjacent.forEach((node) => {
    if (!node.explored) {
      node.explored = true;
      queue.push(node);
      BFSRec(board, queue, adjacent, target);
    }
  });
  return 0;
}

const origin = [3 - 1, 3 - 1];
const target = [2 - 1, 1 - 1];
const path = knightMoves(origin, target);
