import Board from './board.js';

let start;
let end;


function trevail(start, end) {
    const path = Board.knightMoves(start, end);
    path.forEach((node) => {
        const tile = document.querySelector(`[data-file="${node.x}"]` + `[data-rank="${node.y}"]`);
        console.log(tile)
    })
}

function onTileClick(tile, cover) {
    if (start === undefined) {
        start = [Number(tile.dataset.file), Number(tile.dataset.rank)];
        tile.classList.add('start');
        cover.style.display = 'none';
    } else {
        end = [Number(tile.dataset.file), Number(tile.dataset.rank)];
        tile.classList.add('end');
        cover.style.display = 'block';
        trevail(start, end);
    }
}

const board = document.getElementById('board');
const cover = document.getElementById('cover');

(function addListeners() {
    board.childNodes.forEach((tile) => {
        tile.addEventListener("click", () => onTileClick(tile, cover));
    });
})();

