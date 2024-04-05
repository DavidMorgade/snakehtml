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
  const snakeElement = document.getElementById("snake");
  if (snakeElement) {
    snakeElement.style.left = `${snake.getPosX()}px`;
    snakeElement.style.top = `${snake.getPosY()}px`;
  }
}
