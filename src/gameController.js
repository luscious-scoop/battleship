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
    printRound();
    switchPlayers();
  }

  function printRound() {
    console.log(activePlayer.getPlayerName());

    console.log(activePlayer.getPlayerBoard().getBoard());

    console.log(opponent.getPlayerName());

    console.log(opponent.getPlayerBoard().getBoard());
  }

  function winHandler() {
    let playerBoard = activePlayer.getPlayerBoard();
    let opponentBoard = activePlayer.getPlayerBoard();

    if (playerBoard.areShipsSunk()) {
      return activePlayer.getPlayerName();
    } else if (opponentBoard.areShipsSunk()) {
      return opponent.getPlayerName();
    }

    return false;
  }
  return Object.freeze({
    sendShipsToPlayerBoard,
    sendShipsToOpponentBoard,
  });
};
