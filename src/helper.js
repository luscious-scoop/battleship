export function createCoordinates(length, occupiedCoordinates) {
  return Math.random() >= 0.5
    ? generateRow(length, occupiedCoordinates)
    : generateColumn(length, occupiedCoordinates);
}

export function generatePairOfCoordinates(max) {
  const x = Math.floor(Math.random() * max);
  const y = Math.floor(Math.random() * max);

  return [x, y];
}

function generateRow(length, occupiedCoordinates) {
  let row = [];

  let [x, y] = generatePairOfCoordinates(10);

  let isCoordinatesOccupied = true;
  while (isCoordinatesOccupied) {
    if (y > 9) {
      [x, y] = generatePairOfCoordinates(10);
      row = [];
    } else {
      row.push([x, y]);
    }
    y++;

    if (row.length === length) {
      isCoordinatesOccupied = occupiedCoordinates(row);

      if (isCoordinatesOccupied) {
        row = [];
      }
    }
  }

  return row;
}

function generateColumn(length, occupiedCoordinates) {
  let column = [];

  let [x, y] = generatePairOfCoordinates(10);

  let isCoordinatesOccupied = true;
  while (isCoordinatesOccupied) {
    if (x > 9) {
      [x, y] = generatePairOfCoordinates(10);
      column = [];
    } else {
      column.push([x, y]);
    }
    x++;
    if (column.length === length) {
      isCoordinatesOccupied = occupiedCoordinates(column);

      if (isCoordinatesOccupied) {
        column = [];
      }
    }
  }

  return column;
}
