// let tasks = [];

// const addTaskBtn = document.getElementById("add-task-btn");
// addTaskBtn.addEventListener("click", () => addTask())

// //Render tasks
// function renderTask(taskNum) {
//     const taskRow = document.getElementById("div");

//     //Create text input
//     const text = document.createElement('input');
//     text.type = "text";
//     text.placeholder = 'Enter a task';

//     //Set and track input values pf tasks in the array
//     text.value = tasks[taskNum];
//     text.addEventListener("change", () => {
//         tasks[taskNum] = text.value;
//     })

//     //Create delete button
//     const deleteBtn = document.createElement('input');
//     deleteBtn.type = "button";
//     deleteBtn.value = "X";

//     //Delete task
//     deleteBtn.addEventListener("click", () => {
//         deleteTask(taskNum);
//     });

//     //Append taskRow to taskContainer
//     const taskContainer = document.getElementById("task-container");
//     taskContainer.appendChild(taskRow);
// }

// function addTask() {
//     const taskRow = document.createElement("div");

//     //Create text input
//     const text = document.createElement("input");
//     text.type = "text";
//     text.placeholder = "Enter a task";

//     //Create delete button
//     const deleteBtn = document.createElement('input');
//     deleteBtn.type = "button";
//     deleteBtn.value = "X";

//     //Append input elements to taskRow
//     taskRow.appendChild(text);
//     taskRow.appendChild(deleteBtn);

//     //Append taskRow to taskContainer
//     const taskContainer = document.getElementById("task-container");
//     taskContainer.appendChild(taskRow);
// }

document.addEventListener("DOMContentLoaded", () => {
    //Set the initial timer values
let workMinutes = 25;
let breakMinutes = 5;
let seconds = 0;
let isWorkTimer = true;
let isTimerRunning = false;
let timerInterval;

//Get the necessary DOM elements
const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

//Function to start the timer
function startTimer() {
    isTimerRunning = true;
    timerInterval = setInterval(() => {
        //Update the timer display
        const minutesDisplay = isWorkTimer ? workMinutes : breakMinutes;
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        timerDisplay.textContent = `${minutesDisplay}:${secondsDisplay}`;

        //Countdown logic
        if (seconds === 0) {
            if (workMinutes === 0 && isWorkTimer) {
                //Work timer is up
                clearInterval(timerInterval);
                showNotification("Work timer is up!");
                isWorkTimer = false;
                workMinutes = 25;
                seconds = 0;
                startButton.textContent = "Start Break";
                isTimerRunning = false;
            } else if (breakMinutes === 0 && !isWorkTimer) {
                //Break timer is up
                clearInterval(timerInterval);
                showNotification("Break timer is up!");
                isWorkTimer = true;
                breakMinutes = 5;
                seconds = 0;
                startButton.textContent = "Start Work";
                isTimerRunning = false;
            } else {
                //Decrease the minutes and reset the seconds
                if (isWorkTimer) {
                    workMinutes--;
                } else {
                    breakMinutes--;
                }
                seconds = 59;
            }
        } else {
            //Decrease the seconds
            seconds--;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

//Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    isWorkTimer = true;
    workMinutes = 25;
    breakMinutes = 5;
    startButton.textContent = "Start Work";
    timerDisplay.textContent = "25:00";
}

//Function to show a notification
function showNotification(message) {
    chrome.notifications.create({
        type: "basic",
        title: "Timer",
        message: message,
    });
}

//Event listener for the start button
startButton.addEventListener("click", () => {
    startTimer();
})

// Event listener for the reset button
resetButton.addEventListener("click", () => {
    resetTimer();
})

//Set the initial timer display
timerDisplay.textContent = "25:00";
});
