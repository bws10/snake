import { GRID_SIZE } from "./grid.js";
import { settings } from "./settings.js";
import { onSnake, positionsEqual } from "./snake.js";
import { getScore } from "./score.js";
import { gameOver, stop } from "./game.js";

let walls = [];
var WALL_SET;

const WALL_OPTIONS = {
  set1: {
    wall1: {
      start: { x: 1, y: 1 },
      end: { x: 1, y: GRID_SIZE },
    },
    wall2: {
      start: { x: 1, y: 1 },
      end: { x: GRID_SIZE, y: 1 },
    },
    wall3: {
      start: { x: GRID_SIZE, y: 1 },
      end: { x: GRID_SIZE, y: GRID_SIZE },
    },
    wall4: {
      start: { x: 1, y: GRID_SIZE },
      end: { x: GRID_SIZE, y: GRID_SIZE },
    },
  },
  set2: {
    wall1: {
      start: { x: 5, y: 5 },
      end: { x: 5, y: GRID_SIZE - 5 },
    },
    wall2: {
      start: { x: GRID_SIZE - 5, y: 5 },
      end: { x: GRID_SIZE - 5, y: GRID_SIZE - 5 },
    },
  },
};

init();

export function init() {
  WALL_SET = settings.WALL_SET;
  walls = [];
  if (WALL_SET <= 0 || WALL_SET > Object.keys(WALL_OPTIONS).length) return;

  let numberOfWalls = 0;
  let wallSet;

  let set = "set" + WALL_SET;
  wallSet = WALL_OPTIONS[set];
  numberOfWalls = Object.keys(wallSet).length;

  for (let i = 1; i <= numberOfWalls; i++) {
    let key = "wall" + i;
    let wall = wallSet[key];
    let wallArray = buildWallArray(wall.start, wall.end);
    walls = [...walls, ...wallArray];
  }
}
export function upadte() {
  if (WALL_SET == 0) return;
  walls.forEach((block) => {
    if (onSnake(block)) {
      stop();
      let score = getScore();
      gameOver(score);
    }
  });
}

export function draw(gameBoard) {
  if (WALL_SET == 0) return;

  walls.forEach((block) => {
    const wallElement = document.createElement("div");
    wallElement.style.gridColumnStart = block.x;
    wallElement.style.gridRowStart = block.y;
    wallElement.classList.add("wall");
    gameBoard.appendChild(wallElement);
  });
}

function buildWallArray(startPoint, endPoint) {
  let { x: x1, y: y1 } = startPoint;
  let { x: x2, y: y2 } = endPoint;

  let dx = x2 - x1;
  let dy = y2 - y1;

  let interiorPoints = [];

  let length = Math.max(dx, dy);
  let ix = dx / length;
  let iy = dy / length;

  for (let i = 1; i < length; i++) {
    interiorPoints.push({ x: x1 + i * ix, y: y1 + i * iy });
  }

  return [startPoint, ...interiorPoints, endPoint];
}

export function onWall(position) {
  return walls.some((block) => {
    let test = positionsEqual(position, block);
    return test;
  });
}
