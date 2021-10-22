import { getInputDirection } from "./input.js";
import { GRID_SIZE } from "./grid.js";
import { settings } from "./settings.js";
import { getScore } from "./score.js";

export var SNAKE_SPEED = settings.SNAKE_SPEED;
const snakeBody = [{ x: (GRID_SIZE - 1) / 2 + 1, y: (GRID_SIZE - 1) / 2 + 1 }];
let newSegments = 0;

export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  if (snakeBody[0].x == GRID_SIZE && inputDirection.x == 1) {
    snakeBody[0].x = 1;
  } else if (snakeBody[0].x == 1 && inputDirection.x == -1) {
    snakeBody[0].x = GRID_SIZE;
  } else {
    snakeBody[0].x += inputDirection.x;
  }
  if (snakeBody[0].y == GRID_SIZE && inputDirection.y == 1) {
    snakeBody[0].y = 1;
  } else if (snakeBody[0].y == 1 && inputDirection.y == -1) {
    snakeBody[0].y = GRID_SIZE;
  } else {
    snakeBody[0].y += inputDirection.y;
  }
  let snakeHead = snakeBody[0];
  if (hitTail(snakeHead)) {
    alert("Game Over ! You scored " + getScore());
    location.reload();
  }
  // console.log("update snake");
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
  // console.log("draw snake");
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position) {
  return snakeBody.some((segment) => {
    return positionsEqual(position, segment);
  });
}

export function hitTail(position) {
  return snakeBody.some((segment) => {
    if (segment == position) {
      return false;
    }
    return positionsEqual(position, segment);
  });
}
function positionsEqual(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

export function increaseSnakeSpeed(amount) {
  SNAKE_SPEED += amount;
}