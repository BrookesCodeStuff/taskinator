// Variables
let formEl = document.querySelector('#task-form');
let tasksToDoEl = document.querySelector('#tasks-to-do');

// Functions
// Add a task to the list
let taskFormHandler = function (event) {
  // Stop the form from submitting and refreshing the page
  event.preventDefault();

  // Get the text that was entered in the input and the option from the dropdown
  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  // Validate input
  if (!taskNameInput || !taskTypeInput) {
    alert('You need to fill out the task form.');
    return false;
  }

  formEl.reset();

  // Package data as an object
  let taskDataObject = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  // Send it to createTaskEl
  createTaskEl(taskDataObject);
};

let createTaskEl = function (taskDataObject) {
  // Create the list item
  let listItemEl = document.createElement('li');
  listItemEl.className = 'task-item';

  // Create div to hold task info and add it to list item
  let taskInfoEl = document.createElement('div');
  taskInfoEl.className = 'task-info';

  // Add HTML content to div
  taskInfoEl.innerHTML = `
  <h3 class='task-name'>${taskDataObject.name}</h3>
  <span class='task-type'>${taskDataObject.type}</span>`;

  listItemEl.appendChild(taskInfoEl);

  // Add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
};

// Event Listeners
// When 'Add Task' button is clicked, run create task function
formEl.addEventListener('submit', taskFormHandler);
