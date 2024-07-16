// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const messageDisplay = document.createElement('div');
    messageDisplay.id = 'message';
    document.querySelector('.game-container').appendChild(messageDisplay);

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
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

    const updateMessage = () => {
        messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
    };

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (gameState[index] !== '' || checkWinner()) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            messageDisplay.textContent = `Player ${currentPlayer} wins!`;
            highlightWinningCells();
        } else if (gameState.every(cell => cell !== '')) {
            messageDisplay.textContent = 'It\'s a tie!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateMessage();
        }
    };

    const checkWinner = () => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const highlightWinningCells = () => {
        winningCombinations.forEach(combination => {
            if (combination.every(index => gameState[index] === currentPlayer)) {
                combination.forEach(index => {
                    cells[index].classList.add('highlight');
                });
            }
        });
    };

    const restartGame = () => {
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('highlight');
        });
        currentPlayer = 'X';
        updateMessage();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    updateMessage();
});