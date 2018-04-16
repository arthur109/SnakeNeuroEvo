var boardSize = {
  x: 15,
  y: 15
}

function setup() {
  createCanvas(windowWidth, windowHeight - 4)
  frameRate(10)
  bob = new Snake(boardSize.x, boardSize.y)
  bob1 = new Snake(boardSize.x, boardSize.y)
  bob2 = new Snake(boardSize.x, boardSize.y)
  bob3 = new Snake(boardSize.x, boardSize.y)
  bob4 = new Snake(boardSize.x, boardSize.y)
  bob5 = new Snake(boardSize.x, boardSize.y)
  bob6 = new Snake(boardSize.x, boardSize.y)
  bob7 = new Snake(boardSize.x, boardSize.y)
  bob8 = new Snake(boardSize.x, boardSize.y)
  bob9 = new Snake(boardSize.x, boardSize.y)
  bob10 = new Snake(boardSize.x, boardSize.y)
  bob11 = new Snake(boardSize.x, boardSize.y)

}

function draw() {
  background(255, 145, 0)
  bob.run(0, 0, 20)
  bob1.run(300, 0, 20)
  bob2.run(600, 0, 20)
  bob7.run(900, 0, 20)
  bob3.run(0, 300, 20)
  bob4.run(300, 300, 20)
  bob8.run(600, 300, 20)
  bob9.run(900, 300, 20)
  bob5.run(300, 600, 20)
  bob6.run(0, 600, 20)
  bob10.run(600, 600, 20)
  bob11.run(900, 600, 20)


}