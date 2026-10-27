import { Ship } from './ship.js';

export const Gameboard = () => {
  let board = [];
  const ships = new Map();

  let attackedCoordinates = [];

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
  }

  function receiveAttack(points) {
    const [x, y] = points;

    let isShip = typeof board[x][y] === 'string' ? true : false;

    let result = {
      isHit: false,
      coordinates: points,
    };

    if (isShip) {
      const ship = ships.get(board[x][y]);

      ship.hit();

      result.isHit = true;

      board[x][y] = null;

      console.log('you hit');
    } else {
      console.log('you missed');
    }
    attackedCoordinates.push(result);
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

  function clearBoard() {
    board = [];
    occupiedCoordinates = [];
    attackedCoordinates = [];
    createBoard();
  }

  const getBoard = () => board;
  const getShips = () => ships;
  const getOccupiedCoordinates = () => occupiedCoordinates;
  const isAllShipsPlaced = () =>
    occupiedCoordinates.length === 19 ? true : false;

  const getAttackedCoordinates = () => attackedCoordinates;

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
    isAllShipsPlaced,
    getAttackedCoordinates,
  });
};
