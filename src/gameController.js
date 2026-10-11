import { Player } from './player.js';
import { createCoordinates } from './helper.js';
export const gameController = (playerOneName) => {
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

  const players = [Player(playerOneName, 'human'), Player('computer', 'AI')];

  let activePlayer = players[0];

  let opponent = players[1];

  function switchPlayers() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    opponent = activePlayer === players[0] ? players[1] : players[0];
  }

  function sendShipsToPlayerBoard(ship, coordinates = null) {
    let board = activePlayer.getPlayerBoard();

    board.placeShip(ship.length, ship.name, coordinates);
  }

  function sendShipsToOpponentBoard(ship, coordinates = null) {
    let board = opponent.getPlayerBoard();

    board.placeShip(ship.length, ship.name, coordinates);
  }

  function playRound(coordinates) {
    opponent.getPlayerBoard().receiveAttack(coordinates);

    const result = winHandler();

    if (result) {
      console.log(`${activePlayer.getPlayerName()} Won`);
      return;
    } else {
      switchPlayers();
    }
    printRound();
  }

  function printRound() {
    console.log(activePlayer.getPlayerName());

    console.log(activePlayer.getPlayerBoard().getBoard());

    console.log(opponent.getPlayerName());

    console.log(opponent.getPlayerBoard().getBoard());
  }

  function placeShipsRandomly(playerOne = false, playerTwo = false) {
    for (let ship of ships) {
      let firstCoordinates = createCoordinates(
        ship.length,
        activePlayer.getPlayerBoard().isShipAtCoordinates
      );
      let secondCoordinates = createCoordinates(
        ship.length,
        opponent.getPlayerBoard().isShipAtCoordinates
      );
      if (playerOne) {
        sendShipsToPlayerBoard(ship, firstCoordinates);
      }
      if (playerTwo) {
        sendShipsToOpponentBoard(ship, secondCoordinates);
      }
    }
    console.log('player');
    console.log(activePlayer.getPlayerBoard().getBoard());

    console.log('opp');
    console.log(opponent.getPlayerBoard().getBoard());
  }

  function winHandler() {
    let playerBoard = activePlayer.getPlayerBoard();
    let opponentBoard = opponent.getPlayerBoard();

    if (playerBoard.areShipsSunk()) {
      return opponent.getPlayerName();
    } else if (opponentBoard.areShipsSunk()) {
      return activePlayer.getPlayerName();
    }

    return false;
  }
  return Object.freeze({
    sendShipsToPlayerBoard,
    sendShipsToOpponentBoard,
    playRound,
    placeShipsRandomly,
  });
};
