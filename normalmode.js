const boxes = document.querySelectorAll('.box');
const gg = document.querySelector('.gg');
const turn = document.querySelector('.turn');
let board = ['', '', '', '', '', '', '', '', '']; // Empty board
let currentPlayer = 'o'; // Human is 'o', AI is 'x'
let gameOver = false;

// Function to check if a player has won
function checkWinner(board, player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Minimax function
function minimax(board, depth, isMaximizing) {
    const winner = checkWinner(board, 'o') ? 'o' : (checkWinner(board, 'x') ? 'x' : null);
    if (winner === 'o') return -10 + depth; // Human wins (minimizing player)
    if (winner === 'x') return 10 - depth; // AI wins (maximizing player)
    if (board.every(cell => cell !== '')) return 0; // Draw

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'x'; // AI move
                const eval = minimax(board, depth + 1, false);
                board[i] = ''; // Undo move
                maxEval = Math.max(maxEval, eval);
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'o'; // Human move
                const eval = minimax(board, depth + 1, true);
                board[i] = ''; // Undo move
                minEval = Math.min(minEval, eval);
            }
        }
        return minEval;
    }
}

// AI Move
function aiMove() {
    let bestMove = null;
    let bestValue = -Infinity;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'x'; // AI move
            const moveValue = minimax(board, 0, false);
            board[i] = ''; // Undo move
            if (moveValue > bestValue) {
                bestValue = moveValue;
                bestMove = i;
            }
        }
    }

    // Make the AI's move
    if (bestMove !== null) {
        board[bestMove] = 'x';
        boxes[bestMove].textContent = 'x';
        turn.textContent = 'o';
        checkGameOver();
    }
}

// Check if the game is over
function checkGameOver() {
    if (checkWinner(board, 'x')) {
        console.log('AI wins!');
        gg.style.display = 'flex';
        document.querySelector('.board').textContent = 'AI wins';
        gameOver = true;
    } else if (checkWinner(board, 'o')) {
        console.log('Human wins!');
        gg.style.display = 'flex';
        document.querySelector('.board').textContent = 'You win!';
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        console.log('Draw!');
        gg.style.display = 'flex';
        document.querySelector('.board').textContent = 'Draw!';
        gameOver = true;
    }
}

// Human Move
function humanMove(index) {
    if (!gameOver && board[index] === '') {
        board[index] = 'o';
        boxes[index].textContent = 'o';
        turn.textContent = 'x';
        checkGameOver();
        if (!gameOver) aiMove();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (!gameOver && board[index] === '') {
            humanMove(index);
        }
    });
});

gg.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = '';
    }
    gg.style.display = '';
    turn.textContent = 'o';
    aiMove(); // Start with AI's move if desired
});