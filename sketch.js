var boardSize = {
  x: 15,
  y: 15
}
var tileSize = 20;
var genSize = 16
var generationNum = 0
var snakes = []
var aliveSnakeCount = genSize

function createStartGen() {
  for (var i = 0; i < genSize; i++) {
    snakes.push(new Snake(boardSize.x, boardSize.y, i))
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight - 4)
  //frameRate(10)
  createStartGen()
}


function draw() {
  background(255, 145, 0)

  for (var i = 0; i < snakes.length; i++) {
    snakes[i].run(tileSize * boardSize.x * (i % 4) - (mouseX - windowWidth / 2), Math.floor(i / 4) * tileSize * boardSize.y - (mouseY - windowHeight / 2), tileSize)
  }

  fill(0)
  text(frameRate(), 10, 20)

}