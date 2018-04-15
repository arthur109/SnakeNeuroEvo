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
    createArray(length) {
        var arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while (i--) arr[length - 1 - i] = createArray.apply(this, args);
        }

        return arr;
    }
    generateMapAndCollisions() {
        var tempWM = this.createArray([this.boardSize.y, this.boardSize.x])
        console.log(tempWM)
        tempWM[this.applePos.y][this.applePos.x] = 2
        for (var i = 0; i < this.snakeBody.length; i++) {
            var block = {
                x: this.snakeBody[i].x,
                y: this.snakeBody[i].y
            }
            // if (this.checkOutOfBounds(block.y, block.x)) {
            //     console.log("out")
            //     this.alive = false
            // } else if (tempWM[block.y][block.x] === 1) {
            //     console.log("hit")
            //     this.alive = false
            // } else {
            tempWM[block.y][block.x] = 1
            // }
        }
        //console.table(tempWM)
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
    checkCollision() {
        for (var i = 0; i < this.snakeBody.length; i++) {
            for (var j = 0; j < this.snakeBody.length; j++) {
                if (i != j && this.snakeBody[i].x === this.snakeBody[j].x && this.snakeBody[i].y === this.snakeBody[j].y) {
                    this.alive = false
                }
            }
        }
        if (this.checkOutOfBounds(this.snakeBody[0].x, this.snakeBody[0].y)) {
            this.alive = false
        }
    }
    display(posX, posY, tileSize) {
        noStroke();
        fill(255, 190, 45)
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
        if (this.alive === false) {
            fill(255, 0, 0, 100)
            rect(posX, posY, tileSize * boardSize.x, tileSize * boardSize.y)
        }
    }
    run(posX, posY, tileSize) {
        this.display(posX, posY, tileSize)
        if (this.alive) {
            this.generateMapAndCollisions()
            this.checkCollision()
            this.controll()
            this.move()
            this.appleCheck()
        }
    }
}