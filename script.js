const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const clearBtn = document.getElementById("clearBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);

// Clear completed tasks
clearBtn.addEventListener("click", function() {
    const completedTasks = document.querySelectorAll(".task.completed");
    completedTasks.forEach(task => task.remove());
    saveTasks();
    updateTaskCount();
});

// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// Add Task Function
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task");

    li.innerHTML = `
        <span>${taskText}</span>

        <div class="buttons">
            <button class="complete-btn">✓</button>
            <button class="delete-btn">🗑</button>
        </div>
    `;


    taskList.appendChild(li);

    saveTasks();
    updateTaskCount();

    taskInput.value = "";


    // Complete task
    li.querySelector(".complete-btn").addEventListener("click", function() {
        li.classList.toggle("completed");
        saveTasks();
        updateTaskCount();
    });


    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", function() {

    li.style.animation = "fadeOut 0.3s ease";

    setTimeout(() => {
        li.remove();
        saveTasks();
        updateTaskCount();
    }, 300);

});
}



// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}



// Update task counter
function updateTaskCount() {
    const remainingTasks = document.querySelectorAll(".task:not(.completed)").length;

    if (remainingTasks === 1) {
        taskCount.textContent = "1 task remaining";
    } else {
        taskCount.textContent = `${remainingTasks} tasks remaining`;
    }
}



// Filter tasks
function filterTasks(type) {

    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {

        if (type === "all") {
            task.style.display = "flex";
        }

        else if (type === "active") {

            if (task.classList.contains("completed")) {
                task.style.display = "none";
            } else {
                task.style.display = "flex";
            }

        }

        else if (type === "completed") {

            if (task.classList.contains("completed")) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }

        }

    });
}
function clearCompletedTasks() {

    const completedTasks = document.querySelectorAll(".completed");

    completedTasks.forEach(task => {
        task.remove();
    });

    saveTasks();
    updateTaskCount();
}
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
}


darkModeBtn.addEventListener("click", toggleDarkMode);

// Filter buttons
allBtn.addEventListener("click", function() {
    filterTasks("all");
});


activeBtn.addEventListener("click", function() {
    filterTasks("active");
});


completedBtn.addEventListener("click", function() {
    filterTasks("completed");
});

clearBtn.addEventListener("click", function() {
    clearCompletedTasks();
});

// Load saved tasks when page opens
window.onload = function() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        taskList.innerHTML = savedTasks;


        document.querySelectorAll(".task").forEach(li => {


            li.querySelector(".complete-btn").addEventListener("click", function() {
                li.classList.toggle("completed");
                saveTasks();
                updateTaskCount();
            });


            li.querySelector(".delete-btn").addEventListener("click", function() {
                li.remove();
                saveTasks();
                updateTaskCount();
            });


        });

    }


    updateTaskCount();

};