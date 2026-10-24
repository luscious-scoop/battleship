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
};
