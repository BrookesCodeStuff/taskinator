// Variables
let formEl = document.querySelector('#task-form');
let tasksToDoEl = document.querySelector('#tasks-to-do');

// Functions
// Add a task to the list
let handleCreateTask = function (event) {
  // Stop the form from submitting and refreshing the page
  event.preventDefault();

  // Add list item with text and append it to task list ul
  let taskItemEl = document.createElement('li');
  taskItemEl.className = 'task-item';
  taskItemEl.textContent = 'This is a new task';
  tasksToDoEl.appendChild(taskItemEl);
};

// Event Listeners
// When 'Add Task' button is clicked, run create task function
formEl.addEventListener('submit', handleCreateTask);
