// Variables
let taskIdCounter = 0;
let tasks = [];
let formEl = document.querySelector('#task-form');
let pageContentEl = document.querySelector('#page-content');
let tasksToDoEl = document.querySelector('#tasks-to-do');
let tasksInProgressEl = document.querySelector('#tasks-in-progress');
let tasksCompletedEl = document.querySelector('#tasks-completed');

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

  let isEdit = formEl.hasAttribute('data-task-id');
  // Has data attribute, so remove task id and call function to complete edit
  if (isEdit) {
    let taskId = formEl.getAttribute('data-task-id');
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    // Has no data attribute, so create object and pass to createTaskEl function
    let taskDataObject = {
      name: taskNameInput,
      type: taskTypeInput,
      status: 'to do',
    };

    createTaskEl(taskDataObject);
  }
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

  // Add task id to the taskDataObj then add current task info to the tasks array
  taskDataObject.id = taskIdCounter;
  tasks.push(taskDataObject);

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
    ".task-item[data-task-id='" + taskId + "']"
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

let completeEditTask = function (taskName, taskType, taskId) {
  // Find the matching task list item
  let taskSelected = document.querySelector(
    '.task-item[data-task-id="' + taskId + '"]'
  );

  // Set new valuies
  taskSelected.querySelector('h3.task-name').textContent = taskName;
  taskSelected.querySelector('span.task-type').textContent = taskType;

  // Loop through tasks array and task object with new content
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  // Reset the form
  formEl.removeAttribute('data-task-id');
  document.querySelector('#save-task').textContent = 'Add Task';
};

let deleteTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  let updatedTaskArr = [];

  // Loop through the current tasks
  for (let i = 0; i < tasks.length; i++) {
    // If tasks[i].id doesnt match the value of taskId, let's keep that
    // task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // Reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
};

let taskStatusChangeHandler = function (event) {
  // Get the task item's ID
  let taskId = event.target.getAttribute('data-task-id');

  // Get the currently selected option's value and convert it to lowercase
  let statusValue = event.target.value.toLowerCase();

  // Find the parent task item element based on the id
  let taskSelected = document.querySelector(
    '.task-item[data-task-id="' + taskId + '"]'
  );

  if (statusValue === 'to do') {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === 'in progress') {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === 'completed') {
    tasksCompletedEl.appendChild(taskSelected);
  }
};

// Event Listeners
// When 'Add Task' button is clicked, run create task function
formEl.addEventListener('submit', taskFormHandler);
pageContentEl.addEventListener('click', taskButtonHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);
