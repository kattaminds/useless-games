const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 2;

let player1Score = 0;
let player2Score = 0;

function drawPaddle(x, y) {
    ctx.fillStyle = '#00ffcc';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
    ctx.fillStyle = '#00ffcc';
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2, false);
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = '#00ffcc';
    ctx.font = '20px Courier New';
    ctx.fillText(`Player 1: ${player1Score}`, 50, 30);
    ctx.fillText(`Player 2: ${player2Score}`, canvas.width - 150, 30);
}

function resetGame() {
    player1Y = canvas.height / 2 - paddleHeight / 2;
    player2Y = canvas.height / 2 - paddleHeight / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
    ballSpeedY = 2;
    player1Score = 0;
    player2Score = 0;
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY <= ballSize || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX >= canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX < 0) {
        player2Score++;
        resetGame();
    } else if (ballX > canvas.width) {
        player1Score++;
        resetGame();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, player1Y);
    drawPaddle(canvas.width - paddleWidth, player2Y);
    drawBall(ballX, ballY);
    drawScore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Player controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'w' && player1Y > 0) {
        player1Y -= 20;
    }
    if (event.key === 's' && player1Y < canvas.height - paddleHeight) {
        player1Y += 20;
    }
    if (event.key === 'ArrowUp' && player2Y > 0) {
        player2Y -= 20;
    }
    if (event.key === 'ArrowDown' && player2Y < canvas.height - paddleHeight) {
        player2Y += 20;
    }
});

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', resetGame);

// Start the game loop
gameLoop();
