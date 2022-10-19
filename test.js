import Board from './board.js';

const logLength = (arr) => console.log(`The shortest path was ${arr.length - 1} move(s)`);
const logArray = (arr) => arr.forEach(el => console.log(el));

// Test cases

const test1 = Board.knightMoves([0, 0], [1, 2]);
logLength(test1);
logArray(test1);
// The shortest path was 1 move(s)
// { x: 1, y: 2 }
// { x: 0, y: 0 }

const test2 = Board.knightMoves([3, 3], [7, 6]);
logLength(test2);
logArray(test2);
// The shortest path was 3 move(s)
// { x: 7, y: 6 }
// { x: 5, y: 7 }
// { x: 4, y: 5 }
// { x: 3, y: 3 }

const test3 = Board.knightMoves([0, 0], [7, 7]);
logLength(test3);
logArray(test3);
// The shortest path was 6 move(s)
// { x: 7, y: 7 }
// { x: 5, y: 6 }
// { x: 4, y: 4 }
// { x: 3, y: 2 }
// { x: 2, y: 0 }
// { x: 1, y: 2 }
// { x: 0, y: 0 }