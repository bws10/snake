import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";
import { setGridSize } from "./grid.js";
import { drawScore, updateScore } from "./score.js";

let score = 0;
let lastRenderTime = 0;
const gameBoard = document.querySelector(".game-board");

function main(currentTime) {
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  window.requestAnimationFrame(main);
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  // console.log(secondsSinceLastRender);
  update();
  draw();
}

setGridSize(gameBoard);
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
  drawScore(gameBoard);
}

// function syncHeight() {

// }
document.documentElement.style.setProperty(
  "--window-inner-height",
  `${window.innerHeight}px`
);

// window.addEventListener("resize", syncHeight);

// helper function to run preventDefault
function preventDefault(e) {
  e.preventDefault();
}

window.addEventListener("pointermove", preventDefault);
window.addEventListener("touchmove", preventDefault);
