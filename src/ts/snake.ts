import { Player } from "./player";
import { Point } from "./point";

export class Snake {
  private segments: { posX: number; posY: number }[];
  private posX: number;
  private posY: number;
  private directionX: number = 1;
  private directionY: number = 0;
  private speed: number = 200;
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
      this.directionX = dirX;
      this.directionY = dirY;
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
    if (this.checkColision()) {
      clearInterval(this.intervalId as number);
      alert(`¡Has perdido! Tu puntuación ha sido de ${player.getScore}`);
      document.location.reload();
    }
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

    // Volver a dibujar el punto si aún no ha sido capturado
    if (!this.pointIsCaptured(point)) {
      point.generatePointOnGameBoard(container);
    } else {
      this.grow();
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

  public checkColision(): boolean {
    // Comprueba si la cabeza del snake colisiona con los límites del tablero
    if (
      this.posX < -10 ||
      this.posX >= 810 ||
      this.posY < -10 ||
      this.posY >= 810
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

  public grow(): void {
    // Añade un segmento al final del cuerpo
    this.segments.push({ posX: this.posX, posY: this.posY });
    this.speed -= 0.05;
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
