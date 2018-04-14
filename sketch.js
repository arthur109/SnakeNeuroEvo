var bob
var boardSize = {
  x: 30,
  y: 30
}

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10)
  frameRate(5)
  bob = new Snake(boardSize.x, boardSize.y)
}

function draw() {
  background(255, 145, 0)
  bob.display(10, 10, 20);
  bob.controll()
  bob.move()
  bob.appleCheck()
}