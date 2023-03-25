export default function dateWithinTime(
  date1: Date,
  date2: Date,
  timeDiffInMilliseconds: number
): boolean {
  return (
    Math.floor(Math.abs(date1.getTime() - date2.getTime())) <=
    timeDiffInMilliseconds
  );
}
