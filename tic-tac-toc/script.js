const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const statusDisplay = document.getElementById('status');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => cellClickHandler(index));
    gameBoard.appendChild(cell);
}

function cellClickHandler(index) {
    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    renderBoard();
    checkResult();
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'Draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    renderBoard();
    statusDisplay.textContent = '';
}

resetButton.addEventListener('click', resetGame);

for (let i = 0; i < 9; i++) {
    createCell(i);
}
