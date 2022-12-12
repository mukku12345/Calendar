let selectedMonth = +document.querySelector("#selected-month").value;
let selectedYear = +document.querySelector("#selected-year").value;
const greenMarkedDates = new Array(31).fill(false, 0, 31);
// const newGreenMarkedDates = greenMarkedDates;

const updateMonth = () => {
  selectedMonth = +document.querySelector("#selected-month").value;
  clearTable();
  renderTableData();
};
const updateYear = () => {
  selectedYear = +document.querySelector("#selected-year").value;
  clearTable();
  renderTableData();
};

function markedDate() {
  console.log("inside markedDate");
  let enteredDate = document.querySelector("#entered-date").value;
  if (enteredDate === "") {
    alert("Please enter a date");
  } else if (
    +enteredDate <= 0 ||
    +enteredDate > getNumberOfDaysInMonth(selectedMonth, selectedYear)
  ) {
    alert("Please enter a valid date for selected month and year");
  } else {
    firstDay = getFirstDayOfMonth();
    let td = document.querySelectorAll("td");
    for (let i = 0; i < td.length; i++) {
      if (td[i].innerHTML === enteredDate) {
        td[i].classList.toggle("green");
      }
    }
    greenMarkedDates[enteredDate - 1] = !greenMarkedDates[enteredDate - 1];
    console.log(greenMarkedDates);
  }
  document.querySelector("#entered-date").value = "";
}

renderTableData();
function clearTable() {
  let td = document.querySelectorAll("td");
  for (let i = 0; i < 42; i++) {
    td[i].innerHTML = "";
    if (td[i].classList.contains("green")) {
      td[i].classList.remove("green");
    }
  }
}

function renderTableData() {
  let td = document.querySelectorAll("td");
  const noOfDays = getNumberOfDaysInMonth(selectedMonth, selectedYear);
  let count = 1;
  let firstDay = getFirstDayOfMonth();
  for (let i = firstDay; i < firstDay + noOfDays; i++) {
    td[i].innerHTML = count;
    count++;
  }
  for (let i = 0; i < 31; i++) {
    if (greenMarkedDates[i] === true) {
      td[firstDay + i].classList.add("green");
    }
  }
}

function getNumberOfDaysInMonth(month, year) {
  if (month === 2) {
    if (isLeapYear(year)) {
      return 29;
    } else {
      return 28;
    }
  } else if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    return 31;
  } else {
    return 30;
  }
}

function getFirstDayOfMonth() {
  let oddDays = 0;
  let leapYear = 0;
  let ordinaryYear = 0;
  if (selectedYear <= 2000) {
    leapYear = getNumberOfLeapYear(selectedYear - 1 - 1900);
    ordinaryYear = selectedYear - 1 - 1900 - leapYear;
    oddDays += 1 + (leapYear * 2 + ordinaryYear * 1);
  } else {
    leapYear = getNumberOfLeapYear(selectedYear - 1 - 2000);
    ordinaryYear = selectedYear - 1 - 2000 - leapYear;
    oddDays += leapYear * 2 + ordinaryYear * 1;
  }

  const monthWiseOddDaysForOrdinaryYear = [3, 0, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3];
  const monthWiseOddDaysForLeapYear = [3, 1, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3];
  for (let i = 0; i < selectedMonth - 1; i++) {
    if (isLeapYear(selectedYear)) {
      oddDays += monthWiseOddDaysForLeapYear[i];
    } else {
      oddDays += monthWiseOddDaysForOrdinaryYear[i];
    }
  }
  oddDays += 1;
  return oddDays % 7;
}
function getNumberOfLeapYear(yearCount) {
  return Math.floor(yearCount / 4);
}

function isLeapYear(year) {
  if (year === 2000) {
    return true;
  } else if (year % 4 === 0) {
    return true;
  } else {
    false;
  }
}
