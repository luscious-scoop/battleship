import { Player } from './player.js';

export const gameController = (playerOneName) => {
  const players = [Player(playerOneName, 'human'), Player('computer', 'AI')];

  let activePlayer = players[0];

  let opponent = players[1];

  function switchPlayers() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    opponent = activePlayer === players[0] ? players[1] : players[0];
  }

  function sendShipsToBoard() {}
};
