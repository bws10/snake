const wallSetTxt = document.getElementById("wallSetTxt").value;
if (wallSetTxt == undefined) {
  wallSetTxt = 1;
}

export const settings = {
  GRID_SIZE: 21,
  EXPANSION_RATE: 1,
  SPEED_INCREASE_INTERVAL: 10,
  SPEED_INCREASE_RATE: 1,
  SNAKE_SPEED: 5,
  FOOD_SPAWN_RATE: 3,
  WALL_SET: wallSetTxt,
};
