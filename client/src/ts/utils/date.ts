import { Score } from "../types/ScoreApi";

export function formatDate(data: Score): string {
  const newDate = new Date(data.scoredAt);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}`;
}
