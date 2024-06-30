let tasks = [];
let completedTasks = 0;

const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasksElement = document.getElementById('completedTasks');

addTaskButton.addEventListener('click', function() {
    const newTask = newTaskInput.value;
    if (newTask) {
        const taskId = Math.floor(Math.random() * 101); 
        tasks.push({ id: taskId, description: newTask, completed: false });
        newTaskInput.value = '';
        updateTaskList();
    }
});

function updateTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
            <span onclick="showPopup('${task.id}')" style="display: flex; justify-content: center;"><strong>Id:${task.id}</strong> ${task.description}</span>
            <span class="delete" onclick="deleteTask(${index})">❌</span>
        `;
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskList.appendChild(taskElement);
    });
    totalTasks.textContent = tasks.length;
    completedTasksElement.textContent = completedTasks;
}

function deleteTask(index) {
    if (tasks[index].completed) {
        completedTasks--;
    }
    tasks.splice(index, 1);
    updateTaskList();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        completedTasks++;
    } else {
        completedTasks--;
    }
    updateTaskList();
}
