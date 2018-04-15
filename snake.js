class Snake {
    constructor(XboardSize, YboardSize) {
        this.boardSize = {
            x: XboardSize,
            y: YboardSize
        }
        this.applePos = {
            x: Math.floor(Math.random() * boardSize.x),
            y: Math.floor(Math.random() * boardSize.y)
        }
        this.snakeBody = [{
            x: 4,
            y: 4
        }, {
            x: 4,
            y: 5
        }, {
            x: 4,
            y: 6
        }, {
            x: 4,
            y: 7
        }]

        this.direction = {
            x: 1,
            y: 0
        }
        this.ate = false
        this.alive = true
        this.globalGrid = [
            []
        ]
    }
    move() {
        this.nextBlock = {
            x: this.snakeBody[0].x + this.direction.x,
            y: this.snakeBody[0].y + this.direction.y
        }
        this.snakeBody.unshift(this.nextBlock)
        if (!this.ate) {
            this.snakeBody.pop()
        } else {
            this.ate = false
        }
    }
    checkOutOfBounds(x, y) {
        if (x >= boardSize.x || x < 0 || y >= boardSize.y || y < 0) {
            return true
        }
        return false
    }

    generateMapAndCollisions() {
        var tempWM = Array2D.build(this.boardSize.x, this.boardSize.y)
        tempWM[this.applePos.y][this.applePos.x] = 2
        for (var i = 0; i < this.snakeBody.length; i++) {
            var block = {
                x: this.snakeBody[i].x,
                y: this.snakeBody[i].y
            }
            if (this.checkOutOfBounds(block.x, block.y)) {
                console.log("out")
                this.alive = false
            } else if (tempWM[block.y][block.x] === 1) {
                console.log("hit")
                this.alive = false
            } else {
                tempWM[block.y][block.x] = 1
            }
        }
        this.globalGrid = Array2D.clone(tempWM)
    }
    controll() {
        if (keyCode === UP_ARROW) {
            this.direction = {
                x: 0,
                y: -1
            }
        }
        if (keyCode === DOWN_ARROW) {
            this.direction = {
                x: 0,
                y: 1
            }
        }
        if (keyCode === RIGHT_ARROW) {
            this.direction = {
                x: 1,
                y: 0
            }
        }
        if (keyCode === LEFT_ARROW) {
            this.direction = {
                x: -1,
                y: 0
            }
        }
    }
    appleCheck() {
        if (this.applePos.x == this.snakeBody[0].x && this.applePos.y == this.snakeBody[0].y) {
            this.applePos = {
                x: Math.floor(Math.random() * boardSize.x),
                y: Math.floor(Math.random() * boardSize.y)
            }
            this.ate = true
        }
    }

    display(posX, posY, tileSize) {
        noStroke();
        fill(255, 190, 45)
        rect(posX, posY, tileSize * boardSize.x, tileSize * boardSize.y)
        //Draws apple
        fill(0, 255, 0)
        rect(posX + tileSize * this.applePos.x, posY + tileSize * this.applePos.y, tileSize, tileSize)
        // Draws Grid
        stroke(255);
        for (var y = 0; y < this.boardSize.y + 1; y++) {
            line(posX, posY + y * tileSize, posX + tileSize * boardSize.x, posY + y * tileSize)
        }
        for (var x = 0; x < this.boardSize.x + 1; x++) {
            line(posX + x * tileSize, posY, posX + x * tileSize, posY + this.boardSize.y * tileSize)
        }

        //Draws snake
        noStroke();
        fill(23, 236, 236)
        for (var i = 0; i < this.snakeBody.length; i++) {
            rect(posX + tileSize * this.snakeBody[i].x, posY + tileSize * this.snakeBody[i].y, tileSize + 1, tileSize + 1)
        }
        if (this.alive === false) {
            fill(255, 0, 0, 100)
            rect(posX + 1, posY + 1, tileSize * boardSize.x - 1, tileSize * boardSize.y - 1)
        }
    }
    run(posX, posY, tileSize) {
        this.display(posX, posY, tileSize)
        if (this.alive) {
            this.generateMapAndCollisions()
            this.controll()
            this.move()
            this.appleCheck()
        }
    }
}