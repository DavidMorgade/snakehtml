import { Snake } from "./snake";

const snake = new Snake();

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});

const startGame = () => {
  updateSnakePosition();
  document.addEventListener("keydown", (event) => evaluateKey(event));
};

let intervalId: number | null = null;

const evaluateKey = (event: KeyboardEvent) => {
  if (event.key.startsWith("Arrow")) {
    // Cambiar la dirección del snake inmediatamente
    switch (event.key) {
      case "ArrowUp":
        snake.changeDirection(0, -1); // Arriba
        break;
      case "ArrowDown":
        snake.changeDirection(0, 1); // Abajo
        break;
      case "ArrowLeft":
        snake.changeDirection(-1, 0); // Izquierda
        break;
      case "ArrowRight":
        snake.changeDirection(1, 0); // Derecha
        break;
    }
  }
};

const startAutoMove = () => {
  intervalId = setInterval(() => {
    snake.move();
    updateSnakePosition();
  }, 200);
};

// Iniciar el movimiento automático al cargar la página
startAutoMove();

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
