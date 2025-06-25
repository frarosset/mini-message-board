const dateToStr = require("./dateToStr.js");

const nowStr = [2025, 5, 25, 13, 1, 0]; //2025-06-25T11:01:00

const testDates = [
  [[2025, 5, 25, 13, 1, 0], "Just now"],
  [[2025, 5, 25, 13, 0, 40], "Just now"],
  [[2025, 5, 25, 13, 0, 1], "Just now"],
  [[2025, 5, 25, 13, 0, 0], "1 minute ago"],
  [[2025, 5, 25, 12, 58, 1], "3 minutes ago"],
  [[2025, 5, 25, 12, 58, 0], "3 minutes ago"],
  [[2025, 5, 25, 12, 57, 59], "3 minutes ago"],
  [[2025, 5, 25, 12, 1, 1], "1 hour ago"],
  [[2025, 5, 25, 12, 1, 0], "12:01"], // today
  [[2025, 5, 25, 12, 0, 59], "12:00"], // today
  [[2025, 5, 25, 0, 0, 0], "00:00"], // today
  [[2025, 5, 24, 23, 59, 59], "Yesterday, 23:59"], // yesterday
  [[2025, 5, 24, 13, 1, 0], "Yesterday, 13:01"], // yesterday
  [[2025, 5, 24, 0, 0, 0], "Yesterday, 00:00"], // yesterday
  [[2025, 5, 23, 23, 59, 59], "Monday 23:59"], // past week
  [[2025, 5, 19, 0, 0, 0], "Thursday 00:00"], // past week
  [[2025, 5, 18, 23, 59, 59], "18 June at 23:59"], // past year
  [[2024, 5, 26, 0, 0, 0], "26 June at 00:00"], // past year
  [[2024, 5, 25, 23, 59, 59], "25/06/2024, 23:59"], // previous year
];

// mock today date
const now = new Date(...nowStr);
jest.useFakeTimers().setSystemTime(now);

describe("dateToStr", () => {
  testDates.forEach((testDate) => {
    const date = new Date(...testDate[0]);

    test(`Test date ${date.toLocaleString()} -> ${testDate[1]}`, () => {
      expect(dateToStr(date)).toEqual(testDate[1]);
    });
  });
});
