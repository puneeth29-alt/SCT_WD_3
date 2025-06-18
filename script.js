let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusDisplay.textContent = `Player ${board[a]} wins!`;
      gameActive = false;
      return;
    }
  }
  if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  }
}

function handleClick(event) {
  const index = event.target.dataset.index;
  if (!board[index] && gameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  statusDisplay.textContent = "";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
