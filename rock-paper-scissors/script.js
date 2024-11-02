const choices = document.querySelectorAll('.choice');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

const choicesMap = {
    rock: 'stone',
    paper: 'paper',
    scissors: 'scissor'
};

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    displayResult(playerChoice, computerChoice, result);
}

function getComputerChoice() {
    const choicesArray = Object.keys(choicesMap);
    const randomIndex = Math.floor(Math.random() * choicesArray.length);
    return choicesArray[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    }
    return 'You lose!';
}

function displayResult(playerChoice, computerChoice, result) {
    resultDisplay.textContent = `You chose ${choicesMap[playerChoice]}, Computer chose ${choicesMap[computerChoice]}. ${result}`;
}

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.id;
        playGame(playerChoice);
    });
});

resetButton.addEventListener('click', () => {
    resultDisplay.textContent = '';
});

// Initial setup
resultDisplay.textContent = '';
