import { Player } from './player.js';

export const gameController = (playerOneName) => {
  const players = [Player(playerOneName, 'human'), Player('computer', 'AI')];
};
