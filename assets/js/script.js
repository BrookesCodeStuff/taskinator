// Variables
let taskIdCounter = 0;
let formEl = document.querySelector('#task-form');
let pageContentEl = document.querySelector('#page-content');
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

  // Add task ID as a custom attribute
  listItemEl.setAttribute('data-task-id', taskIdCounter);

  // Create div to hold task info and add it to list item
  let taskInfoEl = document.createElement('div');
  taskInfoEl.className = 'task-info';

  // Add HTML content to div
  taskInfoEl.innerHTML = `
  <h3 class='task-name'>${taskDataObject.name}</h3>
  <span class='task-type'>${taskDataObject.type}</span>`;

  listItemEl.appendChild(taskInfoEl);

  // Add edit, delete, and status elements to each task
  let taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // Add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // Increase task counter for next unique ID
  taskIdCounter++;
};

let createTaskActions = function (taskId) {
  let actionContainerEl = document.createElement('div');
  actionContainerEl.className = 'task-actions';

  // Create edit button
  let editButtonEl = document.createElement('button');
  editButtonEl.textContent = 'Edit';
  editButtonEl.className = 'btn edit-btn';
  editButtonEl.setAttribute('data-task-id', taskId);

  actionContainerEl.appendChild(editButtonEl);

  // Create delete button
  let deleteButtonEl = document.createElement('button');
  deleteButtonEl.textContent = 'Delete';
  deleteButtonEl.className = 'btn delete-btn';
  deleteButtonEl.setAttribute('data-task-id', taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // Create select element
  let statusSelectEl = document.createElement('select');
  statusSelectEl.className = 'select-status';
  statusSelectEl.setAttribute('name', 'status-change');
  statusSelectEl.setAttribute('data-task-id', taskId);

  let statusChoices = ['To Do', 'In Progress', 'Completed'];

  // Loop through the statusChoices to create dropdown options
  for (let i = 0; i < statusChoices.length; i++) {
    // create option element
    let statusOptionEl = document.createElement('option');
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute('value', statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
};

let taskButtonHandler = function (event) {
  // Get the event's target element
  let targetEl = event.target;

  // Edit button is clicked
  if (targetEl.matches('.edit-btn')) {
    let taskId = targetEl.getAttribute('data-task-id');
    editTask(taskId);
    // Delete button is clicked
  } else if (event.target.matches('.delete-btn')) {
    let taskId = event.target.getAttribute('data-task-id');
    deleteTask(taskId);
  }
};

let editTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id'" + taskId + "']"
  );

  // Get content from task name and type
  let taskName = taskSelected.querySelector('h3.task-name').textContent;
  let taskType = taskSelected.querySelector('span.task-type').textContent;

  // Update the content
  document.querySelector('input[name="task-name"]').value = taskName;
  document.querySelector('select[name="task-type"]').value = taskType;

  // Change the Edit Task button to Save Task
  document.querySelector('#save-task').textContent = 'Save Task';

  // Add the data element and taskId to the form element, so we save the correct task
  formEl.setAttribute('data-task-id', taskId);
};

let deleteTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
};

// Event Listeners
// When 'Add Task' button is clicked, run create task function
formEl.addEventListener('submit', taskFormHandler);
pageContentEl.addEventListener('click', taskButtonHandler);
