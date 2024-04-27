export interface Score {
  id: number;
  name: string;
  score: number;
  scoredAt: string; // Or you can use Date type if you parse the string to Date object
}
