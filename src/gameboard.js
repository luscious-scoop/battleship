import { Ship } from './ship.js';

const Gameboard = () => {
  const board = [];
  const ships = new Map();

  function createBoard() {
    for (let i = 0; i < 10; i++) {
      board.push([]);

      for (let j = 0; j < 10; j++) {
        board[i].push(-1);
      }
    }
  }

  createBoard();

  function placeShip(ship, points) {
    if (ships.has(ship.shipName())) {
      return;
    }

    ships.set(ship.shipName(), ship);

    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];

      if (typeof board[x][y] === 'string') {
        continue;
      }

      board[x][y] = ship.shipName();
    }
  }

  const getBoard = () => board;
  return Object.freeze({
    getBoard,
    placeShip,
  });
};

const board = Gameboard();

board.placeShip(Ship(5, 'bomber'), [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]);

board.placeShip(Ship(4, 'carrier'), [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
]);

console.log(board.getBoard());
