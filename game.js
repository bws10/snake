import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  resetSpeed,
  resetSnake,
  resetSegments,
} from "./snake.js";

import {
  update as updateFood,
  draw as drawFood,
  newFoodAfterWallChange,
  resetFood,
} from "./food.js";
import { upadte as updateWalls, draw as drawWalls, init } from "./walls.js";
import { setGridSize } from "./grid.js";
import { drawScore, resetScore, resetSpeedRate } from "./score.js";
import {
  resetDefaultSettings,
  settings,
  STORED_SETTINGS_KEY,
} from "./settings.js";
import { resetInput } from "./input.js";

let lastRenderTime = 0;
let run = true;
const gameBoard = document.querySelector(".game-board");

function main(currentTime) {
  if (!run) {
    // updateWalls();
    // drawWalls(gameBoard);
    return;
  }

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
  run = false;
  resetSpeed();
  resetSnake();
  resetSegments();
  resetScore();
  resetInput();
  resetFood();
  resetSpeedRate();

  lastRenderTime = 0;
  run = true;
  newFoodAfterWallChange();
  start();
  // location.reload();
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

document.documentElement.style.setProperty(
  "--window-inner-height",
  `${window.innerHeight}px`
);

// helper function to run preventDefault
function preventDefault(e) {
  e.preventDefault();
}

window.addEventListener("pointermove", preventDefault);
window.addEventListener("touchmove", preventDefault);

const settingsForm = document.getElementById("settings");
const wallInputTxt = document.getElementById("wallSetTxt");
const startSpeedInput = document.getElementById("startSpeed");
const speedIntervalInput = document.getElementById("speedInt");
const speedRateInput = document.getElementById("speedInc");
const growthInput = document.getElementById("growth");
const foodInput = document.getElementById("food");

wallInputTxt.value = settings.WALL_SET;
startSpeedInput.value = settings.SNAKE_SPEED;
speedIntervalInput.value = settings.SPEED_INCREASE_INTERVAL;
speedRateInput.value = settings.SPEED_INCREASE_RATE;
growthInput.value = settings.EXPANSION_RATE;
foodInput.value = settings.FOOD_SPAWN_RATE;

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let val = document.getElementById("wallSetTxt").value;
  updateSettings(val, "WALL");
  settings.WALL_SET = val;

  localStorage.setItem(STORED_SETTINGS_KEY, JSON.stringify(settings));
  document.getElementById("close-btn").focus();
  window.addEventListener("pointermove", preventDefault);
  window.addEventListener("touchmove", preventDefault);
});

wallInputTxt.addEventListener("click", (e) => {
  window.removeEventListener("pointermove", preventDefault);
  window.removeEventListener("touchmove", preventDefault);
});

wallInputTxt.addEventListener("change", (e) => {
  e.preventDefault();

  let val = document.getElementById("wallSetTxt").value;
  updateSettings(val, "WALL");

  localStorage.setItem(STORED_SETTINGS_KEY, JSON.stringify(settings));
  window.addEventListener("pointermove", preventDefault);
  window.addEventListener("touchmove", preventDefault);
});

startSpeedInput.addEventListener("change", (e) => {
  e.preventDefault();

  let val = startSpeedInput.value;
  updateSettings(val, "SPEED");
  localStorage.setItem(STORED_SETTINGS_KEY, JSON.stringify(settings));
});
speedIntervalInput.addEventListener("change", (e) => {
  e.preventDefault();

  let val = speedIntervalInput.value;
  updateSettings(val, "SPEED_INT");
  localStorage.setItem(STORED_SETTINGS_KEY, JSON.stringify(settings));
});
speedRateInput.addEventListener("change", (e) => {
  e.preventDefault();

  let val = speedRateInput.value;
  updateSettings(val, "SPEED_INC");
  localStorage.setItem(STORED_SETTINGS_KEY, JSON.stringify(settings));
});
growthInput.addEventListener("change", (e) => {
  e.preventDefault();

  let val = growthInput.value;
  updateSettings(val, "GROWTH");
  localStorage.setItem(STORED_SETTINGS_KEY, JSON.stringify(settings));
});
foodInput.addEventListener("change", (e) => {
  e.preventDefault();

  let val = foodInput.value;
  updateSettings(val, "FOOD");
  localStorage.setItem(STORED_SETTINGS_KEY, JSON.stringify(settings));
});

function updateSettings(value, type) {
  if (type == "WALL") {
    settings.WALL_SET = value;
    init();
    newFoodAfterWallChange();
    update();
    draw();
  }
  if (type == "GROWTH") {
    value = parseInt(value, 10);
    settings.EXPANSION_RATE = value;
    resetFood();
  }
  if (type == "SPEED") {
    value = parseInt(value, 10);
    settings.SNAKE_SPEED = value;
    resetSpeed();
  }
  if (type == "SPEED_INT") {
    value = parseInt(value, 10);
    settings.SPEED_INCREASE_INTERVAL = value;
    resetSpeedRate();
  }
  if (type == "SPEED_INC") {
    value = parseInt(value, 10);
    settings.SPEED_INCREASE_RATE = value;
    resetSpeedRate();
  }
  if (type == "FOOD") {
    value = parseInt(value, 10);
    settings.FOOD_SPAWN_RATE = value;
    resetFood();
    init();
    newFoodAfterWallChange();
    update();
    draw();
  }

  if (type == "RESET") {
    reset();
    init();
    newFoodAfterWallChange();
    update();
    draw();
  }
}
var modalVis = false;
window.addEventListener("keydown", (e) => {
  if (e.key == "p") {
    pause();
  }
  if (e.key == "s") {
    if (modalVis == false) {
      showModal();
      modalVis = !modalVis;
      return;
    }
    if (modalVis == true) {
      document.getElementById("close-btn").focus();
      hideModal();
      modalVis = !modalVis;
      return;
    }
  }
});

function pause() {
  run = !run;
  start();
}

const modal = document.querySelector(".settings-modal");
const pauseBtn = document.querySelector("#pause-btn");
const settingsBtn = document.querySelector("#settings-btn");
// const closeBtn = document.querySelector("#close-btn");
const resetBtn = document.querySelector("#reset-btn");
const defaultBtn = document.querySelector("#default-btn");
const close = document.querySelector(".close");

settingsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showModal();
});

pauseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  pause();
});

close.addEventListener("click", (e) => {
  hideModal();
});

// closeBtn.addEventListener("click", (e) => {

//   hideModal();
// });

defaultBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetDefaultSettings();
  wallInputTxt.value = settings.WALL_SET;
  startSpeedInput.value = settings.SNAKE_SPEED;
  speedIntervalInput.value = settings.SPEED_INCREASE_INTERVAL;
  speedRateInput.value = settings.SPEED_INCREASE_RATE;
  growthInput.value = settings.EXPANSION_RATE;
  foodInput.value = settings.FOOD_SPAWN_RATE;
  updateSettings(0, "RESET");
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  reset();
  hideGameOverModal();
});

export function showModal() {
  modal.style.visibility = "visible";
  if (run) pause();
}

export function hideModal() {
  modal.style.visibility = "hidden";
  if (!run) pause();
}

const gameOverModal = document.querySelector(".gameOver-modal");
const gameOverTxt = document.getElementById("gameOver");
export function gameOver(score) {
  gameOverTxt.innerHTML = "Game over ! </br> You scored: " + score;
  gameOverModal.style.visibility = "visible";
  document.getElementById("reset-btn").focus();
}

function hideGameOverModal() {
  gameOverModal.style.visibility = "hidden";
}

window.addEventListener("click", (e) => {
  if (e.target == gameOverModal) {
    e.preventDefault();
    reset();
    hideGameOverModal();
  }
  if (e.target == modal) {
    hideModal();
  }
});
