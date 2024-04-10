import { Point } from "./point";
import { Snake } from "./snake";
import { player } from "./login";

// Objects
const snake = new Snake();
const point = new Point();
// HTML Elements
const container = document.getElementById("game") as HTMLDivElement;
const resetButton = document.getElementById(
  "reset-button"
) as HTMLButtonElement;

// Event Listeners
resetButton.addEventListener("click", () => {
  document.location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  setHTMLNameAndScore();
  startGame();
});

const setHTMLNameAndScore = () => {
  player.setHTMLPlayerName();
  player.setHTMLPlayerScore();
};

const startGame = () => {
  point.generatePointOnGameBoard(container);
  document.addEventListener("keydown", (event) => snake.evaluateKey(event));
  snake.startAutoMove(container, player, point);
};
