import { Gameboard } from '../src/gameboard.js';

let board;

beforeEach(() => {
  board = Gameboard();
});

test('check if ships are placed on correct coordinates', () => {
  board.placeShip(5, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  const boardArray = board.getBoard();

  expect(boardArray[0][0]).toBe('bomber');
  expect(boardArray[0][1]).toBe('bomber');
  expect(boardArray[0][2]).toBe('bomber');
  expect(boardArray[0][3]).toBe('bomber');
  expect(boardArray[0][4]).toBe('bomber');
});

test('check if ship receives an attack ', () => {
  board.placeShip(5, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 2]);
  board.receiveAttack([0, 4]);

  const ship = board.getPlacedShips().get('bomber');

  expect(ship.getLength()).toBeGreaterThan(0);
});

test('check if an attack misses ', () => {
  board.placeShip(5, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  board.receiveAttack([2, 3]);
  board.receiveAttack([3, 3]);
  board.receiveAttack([2, 2]);

  const boardArray = board.getBoard();

  expect(boardArray[2][3]).toBe(null);
  expect(boardArray[3][3]).toBe(null);
  expect(boardArray[2][2]).toBe(null);
});

test('check if  you hit a ship at a coordinate and you again hit that coordinate the value at the coordinate value is null ', () => {
  board.placeShip(5, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 0]);

  const boardArray = board.getBoard();

  expect(boardArray[0][0]).toBe(null);
});

test('check if you provide a coordinate that does not have a ship the attack misses ', () => {
  board.placeShip(5, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  board.receiveAttack([2, 2]);

  const boardArray = board.getBoard();

  expect(boardArray[2][2]).toBe(null);
});

test('check if all of the ships are not sunk', () => {
  board.placeShip(3, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  board.placeShip(4, 'carrier', [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
  ]);

  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]);

  board.receiveAttack([1, 0]);
  board.receiveAttack([1, 1]);
  board.receiveAttack([1, 2]);

  expect(board.areShipsSunk()).toBe(false);
});

test('check if all of the ships are  sunk', () => {
  board.placeShip(3, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  board.placeShip(4, 'carrier', [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
  ]);

  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);

  board.receiveAttack([1, 0]);
  board.receiveAttack([1, 1]);
  board.receiveAttack([1, 2]);
  board.receiveAttack([1, 3]);

  expect(board.areShipsSunk()).toBe(true);
});

test(' check if board   becomes empty ', () => {
  board.placeShip(3, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  board.clearBoard();

  expect(board.getBoard()[0][0]).toBe(null);
  expect(board.getBoard()[0][1]).toBe(null);
  expect(board.getBoard()[0][2]).toBe(null);
});

test(' check if attack array   becomes empty ', () => {
  board.placeShip(3, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  board.receiveAttack([0, 0]);
  board.clearBoard();
  let array = board.getAttackedCoordinates();

  expect(array.length).toBe(0);
});

test(' check if occupied coordinates array becomes empty ', () => {
  board.placeShip(3, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  board.receiveAttack([0, 0]);
  board.clearBoard();
  let array = board.getOccupiedCoordinates();

  expect(array.length).toBe(0);
});

test('check if coordinates are  occupied', () => {
  board.placeShip(3, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  let result = board.isCoordinatesOccupied([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  expect(result).toBe(true);
});

test('check if coordinates are not  occupied', () => {
  board.placeShip(3, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  let result = board.isCoordinatesOccupied([
    [8, 7],
    [8, 8],
    [8, 9],
  ]);

  expect(result).toBe(false);
});
