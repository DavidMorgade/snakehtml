export class Point {
  private posX: number;
  private posY: number;

  public constructor() {
    this.posX = this.generateRandomCoordinate();
    this.posY = this.generateRandomCoordinate();
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

  public generatePointOnGameBoard(HTMLDivElement: HTMLDivElement): void {
    const pointElement = document.createElement("div");
    pointElement.classList.add("point");
    pointElement.style.left = `${this.posX}px`;
    pointElement.style.top = `${this.posY}px`;
    HTMLDivElement.appendChild(pointElement);
  }

  public deletePointOnGameBoard(HTMLDivElement: HTMLElement): void {
    const pointElement = HTMLDivElement.querySelector(".point");
    if (pointElement) {
      HTMLDivElement.removeChild(pointElement);
    }
  }

  public generateNewPoint(): void {
    // generate new random coordinates
    this.posX = this.generateRandomCoordinate();
    this.posY = this.generateRandomCoordinate();
  }

  // generate random coordinate for the 800 x 800 board
  private generateRandomCoordinate(): number {
    return Math.floor(Math.random() * 80) * 10;
  }
}
