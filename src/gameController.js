import { Player } from './player.js';

export const gameController = (playerOneName) => {
  const players = [Player(playerOneName, 'human'), Player('computer', 'AI')];

  let activePlayer = players[0];

  let opponent = players[1];

  function switchPlayers() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    opponent = activePlayer === players[0] ? players[1] : players[0];
  }

  function sendShipsToPlayerBoard(ship, coordinates) {
    let board = activePlayer.getPlayerBoard();

    board.placeShip(ship.length, ship.name, coordinates);
    console.log(board.getBoard());
  }

  function sendShipsToOpponentBoard(ship, coordinates) {
    let board = opponent.getPlayerBoard();

    board.placeShip(ship.length, ship.name, coordinates);
    console.log(board.getBoard());
  }

  function playRound(coordinates) {
    opponent.getPlayerBoard().receiveAttack(coordinates);

    switchPlayers();
  }

  return Object.freeze({
    sendShipsToPlayerBoard,
    sendShipsToOpponentBoard,
  });
};
