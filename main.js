const cells = document.querySelectorAll(".cell");
const titleHeader = document.querySelector("h2");
const xPlayerDisplay = document.querySelector("#xPlayerDisplay");
const oPlayerDisplay = document.querySelector("#oPlayerDisplay");
const restartBtn = document.querySelector("#restarBtn");

// Initialize variables for the game

let player = "X";
let isPauseGame = false;
let isGameStart = false;

// Array of win condition
const inputCells = ["", "", "", "", "", "", "", "", ""];

// Array of win condition
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], //rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Add click event Listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => tapCell(cell, index));
});
function tapCell(cell, index) {
  // Ensure cell is empty and game isn't pause
  if (cell.textContent == "" && !isPauseGame) {
    isGameStart = true;
    updateCell(cell, index);
    // Do  a random pick if there are no results
    if (!checkWinner()) {
      ChangePlayer();
    }
  }
}
function updateCell(cell, index) {
  cell.textContent = player;
  inputCells[index] = player;
  cell.style.color = player == "X" ? "#1892EA" : "#A737FF";
}
function ChangePlayer() {
  player = player == "X" ? "O" : "X";
}

function checkWinner() {
  for (const [a, b, c] of winCondition) {
    if (
      inputCells[a] === player &&
      inputCells[b] === player &&
      inputCells[c] === player
    ) {
      declareWinner([a, b, c]);
      return true;
    }
  }
  if (inputCells.every((cell) => cell !== "")) {
    declareDraw();
    return true;
  }
  return false;
}

function declareWinner(winningIndices) {
  titleHeader.textContent = `${player} Win`;
  isPauseGame = true;

  // HighLight Winning cells
  winningIndices.forEach((index) => {
    cells[index].style.background = "#2a2343";
  });
  restartBtn.style.visibility = "visible";
}
function declareDraw() {
  titleHeader.textContent = "Draw!";
  isPauseGame = true;
  restartBtn.style.visibility = "visible";
}
function ChoosePlayer(selectedPlayer) {
  //Ensure The game hasn't started
  if (!isGameStart) {
    //Override The selected player value
    player = selectedPlayer;
    if (player == "X") {
      xPlayerDisplay.classList.add("player-active");
      oPlayerDisplay.classList.remove("player-active");
    } else {
      oPlayerDisplay.classList.add("player-active");
      xPlayerDisplay.classList.remove("player-active");
    }
  }
}
restartBtn.addEventListener("click", () => {
  restartBtn.style.visibility = "hidden";
  inputCells.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "";
  });
  isGameStart = false;
  isPauseGame = false;
  titleHeader.textContent = "Choose";
});
