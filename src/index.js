// import { Gameboard } from './gameboard.js';
import { gameController } from './gameController.js';

// const board = Gameboard();

// board.placeShip(3, 'bomber', [
//   [0, 0],
//   [0, 1],
//   [0, 2],
// ]);

// board.placeShip(4, 'carrier', [
//   [1, 0],
//   [1, 1],
//   [1, 2],
//   [1, 3],
// ]);

// board.receiveAttack([0, 0]);
// board.receiveAttack([0, 1]);
// board.receiveAttack([0, 2]);

// board.receiveAttack([1, 0]);
// board.receiveAttack([1, 1]);
// board.receiveAttack([1, 2]);
// board.receiveAttack([1, 3]);

// console.log(board.AreShipsSunk());

const game = gameController();

// game.sendShipsToPlayerBoard({ length: 3, name: 'bomber' }, [
//   [0, 0],
//   [0, 1],
//   [0, 2],
// ]);

// game.sendShipsToPlayerBoard({ length: 4, name: 'carrier' }, [
//   [2, 0],
//   [2, 1],
//   [2, 2],
//   [2, 3],
// ]);

// game.sendShipsToOpponentBoard({ length: 4, name: 'carrier' }, [
//   [2, 0],
//   [2, 1],
//   [2, 2],
//   [2, 3],
// ]);

// game.sendShipsToOpponentBoard({ length: 3, name: 'bomber' }, [
//   [0, 0],
//   [0, 1],
//   [0, 2],
// ]);
