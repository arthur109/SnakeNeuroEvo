var bob
var boardSize = {
  x: 40,
  y: 40
}

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10)
  frameRate(10)
  bob = new Snake(boardSize.x, boardSize.y)
}

function draw() {
  background(255, 145, 0)
  bob.run(10, 10, 20)
}