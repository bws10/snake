import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";
import { upadte as updateWalls, draw as drawWalls } from "./walls.js";
import { setGridSize } from "./grid.js";
import { drawScore } from "./score.js";

let lastRenderTime = 0;
let run = true;
const gameBoard = document.querySelector(".game-board");

function main(currentTime) {
  if (!run) return;
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  window.requestAnimationFrame(main);
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  // console.log(secondsSinceLastRender);
  update();
  draw();
}

setGridSize(gameBoard);
start();
function start() {
  window.requestAnimationFrame(main);
}

export function stop() {
  run = false;
}

export function reset() {
  location.reload();
}

function update() {
  updateSnake();
  updateFood();
  updateWalls();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
  drawScore(gameBoard);
  drawWalls(gameBoard);
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
