class Player {
  private name: string;
  private score: number;

  constructor(name: string) {
    this.name = name;
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
}
