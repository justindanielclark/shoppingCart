import dateWithinTime from "../datesWithinTime";

it("can accurately tell if two times are within a period of time supplied", () => {
  const dates = [
    new Date("Jan 1, 2023, 00:00:00.000 GMT"),
    new Date("Jan 1, 2023, 00:00:10.000 GMT"),
    new Date("Jan 1, 2023, 00:10:00.000 GMT"),
    new Date("Jan 1, 2023, 10:00:00.000 GMT"),
    new Date("Aug 1, 2023, 0:00:00.000 GMT"),
    new Date("Jan 1, 2033, 10:00:00.000 GMT"),
  ];
  expect(dateWithinTime(dates[0], dates[1], 600000)).toBe(true);
  expect(dateWithinTime(dates[0], dates[1], 10000)).toBe(true);
  expect(dateWithinTime(dates[0], dates[1], 6000)).toBe(false);
  expect(dateWithinTime(dates[0], dates[2], 600000)).toBe(true);
  expect(dateWithinTime(dates[0], dates[2], 60000)).toBe(false);
  expect(dateWithinTime(dates[0], dates[3], 36000000)).toBe(true);
  expect(dateWithinTime(dates[0], dates[3], 35999999)).toBe(false);
  expect(dateWithinTime(dates[0], dates[4], 181440000000)).toBe(true);
  expect(dateWithinTime(dates[0], dates[4], 18144000000)).toBe(false);
  expect(dateWithinTime(dates[0], dates[5], 3110400000000)).toBe(true);
  expect(dateWithinTime(dates[0], dates[5], 311040000000)).toBe(false);
});
