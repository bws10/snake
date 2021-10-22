import { settings } from "./settings.js";
export const GRID_SIZE = settings.GRID_SIZE;

export function setGridSize(gameBoard) {
  gameBoard.style.gridTemplateColumns = "repeat(" + GRID_SIZE + ", 1fr";
  gameBoard.style.gridTemplateRows = "repeat(" + GRID_SIZE + ", 1fr";

  return;
}

export function getRandomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}
