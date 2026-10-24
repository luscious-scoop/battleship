import { Ship } from './ship.js';

export const Gameboard = () => {
  let board = [];
  const ships = new Map();

  let occupiedCoordinates = [];

  function createBoard() {
    for (let i = 0; i < 10; i++) {
      board.push([]);

      for (let j = 0; j < 10; j++) {
        board[i].push(null);
      }
    }
  }

  createBoard();

  function isShipAtCoordinates(x, y) {
    if (typeof board[x][y] === 'string') {
      return true;
    }
    return false;
  }

  function isCoordinatesOccupied(Coordinates) {
    if (occupiedCoordinates.length === 0) return false;

    for (let i = 0; i < Coordinates.length; i++) {
      for (let j = 0; j < occupiedCoordinates.length; j++) {
        if (
          Coordinates[i][0] === occupiedCoordinates[j][0] &&
          Coordinates[i][1] === occupiedCoordinates[j][1]
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function placeShip(length, name, points) {
    occupiedCoordinates.push(...points);

    const ship = Ship(length, name);

    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];

      board[x][y] = ship.shipName();
    }
    ships.set(ship.shipName(), ship);

    console.log('occupied Coordinates');
    console.log(occupiedCoordinates);
  }

  function receiveAttack(points) {
    const [x, y] = points;

    let isShip = typeof board[x][y] === 'string' ? true : false;

    if (isShip) {
      const ship = ships.get(board[x][y]);

      ship.hit();

      console.log('you hit the ship');
      board[x][y] = null;

      return true;
    }
    console.log('you missed');
    return false;
  }

  function areShipsSunk() {
    const shipsArray = Array.from(ships.values());

    for (const obj of shipsArray) {
      if (obj.isSunk() === false) {
        return false;
      }
    }

    return true;
  }

  const getBoard = () => board;

  const getShips = () => ships;
  const getOccupiedCoordinates = () => occupiedCoordinates;

  function clearBoard() {
    board = [];
    occupiedCoordinates = [];
    createBoard();
  }
  return Object.freeze({
    getBoard,
    placeShip,
    getShips,
    receiveAttack,
    areShipsSunk,
    isShipAtCoordinates,
    getOccupiedCoordinates,
    isCoordinatesOccupied,
    clearBoard,
  });
};
