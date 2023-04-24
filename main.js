let turn = "";
let rows = [];
let column;
let board = document.querySelector(".board");
let tiles;

// let x = new Array(6);

// for (let i = 0; i < x.length; i++) {
//   x[i] = new Array(7);
// }

// console.log(x);

let generateFirstTurn = () => {
  let randomNumber = Math.floor(Math.random() * 10);
  console.log(randomNumber);
  if (randomNumber < 5) {
    turn = "red";
    document.querySelector(".overlay").classList.add("red");
    document.querySelector(".current-coin").style.backgroundColor = "red";
    return;
  }

  if (randomNumber >= 5) {
    turn = "yellow";
    document.querySelector(".overlay").classList.add("yellow");
    document.querySelector(".current-coin").style.backgroundColor = "yellow";
    return;
  }

  return turn;
};

const generateBoard = () => {
  for (let row = 1; row <= 6; row++) {
    for (let column = 1; column <= 7; column++) {
      let tile = document.createElement("li");
      tile.classList.add("tile");
      tile.classList.add(`c${column}`);
      tile.classList.add(`r${row}`);
      board.append(tile);
    }
  }
  tiles = document.querySelectorAll(".tile");
  let r1 = tiles.slice(0, 7);
  let r2 = tiles.slice(7, 14);
  let r3 = tiles.slice(14, 21);
  let r4 = tiles.slice(21, 28);
  let r5 = tiles.slice(28, 35);
  let r6 = tiles.slice(35, 42);
  rows.push(r1);
  rows.push(r2);
  rows.push(r3);
  rows.push(r4);
  rows.push(r5);
  rows.push(r6);
};

const playNextTurn = (setTileEvent) => {
  document.querySelector(".overlay").classList.remove("yellow");
  document.querySelector(".overlay").classList.remove("red");
  console.log(setTileEvent);
  let selectedColumn = setTileEvent.target.className.charAt(11);
  console.log(selectedColumn);
  column = document.querySelectorAll(`.c${selectedColumn}`);

  for (let row = 0; row < column.length; row++) {
    if (column[row].style.backgroundColor === "" && turn === "red") {
      column[row].style.backgroundColor = "red";
      turn = "yellow";
      document.querySelector(".overlay").classList.add("yellow");
      document.querySelector(".current-coin").style.backgroundColor = "yellow";
      console.log(column[row]);
      checkWinner();
      return;
    }

    if (column[row].style.backgroundColor === "" && turn === "yellow") {
      column[row].style.backgroundColor = "yellow";
      turn = "red";
      document.querySelector(".overlay").classList.add("red");
      document.querySelector(".current-coin").style.backgroundColor = "red";
      checkWinner();
      return;
    }
  }
};

const checkWinner = () => {
  checkVerticalWinner();
  checkHorizontalWinner();
  // checkDiagonalWinner();
  // checkAntiDiagonalWinner();
};

const checkVerticalWinner = () => {
  for (let checkedColumn = 0; checkedColumn < 4; checkedColumn++) {
    if (column[checkedColumn].style.backgroundColor !== "") {
      if (
        column[checkedColumn].style.backgroundColor ===
          column[checkedColumn + 1].style.backgroundColor &&
        column[checkedColumn + 1].style.backgroundColor ===
          column[checkedColumn + 2].style.backgroundColor &&
        column[checkedColumn + 2].style.backgroundColor ===
          column[checkedColumn + 3].style.backgroundColor
      ) {
        displayGameOver();
        return;
      }
    }
  }
};

const checkHorizontalWinner = () => {
  for (let checkedRow = 0; checkedRow < 4; checkedRow++) {
    if (rows[checkedRow].style.backgroundColor !== "") {
      if (
        rows[checkedRow].style.backgroundColor ===
          rows[checkedRow + 1].style.backgroundColor &&
        rows[checkedRow + 1].style.backgroundColor ===
          rows[checkedRow + 2].style.backgroundColor &&
        rows[checkedRow + 2].style.backgroundColor ===
          rows[checkedRow + 3].style.backgroundColor
      ) {
        displayGameOver();
        return;
      }
    }
  }
};

// const checkHorizontalWinner = () => {
//   for (let column = 0; column < 4; column++) {
//     for (let row = 0; row < 6; row++) {
//       if (tiles[column][row].style.backgroundColor !== "") {
//         if (
//           tiles[column][row].style.backgroundColor ===
//             tiles[column + 1][row].style.backgroundColor &&
//           tiles[column + 1][row].style.backgroundColor ===
//             tiles[column + 2][row].style.backgroundColor &&
//           tiles[column + 2][row].style.backgroundColor ===
//             tiles[column + 3][row].style.backgroundColor
//         ) {
//           console.log(tiles[column][row]);
//           displayGameOver();
//           return;
//         }
//       }
//     }
//   }
// };

// const checkDiagonalWinner = () => {
//   for (let checkedRow = 1; checkedRow < 7; checkedRow++) {
//     for (let checkedColumn = 1; checkedColumn < 4; checkedColumn++) {
//       if (column[checkedRow][checkedColumn].style.backgroundColor !== "") {
//         console.log(column[checkedRow][checkedColumn]);
//         if (
//           board[checkedRow][checkedColumn] ===
//             board[checkedRow][checkedColumn + 1] &&
//           board[checkedRow][checkedColumn + 1] ===
//             board[checkedRow][checkedColumn + 2] &&
//           board[checkedRow][checkedColumn + 2] ===
//             board[checkedRow][checkedColumn + 3]
//         ) {
//           displayGameOver();
//           return;
//         }
//       }
//     }
//   }
// };

// const checkAntiDiagonalWinner = () => {
//   for (let checkedRow = 1; checkedRow < 7; checkedRow++) {
//     for (let checkedColumn = 1; checkedColumn < 4; checkedColumn++) {
//       if (column[checkedRow][checkedColumn].style.backgroundColor !== "") {
//         console.log(column[checkedRow][checkedColumn]);
//         if (
//           board[checkedRow][checkedColumn] ===
//             board[checkedRow][checkedColumn + 1] &&
//           board[checkedRow][checkedColumn + 1] ===
//             board[checkedRow][checkedColumn + 2] &&
//           board[checkedRow][checkedColumn + 2] ===
//             board[checkedRow][checkedColumn + 3]
//         ) {
//           displayGameOver();
//           return;
//         }
//       }
//     }
//   }
// };

const startConnectFourGame = () => {
  generateFirstTurn();
  generateBoard();
  document.addEventListener("click", playNextTurn);
};

startConnectFourGame();

const displayGameOver = () => {
  setTimeout(() => {
    document.querySelector(".overlay").classList.remove("yellow");
    document.querySelector(".overlay").classList.remove("red");
    alert("Enhorabuena");
  }, 1000);
};
