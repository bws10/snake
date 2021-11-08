import { settings } from "./settings.js";
import { increaseSnakeSpeed, SNAKE_SPEED } from "./snake.js";

const SPEED_INCREASE_INTERVAL = settings.SPEED_INCREASE_INTERVAL;
const SPEED_INCREASE_RATE = settings.SPEED_INCREASE_RATE;
let score = 0;
let lastSpeedIncrease = 0;
let scoreString = score.toString();

export function resetScore() {
  score = 0;
  lastSpeedIncrease = 0;
  scoreString = score.toString();
}

export function updateScore(amount) {
  score += amount;
  scoreString = " " + score.toString(10) + " ";
  if (score >= lastSpeedIncrease + SPEED_INCREASE_INTERVAL) {
    increaseSnakeSpeed(SPEED_INCREASE_RATE);
    lastSpeedIncrease = score;
    console.log(lastSpeedIncrease);
    console.log("snake speed incresed to " + SNAKE_SPEED);
  }
}

export function drawScore(gameBoard) {
  gameBoard.dataset.content = scoreString;
  //   console.log(score);
}

export function getScore() {
  return scoreString;
}
