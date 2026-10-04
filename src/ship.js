const Ship = (l) => {
  let length = l;

  let hitsTaken = 0;
  function hit() {
    hitsTaken++;

    if (isSunk()) {
      console.log('ship has sunk');
    } else {
      console.log('the ship took a hit');
    }
  }

  function isSunk() {
    if (hitsTaken === length) {
      return true;
    }

    return false;
  }

  const getLength = () => length;

  const getHitsTaken = () => hitsTaken;

  return Object.freeze({
    hit,
    getLength,
    getHitsTaken,
  });
};

const ship = Ship(5);

ship.hit();

ship.hit();

ship.hit();

ship.hit();

ship.hit();
console.log(ship.getHitsTaken());
