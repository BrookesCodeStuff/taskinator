let taskBtn = document.querySelector('#save-task');
let tasksToDoEl = document.querySelector('#tasks-to-do');

let handleCreateTask = function () {
  let taskItemEl = document.createElement('li');
  taskItemEl.className = 'task-item';
  taskItemEl.textContent = 'This is a new task';
  tasksToDoEl.appendChild(taskItemEl);
};

taskBtn.addEventListener('click', handleCreateTask);
