var boardSize = {
  x: 15,
  y: 15
}
var tileSize = 10;
var genSize = 2000
var generationNum = 0
var mutationProb = 0.1
var snakes = []
var aliveSnakeCount = genSize
var fittest = []


function createStartGen() {
  for (var i = 0; i < genSize; i++) {
    snakes.push(new Snake(boardSize.x, boardSize.y))
  }
}

function runLiveView() {
  for (var i = 0; i < snakes.length; i++) {
    if (i === 0) {
      // snakes[0].display(tileSize * boardSize.x * (i % 14) - (mouseX - windowWidth / 2), Math.floor(i / 14) * tileSize * boardSize.y - (mouseY - windowHeight / 2), tileSize)
      snakes[0].display(5, 5, 40)
    }
    snakes[i].run()
    if (snakes[i].alive === false) {
      aliveSnakeCount -= 1
      fittest.push(snakes[i])
      snakes.splice(i, 1)
    }
  }
}

function sortFittest() {
  fittest.sort(function (a, b) {
    return b.score - a.score
  })
  aliveSnakeCount = genSize
}

function createNewGen(fittestImportance) {
  generationNum += 1;
  var bestOld = new Snake(boardSize.x, boardSize.y)
  //console.log(temporary)
  bestOld.brain = fittest[0].brain.copy()
  snakes.push(bestOld)
  for (var i = 0; i < genSize - 1; i++) {
    for (var a = 0; a < fittest.length; a++) {
      if (Math.floor(Math.random() * fittestImportance) === 1) {
        var temporary = new Snake(boardSize.x, boardSize.y)
        //console.log(temporary)
        temporary.brain = fittest[a].brain.copy()
        temporary.brain.mutate(mutationProb)
        snakes.push(temporary)
        break
      } else if (a == fittest.length - 1) {
        var temporary = new Snake(boardSize.x, boardSize.y)
        //console.log(temporary)
        temporary.brain = fittest[a].brain.copy()
        temporary.brain.mutate(mutationProb)
        snakes.push(temporary)
        break
      }
    }
  }
  fittest.length = 0
}

function setup() {
  createCanvas(windowWidth, windowHeight - 4)
  //frameRate()
  createStartGen()
}


function draw() {
  background(255, 145, 0)
  runLiveView()
  if (aliveSnakeCount === 0) {
    sortFittest()
    //console.table(fittest)

    //console.log("sorted")
    createNewGen(3);
  }
  fill(0)
  text("frame rate: " + frameRate(), 10, 20)
  text("generation: " + generationNum, windowWidth - 300, 20)

}