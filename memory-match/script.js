const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const statusDisplay = document.getElementById('status');

let cardImages = [
    '🍎', '🍌', '🍇', '🍉', 
    '🍎', '🍌', '🍇', '🍉'
];
let cards = [];
let cardFlipped = [];
let matchCount = 0;
let isGameActive = true;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);
    card.addEventListener('click', () => cardClickHandler(card, index));
    cards.push(card);
    gameBoard.appendChild(card);
}

function cardClickHandler(card, index) {
    if (!isGameActive || cardFlipped.length >= 2 || card.textContent !== '') {
        return;
    }

    card.textContent = cardImages[index];
    cardFlipped.push(card);

    if (cardFlipped.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [firstCard, secondCard] = cardFlipped;

    if (firstCard.textContent === secondCard.textContent) {
        matchCount++;
        statusDisplay.textContent = `Match Found! Total Matches: ${matchCount}`;
    } else {
        firstCard.textContent = '';
        secondCard.textContent = '';
        statusDisplay.textContent = 'Try Again!';
    }

    cardFlipped = [];

    if (matchCount === cardImages.length / 2) {
        statusDisplay.textContent = 'Congratulations! You found all matches!';
        isGameActive = false;
    }
}

function resetGame() {
    matchCount = 0;
    isGameActive = true;
    cardFlipped = [];
    statusDisplay.textContent = '';
    gameBoard.innerHTML = '';
    cards = [];
    shuffle(cardImages);
    cardImages.forEach((_, index) => createCard(index));
}

resetButton.addEventListener('click', resetGame);

shuffle(cardImages);
cardImages.forEach((_, index) => createCard(index));
