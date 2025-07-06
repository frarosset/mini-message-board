import dateToStr from "/js/dateToStr.js";

const allDates = document.querySelectorAll(".date");

allDates.forEach((el) => {
  el.textContent = dateToStr(new Date(el.dataset.date));
});
