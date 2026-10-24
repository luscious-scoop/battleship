import { gameController } from './gameController.js';

export const display = () => {
  const game = gameController();

  const boardsContainer = document.querySelector('.boards-container');
  const randomizeBtn = document.querySelector('.randomize-btn');
  const deployBtn = document.querySelector('.deploy-btn');

  randomizeBtn.addEventListener('click', () => {
    placeShips();
    enableDeployButton();
  });

  deployBtn.addEventListener('click', startGame);

  function renderBoard(player) {
    const board = player.getPlayerBoard().getBoard();

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board');
    boardContainer.dataset.player = player.getPlayerName();

    for (let i = 0; i < board.length; i++) {
      let column = createDiv();

      column.classList.add('board-column');

      for (let j = 0; j < board.length; j++) {
        let square = createDiv();
        square.dataset.x = j;
        square.dataset.y = i;

        square.classList.add('board-square');

        column.appendChild(square);
      }
      boardContainer.appendChild(column);
    }
    boardsContainer.appendChild(boardContainer);
  }
  renderBoard(game.getPlayerOne());

  function createDiv() {
    return document.createElement('div');
  }

  function createShips() {
    const ships = game.getShips();

    const shipsElArray = [];
    for (const ship of ships) {
      let row = createDiv();

      row.classList.add('ship-row');

      row.dataset.name = ship.name;
      row.dataset.length = ship.length;

      for (let i = 0; i < ship.length; i++) {
        let square = createDiv();
        square.textContent = ship.length;

        square.classList.add('ship-square');
        row.appendChild(square);
      }

      shipsElArray.push(row);
    }
    return shipsElArray;
  }

  function clearBoardSquares() {
    const squares = document.querySelectorAll('.board-square');

    squares.forEach((square) => {
      square.textContent = '';
    });
  }

  function placeShips() {
    let ships = createShips();

    clearBoardSquares();
    game.clearPlayersBoard();

    ships.forEach((ship) => {
      let data = {
        name: ship.dataset.name,
        length: Number(ship.dataset.length),
      };
      let coordinates = game.placeShipsRandomly(data);

      let shipSquares = ship.querySelectorAll('.ship-square');

      shipSquares.forEach((square, i) => {
        let pairOfCoordinates = coordinates[i];

        let boardSquare = document.querySelector(
          `[data-x="${pairOfCoordinates[0]}"][data-y="${pairOfCoordinates[1]}"]`
        );
        boardSquare.appendChild(square);
      });
    });
  }

  function enableDeployButton() {
    let areShipsPlaced = game.areBothPlayersShipsPlaced();

    if (areShipsPlaced) {
      deployBtn.disabled = false;
    }
  }

  function startGame() {
    let opponent = game.getOpponent();
    renderBoard(opponent);

    let initialButtons = document.querySelector('.initial-screen-btns');
    initialButtons.style.display = 'none';

    let board = boardsContainer.querySelector('.board:nth-child(2)');
    board.addEventListener('click', (e) => {
      playGame(e);
    });
  }

  function playGame(e) {
    let x;
    let y;

    if (e.target.dataset.x && e.target.dataset.y) {
      x = Number(e.target.dataset.x);

      y = Number(e.target.dataset.y);
    } else {
      return;
    }

    game.playRound([x, y]);
    renderResultOnBoards();
  }

  function createDot(isHit) {
    const color = isHit === true ? 'red' : 'black';

    let dot = createDiv();

    dot.classList.add('dot');

    dot.style.backgroundColor = color;

    return dot;
  }

  function renderResultOnBoards() {
    let { playerAttackedCoordinates, opponentAttackedCoordinates } =
      game.getBothPlayersAttackedCoordinates();

    let playerBoard = document.querySelector('.board:first-child');

    let opponentBoard = document.querySelector('.board:nth-child(2)');

    for (let result of playerAttackedCoordinates) {
      let isHit = result.isHit;
      let coordinates = result.coordinates;
      let boardSquare = playerBoard.querySelector(
        `[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`
      );

      let dot = createDot(isHit);
      if (isHit) {
        let ship = boardSquare.querySelector('.ship-square');
        boardSquare.textContent = '';
        ship.textContent = '';

        ship.appendChild(dot);
        boardSquare.appendChild(ship);
      } else {
        boardSquare.textContent = '';
        boardSquare.appendChild(dot);
      }
    }

    for (let result of opponentAttackedCoordinates) {
      let isHit = result.isHit;
      let coordinates = result.coordinates;
      let boardSquare = opponentBoard.querySelector(
        `[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`
      );
      boardSquare.textContent = '';

      boardSquare.appendChild(createDot(isHit));
    }
  }
};
