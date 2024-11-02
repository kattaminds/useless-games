const wordDisplay = document.getElementById('wordDisplay');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const letterInput = document.getElementById('letterInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const statusMessage = document.getElementById('statusMessage');
const guessesLeftDisplay = document.getElementById('guessesLeft');

const words = ['CYBERPUNK', 'HACKER', 'COMPUTER', 'PROGRAMMING', 'NEON', 'FUTURISTIC'];
let selectedWord = '';
let guessedLetters = [];
let wrongLetters = [];
let maxGuesses = 6;

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongLetters = [];
    updateDisplay();
    guessesLeftDisplay.textContent = maxGuesses;
    statusMessage.textContent = '';
    letterInput.value = '';
}

function updateDisplay() {
    wordDisplay.textContent = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    wrongLettersDisplay.textContent = `Wrong Letters: ${wrongLetters.join(', ')}`;
}

function handleGuess() {
    const letter = letterInput.value.toUpperCase();
    letterInput.value = '';
    
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter) || letter.length !== 1) {
        return;
    }
    
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
    } else {
        wrongLetters.push(letter);
        maxGuesses--;
    }
    
    if (maxGuesses === 0) {
        statusMessage.textContent = `Game Over! The word was "${selectedWord}".`;
    }
    
    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        statusMessage.textContent = 'Congratulations! You guessed the word!';
    }
    
    updateDisplay();
    guessesLeftDisplay.textContent = maxGuesses;
}

guessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', initializeGame);
initializeGame();
