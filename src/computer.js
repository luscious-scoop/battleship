import { Player } from './player.js';
import { generatePairOfCoordinates } from './helper.js';
const Computer = () => {
  let previousComputerCoordinates = [];
  function makeComputerMove() {
    let randomCoordinates = generatePairOfCoordinates(10);

    for (let i = 0; i < previousComputerCoordinates.length; i++) {
      if (
        previousComputerCoordinates[i][0] === randomCoordinates[0] &&
        previousComputerCoordinates[i][1] === randomCoordinates[1]
      ) {
        randomCoordinates = generatePairOfCoordinates(10);
      } else {
        previousComputerCoordinates.push(randomCoordinates);
        return randomCoordinates;
      }
    }
  }

  return Object.freeze({
    player: Player('computer', 'AI'),
    makeComputerMove,
  });
};

export let computer = Computer();
