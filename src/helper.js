export function createCoordinates(length) {
  return Math.random() >= 0.5 ? generateRow(length) : generateColumn(length);
}

function generateRow(length) {
  let coordinates = [];

  let x = Math.floor(Math.random() * 10);

  let y = x;

  while (coordinates.length !== length) {
    coordinates.push([x, y]);

    y++;

    if (y >= 10) {
      coordinates = [];
      x = Math.floor(Math.random() * 10);
      y = x;
    }
  }

  return coordinates;
}
function generateColumn(length) {
  let coordinates = [];

  let y = Math.floor(Math.random() * 10);

  let x = y;

  while (coordinates.length !== length) {
    coordinates.push([x, y]);

    x++;

    if (x >= 10) {
      coordinates = [];
      y = Math.floor(Math.random() * 10);
      x = y;
    }
  }

  return coordinates;
}
