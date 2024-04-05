export class Snake {
  private segments: { posX: number; posY: number }[];
  private posX: number;
  private posY: number;

  public constructor() {
    this.segments = [
      { posX: 10, posY: 400 },
      { posX: 15, posY: 400 },
      { posX: 20, posY: 400 },
    ];
    this.posX = 10;
    this.posY = 400;
  }

  public moveLeft(): void {
    if (this.deadSnake()) {
      return;
    }
    this.move();
    this.posX -= 10;
  }

  public moveRight(): void {
    if (this.deadSnake()) {
      return;
    }
    this.move();
    this.posX += 10;
  }

  public moveUp(): void {
    if (this.deadSnake()) {
      return;
    }
    this.move();
    this.posY -= 10;
  }

  public moveDown(): void {
    if (this.deadSnake()) {
      return;
    }
    this.move();
    this.posY += 10;
  }

  private move(): void {
    if (this.segments.length > 0) {
      // Actualiza la posición del cuerpo del snake
      for (let i = this.segments.length - 1; i > 0; i--) {
        this.segments[i] = { ...this.segments[i - 1] };
      }
      this.segments[0] = { posX: this.posX, posY: this.posY };
    }
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

  private deadSnake(): boolean {
    return (
      this.posX < 10 || this.posX > 780 || this.posY < 10 || this.posY > 780
    );
  }
}
