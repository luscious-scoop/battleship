import { gameController } from './gameController.js';

export const display = () => {
  const game = gameController();

  const boardsContainer = document.querySelector('main');

  function renderBoard(player) {
    const board = player.getPlayerBoard().getBoard();

    const boardContainer = document.createElement('div');
    boardContainer.dataset.player = player.getPlayerName();

    for (let i = 0; i < board.length; i++) {
      let row = createDiv();

      row.classList.add('board-row');

      for (let j = 0; j < board.length; j++) {
        let square = createDiv();
        square.dataset.x = i;
        square.dataset.y = j;

        square.classList.add('board-square');

        row.append(square);
      }
      boardContainer.appendChild(row);
    }
    boardsContainer.appendChild(boardContainer);
  }

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

        square.classList.add('ship-square');
        row.appendChild(square);
      }

      shipsElArray.push(row);
    }
    return shipsElArray;
  }
};
