import { Ship } from './ship.js';

const Gameboard = () => {
  const board = [];

  function createBoard() {
    for (let i = 0; i < 10; i++) {
      board.push([]);

      for (let j = 0; j < 10; j++) {
        board[i].push(-1);
      }
    }
  }

  createBoard();

  const getBoard = () => board;
  return Object.freeze({
    getBoard,
  });
};

const board = Gameboard();
