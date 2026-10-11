export function createCoordinates(length, callback) {
  return Math.random() >= 0.5
    ? generateRow(length, callback)
    : generateColumn(length, callback);
}

function generateRow(length, callback) {
  let coordinates = [];

  let x = Math.floor(Math.random() * 10);

  let y = x;

  while (coordinates.length !== length) {
    coordinates.push([x, y]);

    y++;

    if (y >= 10 || callback(x, y)) {
      coordinates = [];
      x = Math.floor(Math.random() * 10);
      y = x;
    }
  }

  return coordinates;
}
function generateColumn(length, callback) {
  let coordinates = [];

  let y = Math.floor(Math.random() * 10);

  let x = y;

  while (coordinates.length !== length) {
    coordinates.push([x, y]);

    x++;

    if (x >= 10 || callback(x, y)) {
      coordinates = [];
      y = Math.floor(Math.random() * 10);
      x = y;
    }
  }

  return coordinates;
}
