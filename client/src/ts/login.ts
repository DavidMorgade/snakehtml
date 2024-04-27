import { API_URL_DEV } from "./consts";
import { Player } from "./player";

// HTML Elements
const form = document.getElementById("form") as HTMLFormElement;
const audioButtonMuted = document.getElementById("pause") as HTMLButtonElement;
const audioButtonUnmuted = document.getElementById("play") as HTMLButtonElement;
const highscoreButton = document.querySelector(
  ".btn__highscore"
) as HTMLButtonElement;
const modalBtnClose = document.getElementById(
  "close-modal"
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
  showHighScores();
});

modalBtnClose.addEventListener("click", () => {
  hideHighScores();
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
          <div id="score">
            <h1 id="player-name"></h1>
            <h2>Score: <span id="player-score">0</span></h2>
            <button id="reset-button">Reset</button>
          </div>
          <div id="game" width="800" height="600"></div>
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

function showHighScores() {
  const modal = document.getElementById("highScoresModal") as HTMLDivElement;
  modal.style.display = "block";
  if (document.getElementById("highScores") !== null) return;
  fetch(`${API_URL_DEV}/Values/top`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const highScores = document.createElement("ul");
        highScores.id = "highScores";
        highScores.className = "highscores";
        highScores.innerHTML = "";
        data.forEach((element: any, index: number) => {
          if (index > 9) return;
          const li = document.createElement("li");
          li.className = "highscore";
          li.textContent = `${index + 1} - ${element.name} Score: ${
            element.score
          }`;
          highScores.appendChild(li);
        });
        const modalContent = document.getElementById(
          "modal-content"
        ) as HTMLDivElement;
        modalContent.appendChild(highScores);
      } else {
        const highScores = document.createElement("p");
        highScores.id = "highScores";
        highScores.className = "highscores";
        highScores.textContent = "No hay puntuaciones";
        const modalContent = document.getElementById(
          "modal-content"
        ) as HTMLDivElement;
        modalContent.appendChild(highScores);
      }
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function hideHighScores() {
  const modal = document.getElementById("highScoresModal") as HTMLDivElement;

  modal.style.display = "none";
}
