export const STORED_SETTINGS_KEY = "snake_stored_settings";

var wallSetTxt = document.getElementById("wallSetTxt").value;
if (wallSetTxt == "") {
  wallSetTxt = 1;
}

export var settings = {};
if (localStorage.getItem(STORED_SETTINGS_KEY)) {
  settings = JSON.parse(localStorage.getItem(STORED_SETTINGS_KEY));
} else {
  settings = {
    GRID_SIZE: 21,
    EXPANSION_RATE: 1,
    SPEED_INCREASE_INTERVAL: 10,
    SPEED_INCREASE_RATE: 1,
    SNAKE_SPEED: 5,
    FOOD_SPAWN_RATE: 3,
    WALL_SET: 1,
  };
}
localStorage.setItem(STORED_SETTINGS_KEY, JSON.stringify(settings));
