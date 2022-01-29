const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 550;

const background = new Background(ctx);
const bricks = new Bricks(ctx);
const player = new Player(ctx);
const ball = new Ball(ctx);


const game = new Game(ctx, background, bricks, player, ball);


const startButton = document.getElementById("start-button");
const title = document.getElementById("title");

startButton.onclick = ()=> {
  startButton.blur();
  canvas.focus();
  startButton.remove();
  title.remove();
  game.startGame();
};