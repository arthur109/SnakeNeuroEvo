var boardSize = {
  x: 20,
  y: 30
}

function setup() {
  createCanvas(windowWidth, windowHeight - 4)
  frameRate(1)
  bob = new Snake(boardSize.x, boardSize.y)

}

function draw() {
  background(255, 145, 0)
  bob.run(10, 10, 20)
}