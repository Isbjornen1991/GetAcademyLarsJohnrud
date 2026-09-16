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
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Lars",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Kenneth",
  },
  {
    text: "Complete 172 tasks",
    doneDate: null,
    responsible: "Kenneth",
  },
];

// Input model variables
let newTaskText = "";
let newTaskResponsible = "";
let editIndex = null;

// Filter & Pagination variables
let currentPage = 0;
const pageSize = 9;
let taskAmount = 1;

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
  const listToDisplay = tasksList;

  totalPages = Math.ceil(listToDisplay.length / pageSize);
  let startIndex = currentPage * pageSize;
  let endIndex = startIndex + pageSize;

  let currentItems = listToDisplay.slice(startIndex, endIndex);

  app.innerHTML = /*HTML*/ `
      <table>
        <tr>
            <th>Task</th>
            <th>Responsible</th>
            <th>Completion Date</th>
            <th>Done</th>
            <th>Delete Task</th>
        </tr>
            ${createTable(currentItems, startIndex)}
            ${createInputRow()}
      </table>

          <div class="buttonHolder">
            <div class="buttons">
                <button class="buttons" onclick="prevPage()">Previous Page</button>
                <button class="buttons" onclick="nextPage()">Next Page</button>
            </div>
          </div>
          <div class="buttonHolder">
              <div class="buttons">${createPageButtons(totalPages)}</div>
          </div>
    `;
}

// ------------------------------------------------------------------------
//                           VIEW HELPERS
// ------------------------------------------------------------------------

function createTable(inputArray, startIndex) {
  let html = "";

  for (let i = 0; i < inputArray.length; i++) {
    const task = inputArray[i];
    const actualIndex = startIndex + i;
    const isDone = task.doneDate !== null;
    const dateText = isDone ? task.doneDate : "-";
    const checkedAttr = isDone ? 'checked="checked"' : "";

    if (editIndex === actualIndex) {
      // Edit Display Mode
      html += `
            <tr>
                <th><input type="text" value="${task.text}" oninput="tasksList[${actualIndex}].text = this.value" /></th>
                <th><input type="text" value="${task.responsible}" oninput="tasksList[${actualIndex}].responsible = this.value" /></th>
                <th>${dateText}</th>
                <th><input type="checkbox" ${checkedAttr} onclick="setDone(${i})"></th>
                <th><button onclick="saveTask()">Save</button></th>
            </tr>
        `;
    } else {
      // Normal display Mode
      html += `
            <tr>
                <th onclick="startEdit(${actualIndex})">${task.text}</th>
                <th onclick="startEdit(${actualIndex})">${task.responsible}</th>
                <th>${dateText}</th>
                <th><input type="checkbox" ${checkedAttr} onclick="setDone(${i})"></th>
                <th>
                <button onclick="deleteTask(${actualIndex})">Delete</button>
                </th>
            </tr>
        `;
    }
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

// ------------------------------------------------------------------------
//                              CONTROLLER
// ------------------------------------------------------------------------

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
  decreaseTaskAmount();

  const maxPage = Math.ceil(tasksList.length / pageSize) - 1;
  if (currentPage > maxPage && currentPage > 0) {
    currentPage = maxPage;
  }

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

  increaseTaskAmount();
  updateView();
}

function startEdit(index) {
  editIndex = index;
  updateView();
}

function saveTask() {
  editIndex = null;
  updateView();
}

function increaseTaskAmount() {
  taskAmount++;
}

function decreaseTaskAmount() {
  taskAmount--;
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateView();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updateView();
  }
}

function createPageButtons(pageCount) {
  let buttonsHtml = "";

  for (let i = 0; i < pageCount; i++) {
    buttonsHtml += `<button onclick="changePage(${i})">${i + 1}</button>`;
  }
  return buttonsHtml;
}

function changePage(pageNumber) {
  currentPage = pageNumber;
  updateView();
}
// Se på oppgave 153AB for å se på pagination
