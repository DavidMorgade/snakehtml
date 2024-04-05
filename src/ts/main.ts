import { Snake } from "./snake";

const snake = new Snake();

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});

const startGame = () => {
  document.addEventListener("keydown", (event) => evaluateKey(event));
};

const evaluateKey = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowUp":
      snake.moveUp();
      break;
    case "ArrowDown":
      snake.moveDown();
      break;
    case "ArrowLeft":
      snake.moveLeft();
      break;
    case "ArrowRight":
      snake.moveRight();
      break;
  }
  console.log(snake.getPosX(), snake.getPosY());
  updateSnakePosition();
};

function updateSnakePosition() {
  const snakeSegments = snake.getSegments();
  const container = document.getElementById("game");

  if (container) {
    // Limpiar el contenedor
    container.innerHTML = "";

    // Pintar cada segmento del snake
    snakeSegments.forEach((segment) => {
      const segmentElement = document.createElement("div");
      segmentElement.classList.add("snake-segment");
      segmentElement.style.left = `${segment.posX}px`;
      segmentElement.style.top = `${segment.posY}px`;
      container.appendChild(segmentElement);
    });
  }
}
