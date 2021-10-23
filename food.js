import { onSnake, expandSnake } from "./snake.js";
import { getRandomGridPosition } from "./grid.js";
import { updateScore } from "./score.js";
import { settings } from "./settings.js";
import { onWall } from "./walls.js";

const EXPANSION_RATE = settings.EXPANSION_RATE;
const FOOD_SPAWN_RATE = settings.FOOD_SPAWN_RATE;
var food = getRandomFoodPosition(FOOD_SPAWN_RATE);

export function update() {
  food.forEach((item) => {
    if (onSnake(item)) {
      expandSnake(EXPANSION_RATE);
      updateScore(EXPANSION_RATE);
      let i = food.indexOf(item);
      delete food[i];
    }
  });
  let withoutSparse = [];
  food.forEach((i) => {
    withoutSparse.push(i);
  });
  if (withoutSparse.length == 0) {
    food = getRandomFoodPosition(FOOD_SPAWN_RATE);
  }
}

export function draw(gameBoard) {
  food.forEach((item) => {
    if (item != null || item != undefined) {
      const foodElement = document.createElement("div");
      foodElement.style.gridColumnStart = item.x;
      foodElement.style.gridRowStart = item.y;
      foodElement.classList.add("food");
      gameBoard.appendChild(foodElement);
    }
  });
}

function getRandomFoodPosition(number) {
  let newPositions = [];
  for (let i = 0; i < number; i++) {
    let newPosition;

    while (newPosition == null || onSnake(newPosition) || onWall(newPosition)) {
      newPosition = getRandomGridPosition();
    }
    newPositions.push(newPosition);
  }
  return newPositions;
}
