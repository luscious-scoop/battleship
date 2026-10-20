export function createCoordinates(length) {
  return Math.random() >= 0.5 ? generateRow(length) : generateColumn(length);
}

function generateRow(length) {
  const row = [];

  let randomX = Math.floor(Math.random() * 10);

  let randomY = Math.floor(Math.random() * 10);

  let x = randomX + length <= 9 ? randomX : Math.floor((randomX + length) % 9);
  let y = randomY + length <= 9 ? randomY : Math.floor((randomY + length) % 9);

  for (let i = 0; i < length; i++) {
    row.push([x, y]);

    y++;
  }

  console.log(row);
}

function generateColumn(length) {
  const column = [];

  let x = Math.floor(Math.random() * 10);

  let y = Math.floor(Math.random() * 10);

  for (let i = 0; i < length; i++) {
    column.push([x, y]);

    x++;
  }

  console.log(column);
}

generateRow(3);
