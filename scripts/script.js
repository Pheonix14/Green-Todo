// Function to load tasks from local storage
function loadTasks() {
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        document.getElementById("taskList").innerHTML = savedTasks;
    }
}

// Function to save tasks to local storage
function saveTasks() {
    var taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", taskList);
}

// Load tasks when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        var li = document.createElement("li");
        li.innerHTML = '<span>' + taskInput.value + '</span>' +
                       '<button class="complete-btn" onclick="completeTask(this)">Complete</button>' +
                       '<button class="delete-btn" onclick="removeTask(this)">Delete</button>';
        taskList.appendChild(li);
        taskInput.value = "";
        saveTasks(); // Save tasks to local storage
    } else {
        alert("Please enter a task!");
    }
}

function completeTask(btn) {
    var li = btn.parentNode;
    var span = li.querySelector("span");
    var completedTaskList = document.getElementById("completedTaskList");

    span.style.textDecoration = "line-through";
    btn.style.display = "none";

    // Move task to completed task list
    completedTaskList.appendChild(li);
    saveTasks(); // Save tasks to local storage
}

function removeTask(btn) {
    var li = btn.parentNode;
    var ul = li.parentNode;
    ul.removeChild(li);
    saveTasks(); // Save tasks to local storage
}