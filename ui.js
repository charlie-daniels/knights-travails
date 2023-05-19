import Board from './board.js';

let start;
let end;

function showPath(tiles) {
    // hsl between 120 and 160
    let offset = 110;
    let gap = 70;
    let colorIncrement = gap / tiles.length;
    for (const [i, t] of tiles.entries()){
        t.style['background-color'] = `hsl(${(i * colorIncrement) + offset}, 30%, ${i * 4 + 30}%)`;
    }
}

function trevail(start, end) {
    const path = Board.knightMoves(start, end);
    let tilePath = [];
    path.forEach((node) => {
        const tile = document.querySelector(`[data-file="${node.x}"]` + `[data-rank="${node.y}"]`);
        tilePath.push(tile);
    })
    return tilePath;
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
        let tilePath = trevail(start, end);
        showPath(tilePath);
    }
}

const board = document.getElementById('board');
const cover = document.getElementById('cover');

(function addListeners() {
    board.childNodes.forEach((tile) => {
        tile.addEventListener("click", () => onTileClick(tile, cover));
    });
})();

