import { Player } from './player.js';
import { createCoordinates, generatePairOfCoordinates } from './helper.js';
import { computer } from './computer.js';

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

  let playerOne = Player(playerOneName, 'human');
  let opponent = computer;

  function sendShipsToPlayerBoard(ship, coordinates = null) {
    let board = playerOne.getPlayerBoard();

    board.placeShip(ship.length, ship.name, coordinates);
  }

  function sendShipsToOpponentBoard(ship, coordinates = null) {
    let board = opponent.getPlayerBoard();

    board.placeShip(ship.length, ship.name, coordinates);
  }

  function playRound(coordinates) {
    let computerMove = opponent.makeComputerMove();
    playerOne.getPlayerBoard().receiveAttack(coordinates);
    opponent.getPlayerBoard().receiveAttack(computerMove);

    const result = winHandler();

    if (result) {
      console.log(`${playerOne.getPlayerName()} Won`);
      return;
    }
    printRound();
  }

  function printRound() {
    console.log(playerOne.getPlayerName());

    console.log(playerOne.getPlayerBoard().getBoard());

    console.log(opponent.getPlayerName());

    console.log(opponent.getPlayerBoard().getBoard());
  }

  function placeShipsRandomly(ship) {
    let coordinates = createCoordinates(
      ship.length,
      playerOne.getPlayerBoard().isCoordinatesOccupied
    );

    let secondCoordinates = createCoordinates(
      ship.length,
      opponent.getPlayerBoard().isCoordinatesOccupied
    );

    sendShipsToPlayerBoard(ship, coordinates);
    sendShipsToOpponentBoard(ship, secondCoordinates);
    console.log('player');
    console.log(playerOne.getPlayerBoard().getBoard());
    console.log('opponent');
    console.log(opponent.getPlayerBoard().getBoard());
  }

  function winHandler() {
    let playerBoard = playerOne.getPlayerBoard();
    let opponentBoard = opponent.getPlayerBoard();

    if (playerBoard.areShipsSunk()) {
      return opponent.getPlayerName();
    } else if (opponentBoard.areShipsSunk()) {
      return playerOne.getPlayerName();
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
