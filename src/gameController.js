import { Player } from './player.js';
import { createCoordinates } from './helper.js';
import { computer } from './computer.js';

export const gameController = (playerOneName = 'user') => {
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
    opponent.getPlayerBoard().receiveAttack(coordinates);
    playerOne.getPlayerBoard().receiveAttack(computerMove);

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

    console.log(playerOne.getPlayerBoard().getAttackedCoordinates());

    console.log(opponent.getPlayerName());

    console.log(opponent.getPlayerBoard().getBoard());
    console.log(opponent.getPlayerBoard().getAttackedCoordinates());
  }

  function placeShipsRandomly(ship) {
    let playerCallback = playerOne.getPlayerBoard().isCoordinatesOccupied;
    let opponentCallback = opponent.getPlayerBoard().isCoordinatesOccupied;
    let coordinates = createCoordinates(ship.length, playerCallback);

    let secondCoordinates = createCoordinates(ship.length, opponentCallback);

    sendShipsToPlayerBoard(ship, coordinates);
    sendShipsToOpponentBoard(ship, secondCoordinates);

    console.log('player coordinates');
    console.log(coordinates);
    console.log('opponent coordinates');
    console.log(secondCoordinates);
    return coordinates;
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

  function clearPlayersBoard() {
    playerOne.getPlayerBoard().clearBoard();
    opponent.getPlayerBoard().clearBoard();
  }

  function areBothPlayersShipsPlaced() {
    let isPlayerOneShipsPlaces = playerOne.getPlayerBoard().isAllShipsPlaced();
    let isOpponentShipsPlaced = opponent.getPlayerBoard().isAllShipsPlaced();
    if (isPlayerOneShipsPlaces && isOpponentShipsPlaced) {
      return true;
    }
    return false;
  }

  const getPlayerOne = () => playerOne;
  const getOpponent = () => opponent;
  const getShips = () => ships;

  function getBothPlayersAttackedCoordinates() {
    let playerAttackedCoordinates = playerOne
      .getPlayerBoard()
      .getAttackedCoordinates();
    let opponentAttackedCoordinates = opponent
      .getPlayerBoard()
      .getAttackedCoordinates();

    return {
      playerAttackedCoordinates,
      opponentAttackedCoordinates,
    };
  }

  return Object.freeze({
    sendShipsToPlayerBoard,
    sendShipsToOpponentBoard,
    playRound,
    placeShipsRandomly,
    getPlayerOne,
    getOpponent,
    getShips,
    clearPlayersBoard,
    areBothPlayersShipsPlaced,
    getBothPlayersAttackedCoordinates,
  });
};
