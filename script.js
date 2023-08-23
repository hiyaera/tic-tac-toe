const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restrtbtn = document.querySelector(".restrtbtn");
const alertBox = document.querySelector(".alertBox");

// making variables
let currentPlayer = "X";
let nextPlayer = "O";
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;
// function to start game
const startGame = () => {
  gameCells.forEach((cell) => {
    cell.addEventListener('click', handleClick);
  });
}


const handleClick = (e) => {
  if (e.target.textContent === '') {
    e.target.textContent = playerTurn;

    if (checkWin()) {
      // console.log(`${playerTurn} is a winner!!!`);
      showAlert (`${playerTurn} is a winner!!!`)
      disableCells();
    }

    else if (checkTie()) {
      // console.log(`Its a Tie!`);
      showAlert(`Its a Tie!`);
      disableCells();

    } else {
      changePlayerTurn();
      showAlert(`Turn for player: ${playerTurn}`);
    }
  }
}

// function to change plyer's turn
const changePlayerTurn = () => {
    if (playerTurn === currentPlayer) {
      playerTurn = nextPlayer;
    } else {
      playerTurn = currentPlayer;
    }
    
  };

  // function to check winner
  const checkWin = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningConditions.length; i++) {
      const [pos1, pos2, pos3] = winningConditions[i];
      if (
        gameCells[pos1].textContent !== '' &&
        gameCells[pos1].textContent === gameCells[pos2].textContent &&
        gameCells[pos2].textContent === gameCells[pos3].textContent
      ) {
        return true;
      }
    }
    return false;
  }

  // function to check tie
  const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
      if (cell.textContent === '') {
        emptyCellsCount++;
      }
    });

    return emptyCellsCount === 0 && !checkWin();
  }

  // function to disble game after win or tie
  const disableCells = () => {
    gameCells.forEach(cell => {
      cell.removeEventListener('click', handleClick);
      cell.classList.add('disabled');
    });
  }

  // function to restart game
const restartgame = () =>{
  gameCells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('disabled');
  });
  startGame();
}

// function to show alert
  const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 4000);
  }

  restrtbtn.addEventListener('click', restartgame);

  // start game function
  startGame();
