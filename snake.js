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
        fill(255, 160 + 30, 15 + 30)
        rect(posX, posY, tileSize * boardSize.x, tileSize * boardSize.y)
        //Draws apple
        fill(0, 255, 0)
        rect(posX + tileSize * this.applePos.x, posY + tileSize * this.applePos.y, tileSize, tileSize)
        //Draws snake
        fill(23, 236, 236)
        for (var i = 0; i < this.snakeBody.length; i++) {
            rect(posX + tileSize * this.snakeBody[i].x, posY + tileSize * this.snakeBody[i].y, tileSize, tileSize)
        }
        // Draws Grid
        stroke(255);
        for (var y = 0; y < this.boardSize.y + 1; y++) {
            line(posX, posY + y * tileSize, posX + tileSize * boardSize.x, posY + y * tileSize)
        }
        for (var x = 0; x < this.boardSize.x + 1; x++) {
            line(posX + x * tileSize, posY, posX + x * tileSize, posY + this.boardSize.y * tileSize)
        }
    }
}