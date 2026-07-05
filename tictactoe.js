const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function renderBoard() {
  boardEl.innerHTML = board
    .map((cell, i) => `<div class="cell" data-index="${i}">${cell}</div>`)
    .join('');

  document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });
}

function handleCellClick(e) {
  const index = Number(e.target.dataset.index);
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();
  checkResult();
}

function checkResult() {
  const winner = winPatterns.find((pattern) =>
    pattern.every((idx) => board[idx] === currentPlayer)
  );

  if (winner) {
    statusEl.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusEl.textContent = "Player X's turn";
  renderBoard();
}

resetBtn.addEventListener('click', resetGame);
renderBoard();
