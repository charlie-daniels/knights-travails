import Board from './board.js';

let start;
let end;

function showPath(tiles, delay) {
    let gap = 70;
    let offset = Math.floor(Math.random() * (360 - gap));
    let colorIncrement = gap / tiles.length;
    for (const [i, t] of tiles.entries()){
        setTimeout(() => {
            t.style['background-color'] = `hsl(${Math.floor(i * colorIncrement) + offset}, 30%, ${i * 4 + 30}%)`;
        }, delay * i);
    }
    const tooltip = document.getElementById('tooltip');
    setTimeout(() => tooltip.style.opacity = 1, 3000);
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
        cover.style.display = 'block';
        let tilePath = trevail(start, end);
        showPath(tilePath.reverse(), 180);
    }
}

const board = document.getElementById('board');
const cover = document.getElementById('cover');

(function addListeners() {
    board.childNodes.forEach((tile) => {
        tile.addEventListener('click', () => onTileClick(tile, cover));
    });
    cover.addEventListener('click', () => location.reload());
})();

