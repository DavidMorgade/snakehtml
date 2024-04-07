import { Point } from "./point";
import { Snake } from "./snake";

const snake = new Snake();
const point = new Point();
const container = document.getElementById("game") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});

const startGame = () => {
  point.generatePointOnGameBoard(container);
  document.addEventListener("keydown", (event) => evaluateKey(event));
  startAutoMove();
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
  }, snake.getSpeed());
};

function updateSnakePosition() {
  const snakeSegments = snake.getSegments();

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

  // Volver a dibujar el punto si aún no ha sido capturado
  if (!pointIsCaptured(snake)) {
    point.generatePointOnGameBoard(container);
  } else {
    snake.grow();
    // Generar un nuevo punto si el anterior ha sido capturado
    point.generateNewPoint();
  }
}

function pointIsCaptured(snake: Snake): boolean {
  const snakeHeadX = snake.getPosX();
  const snakeHeadY = snake.getPosY();
  const pointX = point.getPosX();
  const pointY = point.getPosY();
  // Comprobar si la cabeza de la serpiente está en la misma posición que el punto
  return snakeHeadX === pointX && snakeHeadY === pointY;
}
