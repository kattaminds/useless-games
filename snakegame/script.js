const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const statusDisplay = document.getElementById('status');

const box = 20; // Size of the grid
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = '';
let food = spawnFood();
let score = 0;
let game;

function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(food.x, food.y, box, box);
    
    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#00ffcc' : '#00b3a6';
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = '#00ffcc';
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    // Move snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check for collision with food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop(); // Remove the last segment
    }

    // Check for collision with walls or itself
    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvas.width || snakeY >= canvas.height ||
        snake.some(segment => segment.x === snakeX && segment.y === snakeY)
    ) {
        clearInterval(game);
        statusDisplay.textContent = 'Game Over! Score: ' + score;
        return;
    }

    // Add new head to the snake
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
}

function changeDirection(event) {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function resetGame() {
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = '';
    food = spawnFood();
    score = 0;
    statusDisplay.textContent = '';
    clearInterval(game);
    game = setInterval(draw, 100);
}

resetButton.addEventListener('click', resetGame);
document.addEventListener('keydown', changeDirection);

game = setInterval(draw, 100);
