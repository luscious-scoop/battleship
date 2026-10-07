import { Gameboard } from './gameboard.js';

export const Player = (name = 'user', type) => {
  const board = Gameboard();

  const getPlayerBoard = () => board;

  const getPlayerName = () => name;
  const getPlayerType = () => type;
  return Object.freeze({
    getPlayerBoard,
    getPlayerName,
    getPlayerType,
  });
};
