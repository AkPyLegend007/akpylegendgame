// Get references to HTML elements
const statusDisplay = document.getElementById('status');
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const themeToggle = document.getElementById('themeToggle');
const skinSelect = document.getElementById('skinSelect');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');

// Game variables
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let isDarkTheme = false;
let playerXScore = 0;
let playerOScore = 0;

// Winning conditions
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

// Messages
const WIN_MESSAGE = () => `Player ${currentPlayer} has won!`;
const DRAW_MESSAGE = () => `Game ended in a draw!`;
const CURRENT_PLAYER_TURN = () => `Player ${currentPlayer}'s turn`;

// Set initial status
statusDisplay.textContent = CURRENT_PLAYER_TURN();

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Handle cell played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

// Handle result validation
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    function updateScore() {
        if (currentPlayer === "X") {
            playerXScore++;
            playerXScoreDisplay.textContent = playerXScore;
        } else {
            playerOScore++;
            playerOScoreDisplay.textContent = playerOScore;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = WIN_MESSAGE();
        gameActive = false;
        updateScore();
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.textContent = DRAW_MESSAGE();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

// Handle player change
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = CURRENT_PLAYER_TURN();
}

// Handle reset game
function handleResetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = CURRENT_PLAYER_TURN();
    cells.forEach(cell => {
        cell.classList.remove("x", "o");
    });
}

// Toggle theme
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle("dark-theme");
    themeToggle.textContent = isDarkTheme ? "Light Theme" : "Dark Theme";
}

// Change skin
function changeSkin(skin) {
    document.body.classList.remove("default", "retro", "neon");
    document.body.classList.add(skin);
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);
themeToggle.addEventListener('click', toggleTheme);
skinSelect.addEventListener('change', (event) => changeSkin(event.target.value));

// Set default skin
changeSkin("default");
