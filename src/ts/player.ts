export class Player {
  private name: string;
  private score: number;

  constructor(name: string) {
    this.name = name || "Player";
    this.score = 0;
  }

  get getName() {
    return this.name;
  }
  set setName(name: string) {
    this.name = name;
  }
  get getScore() {
    return this.score;
  }
  set setScore(score: number) {
    this.score = score;
  }

  public increaseScore(): void {
    this.score += 1;
    this.setHTMLPlayerScore();
  }

  public setHTMLPlayerName(): void {
    const playerName = document.getElementById(
      "player-name"
    ) as HTMLHeadingElement;
    playerName.innerHTML = this.name;
  }
  public setHTMLPlayerScore(): void {
    const playerScore = document.getElementById(
      "player-score"
    ) as HTMLHeadingElement;
    playerScore.innerHTML = this.score.toString();
  }
}
