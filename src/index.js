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

const ships = [
  {
    length: 5,
    name: 'battleship',
  },

  {
    length: 4,
    name: 'carrier',
  },

  {
    length: 3,
    name: 'bomber',
  },

  {
    length: 3,
    name: 'submarine',
  },

  {
    length: 2,
    name: 'boat',
  },

  {
    length: 2,
    name: 'sonar',
  },
];

const game = gameController();

game.sendShipsToPlayerBoard(ships[0], [
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
]);
game.sendShipsToOpponentBoard(ships[0], [
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
]);

game.playRound([4, 0]);
game.playRound([4, 1]);
game.playRound([4, 2]);
game.playRound([4, 3]);
game.playRound([4, 4]);

// human
// game.playRound([0, 0]);

// AI

// game.playRound([3, 0]);

// human

// game.playRound([0, 1]);

// Ai
// game.playRound([2, 0]);

//human
// game.playRound([0, 2]);

// AI
// game.playRound([7, 8]);

//human

// game.playRound([2, 0]);
//Ai
// game.playRound([3, 1]);
//human
// game.playRound([2, 1]);

//Ai
// game.playRound([4, 1]);
//human
// game.playRound([2, 2]);

//AI
// game.playRound([5, 0]);
//human
// game.playRound([2, 3]);
