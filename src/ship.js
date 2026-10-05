export const Ship = (l) => {
  let length = l;

  let hitsTaken = 0;
  function hit() {
    hitsTaken++;
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
    isSunk,
  });
};
