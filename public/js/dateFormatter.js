import dateToStr from "/js/dateToStr.js";

function dateFormatter() {
  const allDates = document.querySelectorAll(".date");

  allDates.forEach((el) => {
    el.textContent = dateToStr(new Date(el.dataset.date));
  });

  const allSimpleDates = document.querySelectorAll(".simple-date");

  allSimpleDates.forEach((el) => {
    el.textContent = dateToStr(new Date(el.dataset.date), "simple");
  });
}

dateFormatter();

window.dateFormatter = dateFormatter;
