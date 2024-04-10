import { Player } from "./player";
import { Point } from "./point";

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
    if (this.segments.length > 0) {
      // Actualiza la posición del cuerpo del snake
      for (let i = this.segments.length - 1; i > 0; i--) {
        this.segments[i] = { ...this.segments[i - 1] };
      }
      this.segments[0] = { posX: this.posX, posY: this.posY };
    }

    // Mueve la cabeza en la dirección actual
    this.posX += this.directionX * 10;
    this.posY += this.directionY * 10;
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
    if (this.checkColision()) {
      clearInterval(this.intervalId as number);
      alert(`¡Has perdido! Tu puntuación ha sido de ${player.getScore}`);
      document.location.reload();
    }
    // Volver a dibujar el punto si aún no ha sido capturado
    if (!this.pointIsCaptured(point)) {
      point.generatePointOnGameBoard(container);
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
    // Comprueba si la cabeza del snake colisiona con los límites del tablero
    if (
      snakeHead.posX < -9 ||
      snakeHead.posX >= 800 ||
      snakeHead.posY < -9 ||
      snakeHead.posY >= 800
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
