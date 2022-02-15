const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const size = 50;

// Iteration 1
function drawGrid() {
  //   context.fill();
  //   context.fillStyle = 'black';
  //   let gridH = width / 10;
  //   //   for (let i = 0; i <= width; i++) {
  //   //     context.strokeRect(0 + n * i, 0 + n * i, n, 10);
  //   //   }
  //   let gridV = height / 10;
  //   for (let i = 0; i <= height; i++) {
  //     context.strokeRect(0 + m * i, 0 + m * i, 10, m);
  //   }
  context.beginPath();
  for (let x = 0; x <= 500; x += 50) {
    context.moveTo(x, 0);
    context.lineTo(x, 500);
  }
  context.lineWidth = 2;
  context.lineStyle = 'black';
  context.stroke();
  context.beginPath();
  for (let y = 0; y <= 500; y += 50) {
    context.moveTo(0, y);
    context.lineTo(500, y);
  }
  context.lineWidth = 2;
  context.lineStyle = 'black';
  context.stroke();
}

class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }

  moveUp() {
    return (this.row -= 1);
  }
  moveRight() {
    return (this.col += 1);
  }
  moveDown() {
    return (this.row += 1);
  }
  moveLeft() {
    return (this.col -= 1);
  }

  playerClean() {
    context.clearRect(col * 50, row * 50, 50, 50);
  }
}

function drawPlayer(row, col) {
  const playerImage = new Image();
  playerImage.src = '/images/character-down.png';

  playerImage.addEventListener('load', () => {
    context.drawImage(playerImage, col * 50, row * 50, 50, 50);
  });
}

class Treasure {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  setRandomPosition() {
    const randomBetweenIntegers = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    this.row = randomBetweenIntegers(0, 10);
    this.col = randomBetweenIntegers(0, 10);
  }
}

function drawTreasure(row, col) {
  const treasureImage = new Image();
  treasureImage.src = '/images/treasure.png';

  treasureImage.addEventListener('load', () => {
    context.drawImage(treasureImage, col * 50, row * 50, 50, 50);
  });
}
const player = new Character(0, 0);
const treasure = new Treasure(0, 0);
treasure.setRandomPosition();

const clean = () => {
  context.clearRect(0, 0, 500, 500);
};

function drawEverything() {
  clean();
  drawGrid();
  // const player = new Character(0, 0);
  drawTreasure(treasure.row, treasure.col);
  drawPlayer(player.row, player.col);
}
drawEverything();
window.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  const keyCode = event.keyCode;
  console.log(keyCode);
  // React based on the key pressed
  switch (keyCode) {
    case 37:
      console.log('left');
      // clean();
      player.moveLeft();
      break;
    case 38:
      console.log('up');
      player.moveUp();
      break;
    case 39:
      console.log('right');
      player.moveRight();
      break;
    case 40:
      console.log('down');
      player.moveDown();
      break;
  }
  drawEverything();
});
