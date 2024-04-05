export class Snake {
  private posX: number;
  private posY: number;

  public constructor() {
    this.posX = 10;
    this.posY = 400;
  }

  public moveLeft(): void {
    this.posX -= 10;
  }
  public moveRight(): void {
    this.posX += 10;
  }
  public moveUp(): void {
    this.posY -= 10;
  }
  public moveDown(): void {
    this.posY += 10;
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
