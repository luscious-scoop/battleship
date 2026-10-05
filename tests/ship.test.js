import { Ship } from '../src/ship.js';

let ship;

beforeEach(() => {
  ship = Ship(5);
});
test('check if ship length is correct', () => {
  expect(ship.getLength()).toEqual(5);
});

test('check hits taken initial value', () => {
  expect(ship.getHitsTaken()).toEqual(0);
});
test('check hits taken increments', () => {
  ship.hit();
  ship.hit();
  expect(ship.getHitsTaken()).toEqual(2);
});

test('check if sunk method returns the expected value if hits are not equal to length', () => {
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(false);
});

test('check if sunk method returns the expected value if hits are  equal to length', () => {
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});
