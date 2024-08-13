const calendarBtn = document.querySelector(".calendar-icon");
const labelForTimeAndDateText = document.querySelectorAll(
  ".set-date-and-time-bar>label"
);
const calendarDateText = Array.from(labelForTimeAndDateText)[0];
const labelTimeInput = Array.from(labelForTimeAndDateText)[1];
const calendarContainer = document.querySelector(".calendar");
const setTimerBtn = document.querySelector(".set-time-icon");
const timePicker = document.querySelector(".time-setter");
const listItemContainer = document.querySelector(".to-do-list-items");

calendarContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});
timePicker.addEventListener("click", (event) => {
  event.stopPropagation();
});



// convert into time format
function convertTo24hour(timeStr) {
  //console.log(timeStr);
  let timeParts = timeStr.split(" ");
  let time = timeParts[0].split(":");
  let hours = parseInt(time[0]);
  let minutes = parseInt(time[1]);
  let ampm = timeParts[1];
  if (ampm === "PM" && hours != 12) {
    hours += 12;
  }
  if (ampm === "AM" && hours === 12) {
    hours = 0;
  }
  return (hours < 10 ? "0" : " ") + hours + ":" + minutes;
}

const sortFunction = (a, b) => {
  if (b.noteYear != a.noteYear) return a.noteYear - b.noteYear;
  if (b.noteMonth != a.noteMonth) return a.noteMonth - b.noteMonth;
  if (b.noteDay != a.noteDay) return a.noteDay - b.noteDay;
  let timeA = convertTo24hour(a.noteTime);
  let timeB = convertTo24hour(b.noteTime);
  if (timeA < timeB) return 1;
  if (timeA > timeB) return -1;
  return 0;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let statusOfCalenderIcon = false;
let statusOfTimePicker = false;
let currentDate = new Date();
calendarBtn.addEventListener("click", () => {
  if (statusOfTimePicker === true) {
    timePicker.style.display = "none";
    statusOfTimePicker = false;
  }
  if (statusOfCalenderIcon === true) {
    calendarContainer.style.display = "none";
    statusOfCalenderIcon = false;
  } else {
    calendarContainer.style.cssText =
      "display:block;position:absolute;top:150px;left:0px;z-index:2";
    const monthSelect = document.getElementById("month-select");
    const yearSelect = document.getElementById("year-select");
    const prevYearBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");
    const calenderDays = document.getElementById("calendarDays");

    function dropdownMonthYearSelects() {
      months.forEach((month, index) => {
        const monthOption = document.createElement("option");
        monthOption.value = index;
        monthOption.textContent = month;
        monthSelect.appendChild(monthOption);
      });
      const currentYear = currentDate.getFullYear();
      for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        const yearOption = document.createElement("option");
        yearOption.value = year;
        yearOption.textContent = year;
        yearSelect.appendChild(yearOption);
      }
      monthSelect.value = currentDate.getMonth();
      yearSelect.value = currentYear;
    }
    function updateCalendar() {
      const year = parseInt(yearSelect.value);
      const month = parseInt(monthSelect.value);
      const firstDay = new Date(year, month, 1);
      const lastday = new Date(year, month + 1, 0);
      calenderDays.innerHTML = " ";

      for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement("div");
        calenderDays.appendChild(emptyDay);
      }
      for (let i = 1; i <= lastday.getDate(); i++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = i;
        if (
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth() &&
          i === currentDate.getDate()
        ) {
          dayElement.classList.add("today");
        }
        dayElement.addEventListener("click", function () {
          document
            .querySelectorAll(".days div")
            .forEach((elem) => elem.classList.remove("selected"));
          this.classList.add("selected");

          calendarDateText.innerHTML = `${this.textContent}/${month}/${year}`;
        });

        calenderDays.appendChild(dayElement);
      }
    }
    dropdownMonthYearSelects();
    updateCalendar();
    monthSelect.addEventListener("change", updateCalendar);
    yearSelect.addEventListener("change", updateCalendar);
    prevYearBtn.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      monthSelect.value = currentDate.getMonth();
      yearSelect.value = currentDate.getFullYear();
      updateCalendar();
    });

    nextMonthBtn.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      monthSelect.value = currentDate.getMonth();
      yearSelect.value = currentDate.getFullYear();
      updateCalendar();
    });
    statusOfCalenderIcon = true;
  }
});

// timeseter
setTimerBtn.addEventListener("click", () => {
  if (statusOfCalenderIcon === true) {
    calendarContainer.style.display = "none";
    statusOfCalenderIcon = false;
  }
  if (statusOfTimePicker === true) {
    timePicker.style.display = "none";
    statusOfTimePicker = false;
  } else {
    timePicker.style.cssText =
      "display:block;position:absolute;top:150px;left:80px;z-index:2";
    // setting time picker
    const hoursSelect = document.getElementById("hours");
    const minutesSelect = document.getElementById("minutes");
    const ampmSelect = document.getElementById("am-pm");

    function padWithZero(num) {
      return num.toString().padStart(2, "0");
    }

    for (let i = 1; i <= 12; i++) {
      const timeOption = document.createElement("option");
      timeOption.value = padWithZero(i);
      timeOption.textContent = padWithZero(i);
      hoursSelect.appendChild(timeOption);
    }
    for (let i = 0; i < 60; i++) {
      const minuteOption = document.createElement("option");
      minuteOption.value = padWithZero(i);
      minuteOption.textContent = padWithZero(i);
      minutesSelect.appendChild(minuteOption);
    }
    function setCurrentTime() {
      const currentDate = new Date();
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      hoursSelect.value = padWithZero(hours);
      minutesSelect.value = padWithZero(minutes);
      ampmSelect.value = ampm;
    }
    setCurrentTime();
    [hoursSelect, minutesSelect, ampmSelect].forEach((select) => {
      select.addEventListener("change", function () {
        labelTimeInput.textContent = `${hoursSelect.value}:${minutesSelect.value}  ${ampmSelect.value}`;
      });
    });
    statusOfTimePicker = true;
  }
});

// now things lefft for search and adding date and information in localStorage.

const createListItemsHeader = (data) => {
  for (let i = 0; i < data.length; i++) {
    // Create the main container div for the list item
    const listItemDiv = document.createElement("div");
    listItemDiv.classList.add("to-do-list-item");
    // console.log(data[i].note)
    // Create and set the left-aligned heading div
    const divHeading = document.createElement("div");
    divHeading.innerHTML = `<i class="fa-solid fa-caret-up "></i> ${
      data[i].noteDay
    } ${months[data[i].noteMonth]} ${data[i].noteYear}`;
    divHeading.classList.add("left");
    const divLeftEnd = document.createElement("span");
    divLeftEnd.innerHTML = `<button class="edit-remove-btn">...</button>`;
    divLeftEnd.classList.add("right");
    listItemDiv.append(divHeading, divLeftEnd);
    //  listItemDiv.classList.add('display-hide');
    listItemContainer.appendChild(listItemDiv);
    createListItemsBody(data[i].items, listItemDiv);
  }
};

const createListItemsBody = (data, listItemDiv) => {
  for (let i = 0; i < data.length; i++) {
    const listitem = document.createElement("div");
    listitem.classList.add("to-do-list-item");
    const radioElementLeftPart = document.createElement("div");
    radioElementLeftPart.classList.add("left");
    const radioElement = document.createElement("input");
    radioElement.type = "checkbox";
    radioElement.name = "task";
    const radioLabel = document.createElement("label");
    radioLabel.innerText = data[i].noteText;
    radioElementLeftPart.append(radioElement, radioLabel);
    const radioElementRightPart = document.createElement("div");
    radioElementRightPart.classList.add("right");
    radioElementRightPart.innerHTML = `  <i class="fa-regular fa-clock"></i> ${data[i].noteTime} <button class="edit-remove-all-btn">...</button>`;
    listitem.append(radioElementLeftPart, radioElementRightPart);
    listitem.classList.add("display-hide");
    listItemDiv.appendChild(listitem);
  }
};
const removeHeader = () => {
  while (listItemContainer.firstChild) {
    listItemContainer.removeChild(listItemContainer.firstChild);
  }
};

// not able yo toggle

function getNextSiblings(elem, filter) {
  var sibs = [];
  while ((elem = elem.nextSibling)) {
    if (elem.nodeType === 3) continue; // text node
    if (!filter || filter(elem)) sibs.push(elem);
  }
  return sibs;
}

// new one 
const editRemoveHeadingFunction = () => {
  const editRemoveBtn = document.querySelectorAll(".edit-remove-btn");
  let openDropdown = null;

  editRemoveBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.stopPropagation();

      // Close any open dropdown
      if (openDropdown && openDropdown !== elem) {
        openDropdown.querySelector(".edit-remove-dropdown").remove();
        openDropdown = null;
      }

      if (!elem.querySelector(".edit-remove-dropdown")) {
        const editAndRemoveDropdown = document.createElement("div");
        editAndRemoveDropdown.classList.add("edit-remove-dropdown");

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        
        editAndRemoveDropdown.append(editBtn, removeBtn);
        elem.append(editAndRemoveDropdown);

        let itemsArray = localStorage.getItem("items")
          ? JSON.parse(localStorage.getItem("items"))
          : [];

        editBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          const noteGetUpdate = elem.parentElement.previousSibling;
          let updateDate = prompt("Write new date DD/MM/YYYY", "");

          if (updateDate) {
            let [newUpdateDate, newUpdateMonth, newUpdateYear] = updateDate.split("/");

            // Convert to a Date object to check validity
            let dateObject = new Date(`${newUpdateYear}-${newUpdateMonth}-${newUpdateDate}`);

            if (
              dateObject.getDate() != newUpdateDate ||
              dateObject.getMonth() != (newUpdateMonth - 1) ||
              dateObject.getFullYear() != newUpdateYear
            ) {
              alert("Invalid date. Please enter a valid date.");
              return;
            }

            newUpdateMonth = String(dateObject.getMonth()); // Adjust month for further processing

            let [previousDate, previousMonth, previousYear] = [
              noteGetUpdate.innerText.split(" ")[1],
              String(months.indexOf(noteGetUpdate.innerText.split(" ")[2])),
              noteGetUpdate.innerText.split(" ")[3],
            ];

            itemsArray = itemsArray.map(item => {
              if (
                item.noteYear === previousYear &&
                item.noteMonth === previousMonth &&
                item.noteDay === previousDate
              ) {
                return {
                  ...item,
                  noteDay: newUpdateDate,
                  noteMonth: newUpdateMonth,
                  noteYear: newUpdateYear,
                };
              }
              return item;
            });

            localStorage.setItem("items", JSON.stringify(itemsArray));
            alert("Updated");
            initialNoteList();
          }
        });

        removeBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          const noteGetUpdate = elem.parentElement.previousSibling;

          let [previousDate, previousMonth, previousYear] = [
            noteGetUpdate.innerText.split(" ")[1],
            String(months.indexOf(noteGetUpdate.innerText.split(" ")[2])),
            noteGetUpdate.innerText.split(" ")[3],
          ];

          itemsArray = itemsArray.filter(
            item =>
              !(
                item.noteYear === previousYear &&
                item.noteMonth === previousMonth &&
                item.noteDay === previousDate
              )
          );

          localStorage.setItem("items", JSON.stringify(itemsArray));
          alert("Item removed");
          initialNoteList();
        });

        openDropdown = elem;
      } else {
        elem.querySelector(".edit-remove-dropdown").remove();
        openDropdown = null;
      }
    });
  });
};



const changingCaret = () => {
  const caretBtn = document.querySelectorAll(".to-do-list-item>.left>i");
  caretBtn.forEach((elem) => {
   // console.log(caretBtn);
    elem.addEventListener("click", () => {
      if (elem.classList.contains("fa-caret-up")) {
        elem.classList.remove("fa-caret-up");
        elem.classList.add("fa-caret-down");
        // console.log(elem.parentElement);

        const allSibling = getNextSiblings(elem.parentElement);
        allSibling.forEach((element) => {
          if (element.classList.contains("display-hide")) {
            element.classList.remove("display-hide");
            element.classList.add("display-show");
          }
        });
      } else if (elem.classList.contains("fa-caret-down")) {
        elem.classList.remove("fa-caret-down");
        elem.classList.add("fa-caret-up");
        const allSibling = getNextSiblings(elem.parentElement);
        allSibling.forEach((element) => {
          if (element.classList.contains("display-show")) {
            element.classList.remove("display-show");
            element.classList.add("display-hide");
          }
        });
      } else {
        console.log("Element does not have caret classes initially");
      }
    });
  });
};


const editRemoveBodyFunction = () => {
  const editRemoveBody = document.querySelectorAll('.edit-remove-all-btn');
  let activeDropdown = null; // Track the currently active dropdown

  // Helper function to hide a dropdown
  const hideDropdown = (elem) => {
    const dropdown = elem.querySelector('.edit-remove-all-dropdown');
    if (dropdown) {
      elem.removeChild(dropdown);
    }
  };

  editRemoveBody.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();

      // Hide the currently active dropdown if it is different from the clicked one
      if (activeDropdown && activeDropdown !== elem) {
        hideDropdown(activeDropdown);
      }

      const existingDropdown = elem.querySelector('.edit-remove-all-dropdown');
      if (existingDropdown) {
        // If the dropdown already exists, remove it
        hideDropdown(elem);
        activeDropdown = null; // No active dropdown
      } else {
        // Create new dropdown
        const editAndRemoveDropdown = document.createElement("div");
        editAndRemoveDropdown.classList.add("edit-remove-all-dropdown");

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";

        editAndRemoveDropdown.append(editBtn, removeBtn);
        elem.append(editAndRemoveDropdown);

        // Set the clicked element as the active dropdown
        activeDropdown = elem;

        let itemsArray = localStorage.getItem("items")
          ? JSON.parse(localStorage.getItem("items"))
          : [];

        editBtn.addEventListener("click", (event) => {
          event.stopPropagation();

          const noteGetUpdate = elem.parentElement.previousSibling;
          const header = noteGetUpdate.parentElement.parentElement.firstChild.innerText;

          let updateText = prompt("Write new text", noteGetUpdate.textContent);
          let updateTime = prompt("Write new time in HH:MM  AM/PM format", elem.previousSibling.textContent);

          if (updateText != null && updateTime != null) {
            // Validate time format HH:MM  AM/PM with two spaces before AM/PM
            const timePattern = /^(0[1-9]|1[0-2]):([0-5][0-9])\s{2}(AM|PM)$/i;
            if (!timePattern.test(updateTime.trim())) {
              alert("Invalid time format. Please use HH:MM  AM/PM format.");
              return;
            }

            let [previousDate, previousMonth, previousYear] = [
              header.split(" ")[1],
              String(months.indexOf(header.split(" ")[2])),
              header.split(" ")[3],
            ];
            const elementPresent=itemsArray.filter((item)=>{
               
                item.noteText === updateText &&
                item.noteYear === previousYear &&
                item.noteMonth === previousMonth &&
                item.noteDay === previousDate &&
                item.noteTime === updateTime
                
            });
            if(elementPresent){
              alert(`it's all ready there in note .`);
            }else{
            itemsArray = itemsArray.map(item => {
              if (
                item.noteText === noteGetUpdate.textContent &&
                item.noteYear === previousYear &&
                item.noteMonth === previousMonth &&
                item.noteDay === previousDate &&
                item.noteTime === elem.previousSibling.textContent.trim()
                
              ) {
                return {
                  ...item,
                  noteText: updateText,
                  noteTime: updateTime.trim(),
                };
              }
              return item;
            });

            localStorage.setItem("items", JSON.stringify(itemsArray));
            alert("Updated");
            initialNoteList();
          }
          }
        });


        removeBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          const noteGetUpdate = elem.parentElement.previousSibling;
          const header = noteGetUpdate.parentElement.parentElement.firstChild.innerText;

          let [previousDate, previousMonth, previousYear] = [
            header.split(" ")[1],
            String(months.indexOf(header.split(" ")[2])),
            header.split(" ")[3],
          ];

          itemsArray = itemsArray.filter(
            item =>
              !(
                item.noteText === noteGetUpdate.textContent &&
                item.noteYear === previousYear &&
                item.noteMonth === previousMonth &&
                item.noteDay === previousDate &&
                item.noteTime === elem.previousSibling.textContent.trim()
              )
          );

          localStorage.setItem("items", JSON.stringify(itemsArray));
          alert("Item removed");
          initialNoteList();
        });
      }
    });
  });
};




// initial data creation

const initialNoteList = () => {
  let itemsArray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  itemsArray.sort(sortFunction);

  // groupData
  const groupedData = [];
  itemsArray.forEach((item) => {
    const existingGroup = groupedData.find(
      (group) =>
        group.noteYear === item.noteYear &&
        group.noteMonth === item.noteMonth &&
        group.noteDay === item.noteDay
    );
    //console.log(existingGroup);
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      if (
        item.noteYear >= currentDate.getFullYear() &&
        item.noteMonth >= currentDate.getMonth() &&
        item.noteDay >= currentDate.getDate()
      ) {
        groupedData.push({
          noteYear: item.noteYear,
          noteMonth: item.noteMonth,
          noteDay: item.noteDay,
          items: [item],
        });
      }
    }
  });
  removeHeader();
  createListItemsHeader(groupedData);
  changingCaret();
 editRemoveHeadingFunction ();
 editRemoveBodyFunction();
};

initialNoteList();


//changingCaret();
const addButton = document.querySelector(".add-task-btn");
const taskInput = document.querySelector(".add-task-bar>input");
addButton.addEventListener("click", (event) => {
  event.stopPropagation();

  if (
    taskInput.value === "Add your to-do-task" ||
    taskInput.value === "" ||
    labelTimeInput.textContent === "SetTime"
  ) {
    alert("Please fill the required fields");
    return;
  }
  let taskText = taskInput.value;
  // console.log(taskText);
  let taskYear, taskMonth, taskTime, taskDay;
  if (calendarDateText.innerHTML === "Today") {
    let currentDate = new Date();
    taskYear = String(currentDate.getFullYear());
    taskMonth = String(currentDate.getMonth());
    taskTime = labelTimeInput.textContent;
    taskDay = String(currentDate.getDate());
  } else {
    taskYear = calendarDateText.innerHTML.split("/")[2];
    taskMonth = calendarDateText.innerHTML.split("/")[1];
    taskTime = labelTimeInput.textContent;
    taskDay = calendarDateText.innerHTML.split("/")[0];
  }
  // we have to check in which date and i have get any task on that day before -->let see...
  //console.log(typeof taskTime);
  let itemsArray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

  if (itemsArray.length === 0) {
    itemsArray.push({
      noteText: taskText,
      noteYear: taskYear,
      noteMonth: taskMonth,
      noteTime: taskTime,
      noteDay: taskDay,
    });
  } else {
    const elementPresent = itemsArray.some(
      (e) =>
        e.noteText === taskText &&
        e.noteMonth === taskMonth &&
        e.noteYear === taskYear &&
        e.noteTime === taskTime &&
        e.noteDay === taskDay
    );

    // If the task exists, alert the user
    if (elementPresent) {
      alert(`hey it's there in notes`);
    } else {
      // Add new task to the array and update localStorage
      itemsArray.push({
        noteText: taskText,
        noteYear: taskYear,
        noteMonth: taskMonth,
        noteTime: taskTime,
        noteDay: taskDay,
      });
      // itemsArray.sort(sortFunction);
      //  localStorage.setItem("items", JSON.stringify(itemsArray));
    }
  }
  localStorage.setItem("items", JSON.stringify(itemsArray));
  itemsArray.sort(sortFunction);

  // groupData
  const groupedData = [];
  itemsArray.forEach((item) => {
    const existingGroup = groupedData.find(
      (group) =>
        group.noteYear === item.noteYear &&
        group.noteMonth === item.noteMonth &&
        group.noteDay === item.noteDay
    );
    // console.log(existingGroup);
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      if (
        item.noteYear >= currentDate.getFullYear() &&
        item.noteMonth >= currentDate.getMonth() &&
        item.noteDay >= currentDate.getDate()
      ) {
        groupedData.push({
          noteYear: item.noteYear,
          noteMonth: item.noteMonth,
          noteDay: item.noteDay,
          items: [item],
        });
      }
    }
  });
  removeHeader();
  createListItemsHeader(groupedData);
  alert('updated');
  changingCaret();
  editRemoveHeadingFunction();
 editRemoveBodyFunction();
 
  // local stoarge will store the duplicate data so we have to work on that also
});

