import { Player } from './player.js';
import { generatePairOfCoordinates } from './helper.js';
const Computer = () => {
  let previousComputerCoordinates = [];
  function makeComputerMove() {
    if (previousComputerCoordinates.length >= 100) {
      throw new RangeError('all possible moves have been made');
    }
    let randomCoordinates = generatePairOfCoordinates(10);

    let isMoveMade = moveAlreadyMade(randomCoordinates);

    while (isMoveMade) {
      randomCoordinates = generatePairOfCoordinates(10);

      isMoveMade = moveAlreadyMade(randomCoordinates);
    }

    previousComputerCoordinates.push(randomCoordinates);

    return randomCoordinates;
  }

  function moveAlreadyMade(coordinates) {
    let [x, y] = coordinates;

    for (let i = 0; i < previousComputerCoordinates.length; i++) {
      if (
        previousComputerCoordinates[i][0] === x &&
        previousComputerCoordinates[i][1] === y
      ) {
        return true;
      }
    }
    return false;
  }

  return Object.freeze({
    ...Player('computer', 'AI'),
    makeComputerMove,
  });
};

export let computer = Computer();
