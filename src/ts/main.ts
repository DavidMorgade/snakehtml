import { Point } from "./point";
import { Snake } from "./snake";
import { Player } from "./player";

const player = new Player("");
const snake = new Snake();
const point = new Point();
const container = document.getElementById("game") as HTMLDivElement;
const resetButton = document.getElementById(
  "reset-button"
) as HTMLButtonElement;

resetButton.addEventListener("click", () => {
  document.location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  setHTMLNameAndScore();
  startGame();
});

const setHTMLNameAndScore = () => {
  const playerName = prompt("Introduce tu nombre de jugador");
  player.setName = playerName || "Player";
  player.setHTMLPlayerName();
  player.setHTMLPlayerScore();
};

const startGame = () => {
  point.generatePointOnGameBoard(container);
  document.addEventListener("keydown", (event) => snake.evaluateKey(event));
  snake.startAutoMove(container, player, point);
};
