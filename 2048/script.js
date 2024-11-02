const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const scoreDisplay = document.getElementById('score');

let boardData = [];
let score = 0;

function init() {
    boardData = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
    ];
    score = 0;
    addRandomTile();
    addRandomTile();
    renderBoard();
}

function addRandomTile() {
    const emptyTiles = [];
    boardData.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            if (tile === '') emptyTiles.push({ rowIndex, colIndex });
        });
    });
    const { rowIndex, colIndex } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    boardData[rowIndex][colIndex] = Math.random() < 0.9 ? 2 : 4;
}

function renderBoard() {
    board.innerHTML = '';
    boardData.forEach(row => {
        row.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            if (tile) {
                tileElement.classList.add(`tile-${tile}`);
                tileElement.textContent = tile;
            }
            board.appendChild(tileElement);
        });
    });
    scoreDisplay.textContent = `Score: ${score}`;
}

function slideAndMerge(row) {
    const newRow = row.filter(tile => tile !== '');
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            score += newRow[i];
            newRow.splice(i + 1, 1);
        }
    }
    return newRow.concat(Array(4 - newRow.length).fill(''));
}

function move(direction) {
    let moved = false;
    if (direction === 'up' || direction === 'down') {
        for (let col = 0; col < 4; col++) {
            const column = boardData.map(row => row[col]);
            const newColumn = direction === 'up' ? slideAndMerge(column) : slideAndMerge(column.reverse()).reverse();
            if (JSON.stringify(newColumn) !== JSON.stringify(column)) moved = true;
            for (let row = 0; row < 4; row++) {
                boardData[row][col] = newColumn[row];
            }
        }
    } else {
        for (let row = 0; row < 4; row++) {
            const newRow = direction === 'left' ? slideAndMerge(boardData[row]) : slideAndMerge(boardData[row].reverse()).reverse();
            if (JSON.stringify(newRow) !== JSON.stringify(boardData[row])) moved = true;
            boardData[row] = newRow;
        }
    }
    if (moved) {
        addRandomTile();
        renderBoard();
        if (checkGameOver()) {
            setTimeout(() => alert('Game Over!'), 100);
        }
    }
}

function checkGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (boardData[row][col] === '') return false;
            if (col < 3 && boardData[row][col] === boardData[row][col + 1]) return false;
            if (row < 3 && boardData[row][col] === boardData[row + 1][col]) return false;
        }
    }
    return true;
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
}

resetButton.addEventListener('click', init);
document.addEventListener('keydown', handleKeyPress);

init();
