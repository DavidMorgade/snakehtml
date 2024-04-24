import { Player } from "./player";

const form = document.getElementById("form") as HTMLFormElement;

export const player = new Player("");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = (document.getElementById("player-name") as HTMLInputElement)
    .value;
  player.setName = username;
  addSnakeHTML();
  import("./main").then((module) => {
    module.startGame(player);
  });
});

const addSnakeHTML = () => {
  const app = document.getElementById("app") as HTMLDivElement;
  app.remove();
  const newApp = document.createElement("div");
  newApp.id = "app";
  newApp.innerHTML = `
      <main>
        <div id="game-board">
          <div id="game" width="800" height="600"></div>
          <div id="score">
            <h1 id="player-name"></h1>
            <h2>Score: <span id="player-score">0</span></h2>
            <button id="reset-button">Reset</button>
          </div>
        </div>
      </main>
  `;
  document.body.appendChild(newApp);
};
