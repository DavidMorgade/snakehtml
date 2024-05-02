export class Point {
  private posX: number;
  private posY: number;

  public constructor() {
    this.posX = this.generateRandomCoordinateX();
    this.posY = this.generateRandomCoordinateY();
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
    this.generateNewPoint();
  }

  public deletePointOnGameBoard(HTMLDivElement: HTMLElement): void {
    const pointElement = HTMLDivElement.querySelector(".point");
    if (pointElement) {
      HTMLDivElement.removeChild(pointElement);
    }
  }

  public generateNewPoint(): void {
    // generate new random coordinates
    this.posX = this.generateRandomCoordinateX();
    this.posY = this.generateRandomCoordinateY();
  }

  // generate random coordinate point board X
  private generateRandomCoordinateX(): number {
    const boardWidth = document.querySelector("#game")?.clientWidth as number;
    // The number needs to end in the same width as the point
    return Math.floor((Math.random() * boardWidth) / 10) * 10;
  }
  // generate random coordinate point board Y
  private generateRandomCoordinateY(): number {
    const boardHeight = document.querySelector("#game")?.clientHeight as number;
    // the number needs to end in 10 to fit the snake segments
    return Math.floor((Math.random() * boardHeight) / 10) * 10;
  }
}
