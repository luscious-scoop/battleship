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

test('check if ships are not  overwritten on given  coordinates if a ship already exists', () => {
  board.placeShip(5, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  board.placeShip(5, 'carrier', [
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

  const boardArray = board.getBoard();

  expect(boardArray[0][0]).toBe(1);
  expect(boardArray[0][2]).toBe(1);
  expect(boardArray[0][4]).toBe(1);
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

  expect(boardArray[2][3]).toBe(0);
  expect(boardArray[3][3]).toBe(0);
  expect(boardArray[2][2]).toBe(0);
});

test('check if  you hit a ship at a coordinate and you again hit that coordinate the value at the coordinate value remains 1 ', () => {
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

  expect(boardArray[0][0]).toBe(1);
});

test.only('check if you provide a coordinate that does not have a ship the attack misses ', () => {
  board.placeShip(5, 'bomber', [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  board.receiveAttack([2, 2]);

  const boardArray = board.getBoard();

  expect(boardArray[2][2]).toBe(0);
});
