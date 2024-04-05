export class Snake {
  private segments: { posX: number; posY: number }[];
  private posX: number;
  private posY: number;
  private directionX: number = 1;
  private directionY: number = 0;

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

  public getSegments(): { posX: number; posY: number }[] {
    return this.segments;
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
