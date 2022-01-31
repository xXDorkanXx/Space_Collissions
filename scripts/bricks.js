class Bricks{
    constructor(ctx){
        this.ctx = ctx;
        this.brickRows = 4;
        this.brickColumns = 6;
        this.brickWidth = 70;
        this.brickHeight = 20;
        this.brickPadding = 30;
        this.brickOffsetTop = 50;
        this.brickOffsetLeft = 30;
        this.img = new Image();
        this.img.src = "/images/brick.png";
        this.bricksArr = [];
    }

    buildBricksArr(){
        for(let column = 0; column < this.brickColumns; column++){
            this.bricksArr[column] = [];
            for(let row = 0; row < this.brickRows; row++){
                this.bricksArr[column][row] = {x: 0, y: 0, status: 1};
            }
        }
    }

    init(){
        this.buildBricksArr();
    }

    draw(){
        for(let column = 0; column < this.brickColumns; column++){
            for(let row = 0; row < this.brickRows; row++){
                if(this.bricksArr[column][row].status === 1){
                    let brickX = (column * (this.brickWidth + this.brickPadding + 30)) + this.brickOffsetLeft;
                    let brickY = (row * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                    this.bricksArr[column][row].x = brickX;
                    this.bricksArr[column][row].y = brickY;
                    this.ctx.drawImage(
                        this.img,
                        brickX,
                        brickY,
                        this.brickWidth,
                        this.brickHeight
                    )
                }
            }
        }
    }
};