import { Player } from "./player";

const form = document.getElementById("form") as HTMLFormElement;

export const player = new Player("");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = (document.getElementById("player-name") as HTMLInputElement)
    .value;
  player.setName = username;
  window.location.href = "snake.html";
});
