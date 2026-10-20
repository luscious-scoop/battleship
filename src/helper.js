export function createCoordinates(length, occupiedCoordinates) {
  return Math.random() >= 0.5
    ? generateRow(length, occupiedCoordinates)
    : generateColumn(length, occupiedCoordinates);
}

function generatePairOfCoordinates(max) {
  const x = Math.floor(Math.random() * max);
  const y = Math.floor(Math.random() * max);

  return [x, y];
}

function generateRow(length, occupiedCoordinates) {
  let row = [];

  let [x, y] = generatePairOfCoordinates(10);

  while (row.length !== length) {
    if (occupiedCoordinates) {
      [x, y] = generatePairOfCoordinates(10);
      row = [];
    } else {
      row.push([x, y]);
    }

    y++;
  }

  console.log(row);
  return row;
}

function generateColumn(length, occupiedCoordinates) {
  let column = [];

  let [x, y] = generatePairOfCoordinates(10);

  while (column.length !== length) {
    if (occupiedCoordinates) {
      [x, y] = generatePairOfCoordinates(10);
      column = [];
    } else {
      column.push([x, y]);
    }

    x++;
  }

  console.log('column');
  return column;
}
