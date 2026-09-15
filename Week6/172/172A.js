// ------------------------------------------------------------------------
//                               Model
// ------------------------------------------------------------------------

// List of objects with tasks
const tasksList = [
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
];

// Input model variables
let newTaskText = "";
let newTaskResponsible = "";

// How to ISO string dates
const now = new Date().toISOString();
// Output: "2026-09-15T10:43:43.123Z"
const dateOnly = new Date().toISOString().slice(0, 10);
// Output: "2026-09-15"

// ------------------------------------------------------------------------
//                                VIEW
// ------------------------------------------------------------------------
const app = document.getElementById("app");

function updateView() {
  app.innerHTML = /*HTML*/ `
    <table>
        <tr>
            <th>Task</th>
            <th>Responsible</th>
            <th>Completion Date</th>
            <th>Done</th>
            <th>Delete Task</th>
        </tr>
            ${createTable()}
            ${createInputRow()}
    </table>
    `;
}

// ------------------------------------------------------------------------
//                              CONTROLLER
// ------------------------------------------------------------------------

function createTable() {
  let html = "";

  for (let i = 0; i < tasksList.length; i++) {
    const task = tasksList[i];
    const isDone = task.doneDate !== null;
    const dateText = isDone ? task.doneDate : "-";
    const checkedAttr = isDone ? 'checked="checked"' : "";

    html += `
        <tr>
            <th>${task.text}</th>
            <th>${task.responsible}</th>
            <th>${dateText}</th>
            <th><input type="checkbox" ${checkedAttr} onclick="setDone(${i})"></th>
            <th><button onclick="deleteTask(${i})">Delete Task</button></th>
        </tr>

        `;
  }
  return html;
}

function createInputRow() {
  return /*HTML*/ `
    <tr>
        <th>
            <input 
                type="text" 
                placeholder="Task Description..." 
                oninput="newTaskText = this.value"
                value="${newTaskText}"
            />
        </th>
        <th>
            <input 
                type="text" 
                placeholder="Person Responsible..." 
                oninput="newTaskResponsible = this.value"
                value="${newTaskResponsible}"
            />
        </th>
        <th>-</th>
        <th><input type="checkbox" disabled /></th>
        <th><button onclick="addTask()">Add Task</button></th>
    </tr>
  `;
}

// Init page
updateView();

function setDone(index) {
  const task = tasksList[index];
  let completionDate = new Date().toISOString().slice(0, 10);

  //If not equal to type of null, set it to null (ie "reset" and remove done date)
  if (task.doneDate !== null) {
    task.doneDate = null;
  } else {
    task.doneDate = new Date().toISOString().slice(0, 10);
  }

  console.log(completionDate);

  updateView();
}

function deleteTask(index) {
  tasksList.splice(index, 1);
  updateView();
}

function addTask() {
  if (newTaskText.trim() === "") return;

  tasksList.push({
    text: newTaskText,
    doneDate: null,
    responsible: newTaskResponsible || "Unassigned",
  });

  //Reset Variables
  newTaskText = "";
  newTaskResponsible = "";

  updateView();
}
