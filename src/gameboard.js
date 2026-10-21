import { Ship } from './ship.js';

export const Gameboard = () => {
  const board = [];
  const ships = new Map();

  const occupiedCoordinates = [];

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

  function isCoordinatesOccupied(x, y) {
    for (let i = 0; i < occupiedCoordinates.length; i++) {
      if (occupiedCoordinates[i][0] === x && occupiedCoordinates[i][1] === y) {
        return true;
      }
    }
    return false;
  }

  function placeShip(length, name, points) {
    if (ships.has(name)) {
      return;
    }
    const ship = Ship(length, name);
    ships.set(ship.shipName(), ship);

    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];

      if (!isCoordinatesOccupied(x, y)) {
        board[x][y] = ship.shipName();
      } else {
        throw new Error('this coordinate is occupied');
      }
    }
    occupiedCoordinates.push(...points);
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
  return Object.freeze({
    getBoard,
    placeShip,
    getShips,
    receiveAttack,
    areShipsSunk,
    isShipAtCoordinates,
    getOccupiedCoordinates,
    isCoordinatesOccupied,
  });
};
