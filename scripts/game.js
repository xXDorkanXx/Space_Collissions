class Game{
    constructor(ctx, background, bricks, player, ball){
        this.ctx = ctx;
        this.background = background;
        this.bricks = bricks;
        this.player = player;
        this.ball = ball;
        this.frames = 0;
        this.lifes = 4000;
        this.score = 0;

        document.addEventListener(
            "keydown",
            (event)=>{
                switch(event.key){
                    case "ArrowLeft":
                        this.player.leftMove();
                        if(this.player.x <= 0){this.player.x = 0};
                        break;
                    case "ArrowRight":
                        this.player.rightMove();
                        if(this.player.x + this.player.width > this.ctx.canvas.width){this.player.x = this.ctx.canvas.width - this.player.width};
                        break;
                }
            }
        )

        document.addEventListener(
            "keyup",
            ()=>{
                this.player.vx = 0;
                this.player.x += this.player.vx;
            }
        )
    }

    startGame(){
        this.init();
        this.play();
    }

    init(){
        if(this.frames) this.stop();
        this.frames = 0;
        this.background.init();
        this.bricks.init();
        this.player.init();
        this.ball.init();
    }

    play(){
        this.move();
        this.draw();
        this.checkCollisions();
        this.checkWin();
        this.checkLifes();
        this.checkGameOver();
        if(this.frames !== null){
            this.frames = requestAnimationFrame(this.play.bind(this));
        }
    }

    stop(){
        cancelAnimationFrame(this.frames);
        this.frames = null;
    }

    move(){
        this.ball.move();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.background.draw();
        this.bricks.draw();
        this.player.draw();
        this.ball.draw();
        this.drawScore();
        this.drawLifes();
    }

    drawScore(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 24px sans-serif";
        this.ctx.fillText(`Score: ${this.score} pts`, 20, 40);
        this.ctx.restore();
    }

    drawLifes(){
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 24px sans-serif";
        this.ctx.fillText(`Lifes: ${this.lifes}`, this.ctx.canvas.width - 150, 40);
        this.ctx.restore();
    }

    checkCollisions(){

        let leftOfBall = this.ball.x;
        let rightOfBall = this.ball.x + this.ball.r;
        let topOfBall = this.ball.y;
        let bottomOfBall = this.ball.y + this.ball.r;

        let leftOfPlayer = this.player.x;
        let rightOfPlayer = this.player.x + this.player.width;
        let topOfPlayer = this.player.y;
        let bottomOfPlayer = this.player.y + this.player.height;


        //player-walls collisions
        if(leftOfPlayer <= 0){leftOfPlayer = 0}; //prevents player go off screen by left side
        if(rightOfPlayer >= this.ctx.canvas.width){leftOfPlayer = this.ctx.canvas.width - this.player.width}; //prevents player go off screen by left side

        //ball-bricks collisions
        for(let column = 0; column < this.bricks.brickColumns; column++){
            for(let row = 0; row < this.bricks.brickRows; row++){
                let currentBrick = this.bricks.bricksArr[column][row];
                if(
                    leftOfBall > currentBrick.x &&
                    rightOfBall < currentBrick.x + this.bricks.brickWidth &&
                    bottomOfBall > currentBrick.y &&
                    topOfBall < currentBrick.y + this.bricks.brickHeight){
                        this.ball.vy = -this.ball.vy;
                        currentBrick.status = false;
                        this.score++;
                    }
            }
        };

        //ball-walls collisions
        if(topOfBall < this.ball.r){this.ball.vy = -this.ball.vy}; //ball bounce at top of screen
        if(rightOfBall > this.ctx.canvas.width || leftOfBall < this.ball.r) {this.ball.vx = -this.ball.vx}; //ball bounce at both sides of screen
        
        //ball-player collisions
        if(bottomOfBall > topOfPlayer && bottomOfBall < bottomOfPlayer){ //ball bounce when collides with top of player
            if(rightOfBall > leftOfPlayer && leftOfBall < rightOfPlayer){this.ball.vy = -this.ball.vy};
        };
    }

    checkLifes(){
        if(this.ball.y + this.ball.vy > this.ctx.canvas.height - this.ball.r){
            this.lifes--;
            this.player.init();
            this.ball.init();
        }
    }

    checkWin(){
        if(this.score === 4000){
            this.stop();
            this.ctx.save();
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.font = "bold 32px sans-serif";
            this.ctx.fillText(
                "You win!!",
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2
            );
            this.ctx.restore();
        }
    }

    checkGameOver(){
        if(this.lifes <= 0){
            this.stop();
            this.ctx.save();
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.font = "bold 32px sans-serif";
            this.ctx.fillText(
                "Game Over",
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2
            );
            this.ctx.restore();
        }
    }
};