import BoardSquare from './boardsquare.js';

export default (() => {
  const toIndex = (pos) => ({
    x: pos[0],
    y: pos[1],
  });

  const createBoard = (width = 8) => {
    const board = Array(width).fill(null)
      .map(() => Array(width).fill(null));
    return board.map(((y, row) => y.map((_, col) => BoardSquare(toIndex([row, col])))));
  };

  const withinBounds = (index, bounds = 8) => !!(
    index.x < bounds
    && index.x >= 0
    && index.y < bounds
    && index.y >= 0
  );

  const createMoveTree = (board, root) => {
    const STEPS = [
      [1, -2], [1, 2],
      [2, -1], [2, 1],
      [-1, -2], [-1, 2],
      [-2, -1], [-2, 1],
    ];
    return STEPS.reduce((tree, move) => {
      const thisMove = toIndex([root.x + move[0], root.y + move[1]]);
      if (withinBounds(thisMove)) tree.push(board[thisMove.x][thisMove.y]);
      return tree;
    }, []);
  };

  const backtrack = (board, origin, path = []) => {
    path.push(origin.previous);
    if (board[origin.index.x][origin.index.y].distance === 1) return path;
    return backtrack(board, board[origin.previous.x][origin.previous.y], path);
  };

  const BFSRec = (board, queue, target) => {
    if (queue.length === 0) return null;
    const current = queue.shift();
    const adjacent = createMoveTree(board, current.index);
    if (JSON.stringify(current.index) === JSON.stringify(target)) {
      return backtrack(board, current, [current.index]);
    }
    adjacent.forEach((node) => {
      if (node.distance < current.distance && !node.previous) {
        node.distance = current.distance + 1;
        node.previous = current.index;
        queue.push(node);
      }
    });
    return BFSRec(board, queue, target);
  };

  const knightMoves = (origin, target) => {
    const indexOrigin = toIndex(origin);
    const targetOrigin = toIndex(target);
    const board = createBoard();
    const originNode = board[indexOrigin.x][indexOrigin.y];
    originNode.distance += 1;
    const queue = [originNode];
    const path = BFSRec(board, queue, targetOrigin);
    return path;
  };

  return { knightMoves };
})();
