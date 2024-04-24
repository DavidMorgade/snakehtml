import { Point } from "./point";
import { Snake } from "./snake";
import { Player } from "./player";

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

const setHTMLNameAndScore = (player: Player) => {
  player.setHTMLPlayerName();
  player.setHTMLPlayerScore();
};

export const startGame = (player: Player) => {
  setHTMLNameAndScore(player);
  point.generatePointOnGameBoard(container);
  document.addEventListener("keydown", (event) => snake.evaluateKey(event));
  snake.startAutoMove(container, player, point);
};
