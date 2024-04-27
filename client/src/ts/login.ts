import { API_URL_DEV } from "./consts";
import { Player } from "./player";

// HTML Elements
const form = document.getElementById("form") as HTMLFormElement;
const audioButtonMuted = document.getElementById("pause") as HTMLButtonElement;
const audioButtonUnmuted = document.getElementById("play") as HTMLButtonElement;
const highscoreButton = document.querySelector(
  ".btn__highscore"
) as HTMLButtonElement;

export const player = new Player("");

// Event Listeners
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

highscoreButton.addEventListener("click", () => {
  fetch(`${API_URL_DEV}/Values`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

audioButtonMuted.addEventListener("click", toogleAudio);

audioButtonUnmuted.addEventListener("click", toogleAudio);

const addSnakeHTML = () => {
  const app = document.getElementById("app") as HTMLDivElement;
  app.remove();
  const newApp = document.createElement("div");
  newApp.id = "app";
  // The HTML template for the snake game
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

function toogleAudio() {
  if (audioButtonMuted.style.display === "none") {
    audioButtonMuted.style.display = "block";
    audioButtonUnmuted.style.display = "none";
  } else {
    audioButtonMuted.style.display = "none";
    audioButtonUnmuted.style.display = "block";
  }
}
