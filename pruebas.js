let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;

let gameOver = false;
let board;

let totalRows = 6;
let totalColumns = 7;
let currentColumns = []; //keeps track of which row each column is at.

const setGame = () => {
  board = [];
  currentColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let row = 0; row < totalRows; row++) {
    let row = [];
    for (let column = 0; column < totalColumns; column++) {
      // JS
      row.push(" ");
      // HTML
      let tile = document.createElement("div");
      tile.id = row.toString() + "-" + column.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
};

setGame();

function setPiece() {
  if (gameOver) {
    return;
  }

  //get coords of that tile clicked
  let coords = selectedColumn.className.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  // figure out which row the current column should be on
  r = currentColumns[c];

  if (r < 0) {
    // board[r][c] != ' '
    return;
  }

  board[r][c] = currentPlayer; //update JS board
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer == playerRed) {
    tile.classList.add("red-piece");
    currentPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currentPlayer = playerRed;
  }

  r -= 1; //update the row height for that column
  currentColumns[c] = r; //update the array

  checkWinner();
}

function checkWinner() {
  // horizontal
  for (let row = 0; row < totalRows; row++) {
    for (let column = 0; column < totalColumns - 3; column++) {
      if (board[row][column] != " ") {
        if (
          tiles[row][column] == board[row][column + 1] &&
          board[row][column + 1] == board[row][column + 2] &&
          board[row][column + 2] == board[row][column + 3]
        ) {
          setWinner(row, column);
          return;
        }
      }
    }
  }

  // vertical
  for (let column = 0; column < totalColumns; column++) {
    for (let row = 0; row < totalRows - 3; row++) {
      if (board[row][column] != " ") {
        if (
          board[row][column] == board[row + 1][column] &&
          board[row + 1][column] == board[row + 2][column] &&
          board[row + 2][column] == board[row + 3][column]
        ) {
          setWinner(row, column);
          return;
        }
      }
    }
  }

  // anti diagonal
  for (let row = 0; row < totalRows - 3; row++) {
    for (let column = 0; column < totalColumns - 3; column++) {
      if (board[row][column] != " ") {
        if (
          board[row][column] == board[row + 1][column + 1] &&
          board[row + 1][column + 1] == board[row + 2][column + 2] &&
          board[row + 2][column + 2] == board[row + 3][column + 3]
        ) {
          setWinner(row, column);
          return;
        }
      }
    }
  }

  // diagonal
  for (let row = 3; row < totalRows; row++) {
    for (let column = 0; column < totalColumns - 3; column++) {
      if (board[row][column] != " ") {
        if (
          board[row][column] == board[row - 1][column + 1] &&
          board[row - 1][column + 1] == board[row - 2][column + 2] &&
          board[row - 2][column + 2] == board[row - 3][column + 3]
        ) {
          setWinner(row, column);
          return;
        }
      }
    }
  }
}

function setWinner(row, column) {
  let winner = document.getElementById("winner");
  if (board[row][column] == playerRed) {
    winner.innerText = "Red Wins";
  } else {
    winner.innerText = "Yellow Wins";
  }
  gameOver = true;
}
