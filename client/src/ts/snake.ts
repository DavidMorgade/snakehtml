import { API_URL_DEV } from "./consts";
import { Player } from "./player";
import { Point } from "./point";

const gameBoard = document.getElementById("game-board") as HTMLDivElement;

export class Snake {
  private segments: { posX: number; posY: number }[];
  private posX: number;
  private posY: number;
  private directionX: number = 1;
  private directionY: number = 0;
  private speed: number = 100;
  private intervalId: number | null = null;

  public constructor() {
    this.segments = [
      { posX: 10, posY: 400 },
      { posX: 15, posY: 400 },
      { posX: 20, posY: 400 },
    ];
    this.posX = 10;
    this.posY = 400;
  }

  // Resto de métodos

  public changeDirection(dirX: number, dirY: number): void {
    // No permitir cambios de dirección opuestos para evitar colisiones consigo mismo
    if (this.directionX !== -dirX || this.directionY !== -dirY) {
      setTimeout(() => {
        this.directionX = dirX;
        this.directionY = dirY;
      }, 80);
    }
  }

  public move(): void {
    const snakeWidth =
      document.querySelector(".snake-segment")?.clientWidth || 10;
    if (this.segments.length > 0) {
      // Actualiza la posición del cuerpo del snake
      for (let i = this.segments.length - 1; i > 0; i--) {
        this.segments[i] = { ...this.segments[i - 1] };
      }
      this.segments[0] = { posX: this.posX, posY: this.posY };
    }
    // Mueve la cabeza en la dirección actual
    this.posX += this.directionX * snakeWidth;
    this.posY += this.directionY * snakeWidth;
  }

  public evaluateKey = (event: KeyboardEvent) => {
    if (event.key.startsWith("Arrow")) {
      // Cambiar la dirección del snake inmediatamente
      switch (event.key) {
        case "ArrowUp":
          this.changeDirection(0, -1); // Arriba
          break;
        case "ArrowDown":
          this.changeDirection(0, 1); // Abajo
          break;
        case "ArrowLeft":
          this.changeDirection(-1, 0); // Izquierda
          break;
        case "ArrowRight":
          this.changeDirection(1, 0); // Derecha
          break;
      }
    }
  };

  public startAutoMove = (
    container: HTMLDivElement,
    player: Player,
    point: Point
  ) => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.move();
      this.updateSnakePosition(container, player, point);
    }, this.getSpeed());
  };

  private updateSnakePosition(
    container: HTMLDivElement,
    player: Player,
    point: Point
  ): void {
    const snakeSegments = this.getSegments();

    // Eliminar todos los segmentos del snake del tablero
    const snakeSegmentElements = document.querySelectorAll(".snake-segment");
    snakeSegmentElements.forEach((segment) => {
      container.removeChild(segment);
    });

    // Pintar cada segmento del snake
    snakeSegments.forEach((segment) => {
      const segmentElement = document.createElement("div");
      segmentElement.classList.add("snake-segment");
      segmentElement.style.left = `${segment.posX}px`;
      segmentElement.style.top = `${segment.posY}px`;
      container.appendChild(segmentElement);
    });
    if (this.checkColision()) {
      clearInterval(this.intervalId as number);
      this.generateFinishWindow(player);
      this.sendScore(player);
    }
    // Volver a dibujar el punto si aún no ha sido capturado
    if (!this.pointIsCaptured(point)) {
    } else {
      this.grow(container, player, point);
      player.increaseScore();
      // Generar un nuevo punto si el anterior ha sido capturado
      point.generateNewPoint();
    }
  }

  private pointIsCaptured(point: Point): boolean {
    const snakeHeadX = this.posX;
    const snakeHeadY = this.posY;
    const pointX = point.getPosX();
    const pointY = point.getPosY();
    // Comprobar si la cabeza de la serpiente está en la misma posición que el punto
    return snakeHeadX === pointX && snakeHeadY === pointY;
  }

  private checkColision(): boolean {
    const snakeHead = this.segments[0];
    const boardHeight = document.querySelector("#game")?.clientHeight as number;
    const boardWidth = document.querySelector("#game")?.clientWidth as number;
    // Comprueba si la cabeza del snake colisiona con los límites del tablero
    if (
      snakeHead.posX < 0 ||
      snakeHead.posX >= boardWidth ||
      snakeHead.posY < 0 ||
      snakeHead.posY >= boardHeight - 5
    ) {
      return true;
    }

    // Comprueba si la cabeza del snake colisiona consigo misma
    for (let i = 1; i < this.segments.length; i++) {
      if (
        this.posX === this.segments[i].posX &&
        this.posY === this.segments[i].posY
      ) {
        return true;
      }
    }

    return false;
  }

  private grow(container: HTMLDivElement, player: Player, point: Point): void {
    // Añade un segmento al final del cuerpo
    this.segments.push({ posX: this.posX, posY: this.posY });
    const newSpeed = this.speed - 2;
    this.speed = Math.max(newSpeed, 2);
    this.startAutoMove(container, player, point);
  }

  private generateFinishWindow(player: Player): void {
    const finishWindow = document.createElement("div");
    finishWindow.id = "finish-modal";
    finishWindow.className = "modal-finish";
    finishWindow.innerHTML = `
      <div class="modal-content-finish">
        <h1>¡Has perdido!</h1>
        <p>Tu puntuación ha sido de ${player.getScore}</p>
        <button class="btn" id="restart-button">Volver a inicio</button>
      </div>
    `;
    gameBoard.appendChild(finishWindow);
    const restartButton = document.getElementById("restart-button");
    restartButton?.addEventListener("click", () => {
      document.location.reload();
    });
  }

  private sendScore(player: Player): void {
    const score = player.getScore;
    const name = player.getName;
    fetch(`${API_URL_DEV}/Values`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, score }),
    });
  }

  public getSegments(): { posX: number; posY: number }[] {
    return this.segments;
  }
  public getSpeed(): number {
    return this.speed;
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public setPosX(posX: number): void {
    this.posX = posX;
  }

  public setPosY(posY: number): void {
    this.posY = posY;
  }
}
