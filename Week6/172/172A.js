// ------------------------------------------------------------------------
//                               Model
// ------------------------------------------------------------------------

// List of objects with tasks
const tasksList = [
  {
    id: 1,
    text: "Fix page index offset bug in table logic",
    doneDate: "2026-09-14",
    responsible: "Lars",
  },
  {
    id: 2,
    text: "Apply Cyberpunk 2077 CSS theme and scanlines",
    doneDate: null,
    responsible: "Lars",
  },
  {
    id: 3,
    text: "Implement task sorting by responsible person",
    doneDate: null,
    responsible: "Lars",
  },
  {
    id: 4,
    text: "Write QUnit test suite for task array operations",
    doneDate: null,
    responsible: "Kenneth",
  },
  {
    id: 5,
    text: "Add data-text attributes to glitch buttons",
    doneDate: "2026-09-15",
    responsible: "Lars",
  },
  {
    id: 6,
    text: "Review HTML structure for buttonHolder divs",
    doneDate: null,
    responsible: "Kenneth",
  },
  {
    id: 7,
    text: "Build real-time search filter for task list",
    doneDate: null,
    responsible: "Lars",
  },
  {
    id: 8,
    text: "Optimize pagination button container wrap",
    doneDate: null,
    responsible: "Kenneth",
  },
  {
    id: 9,
    text: "Test actualIndex mapping on page 2 edit mode",
    doneDate: null,
    responsible: "Lars",
  },
  {
    id: 10,
    text: "Refactor inline event handlers for MVC pattern",
    doneDate: null,
    responsible: "Kenneth",
  },
  {
    id: 11,
    text: "Add active state styling for current page button",
    doneDate: null,
    responsible: "Lars",
  },
  {
    id: 12,
    text: "Clean up unclosed div elements in view template",
    doneDate: "2026-09-15",
    responsible: "Lars",
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
let currentSort = null;

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
  const listToDisplay = [...tasksList];

  if (currentSort === "responsible") {
    listToDisplay.sort((a, b) => a.responsible.localeCompare(b.responsible));
  }

  totalPages = Math.ceil(listToDisplay.length / pageSize);
  let startIndex = currentPage * pageSize;
  let endIndex = startIndex + pageSize;

  let currentItems = listToDisplay.slice(startIndex, endIndex);

  app.innerHTML = /*HTML*/ `
      <table>
        <tr>
            <th onclick="setSort('task')" style="cursor: pointer;">Task</th>
            <th onclick="setSort('responsible')" style="cursor: pointer;">Responsible ⇅</th>
            <th onclick="setSort('completionDate')" style="cursor: pointer;">Completion Date</th>
            <th onclick="setSort('done')" style="cursor: pointer;">Done</th>
            <th>Delete Task</th>
        </tr>
            ${createTable(currentItems, startIndex)}
            ${createInputRow()}
      </table>

          <div class="buttonHolder">
            <div class="buttons">
                <button data-text="Pre◄ious Page" onclick="prevPage()">Previous Page</button>
                <button data-text="N►xt Page" onclick="nextPage()">Next Page</button>
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

function createTable(inputArray) {
  let html = "";

  for (let i = 0; i < inputArray.length; i++) {
    const task = inputArray[i];
    const isDone = task.doneDate !== null;
    const dateText = isDone ? task.doneDate : "-";
    const checkedAttr = isDone ? 'checked="checked"' : "";

    if (editIndex === task.id) {
      html += `
        <tr>
          <th><input type="text" value="${task.text}" oninput="updateTaskText(${task.id}, this.value)" /></th>
          <th><input type="text" value="${task.responsible}" oninput="updateTaskResponsible(${task.id}, this.value)" /></th>
          <th>${dateText}</th>
          <th><input type="checkbox" ${checkedAttr} onclick="setDone(${task.id})"></th>
          <th><button onclick="saveTask()">Save</button></th>
        </tr>
      `;
    } else {
      html += `
        <tr>
          <th onclick="startEdit(${task.id})">${task.text}</th>
          <th onclick="startEdit(${task.id})">${task.responsible}</th>
          <th>${dateText}</th>
          <th><input type="checkbox" ${checkedAttr} onclick="setDone(${task.id})"></th>
          <th>
            <button data-text="D$elete T&sk" onclick="deleteTask(${task.id})">Delete</button>
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
        <th><button data-text="Add T/sk" onclick="addTask()">Add Task</button></th>
    </tr>
  `;
}

// Init page
updateView();

// ------------------------------------------------------------------------
//                              CONTROLLER
// ------------------------------------------------------------------------

function setDone(id) {
  const task = tasksList.find((t) => t.id === id);
  if (!task) return;

  if (task.doneDate !== null) {
    task.doneDate = null;
  } else {
    task.doneDate = new Date().toISOString().slice(0, 10);
  }

  updateView();
}

function deleteTask(id) {
  const index = tasksList.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasksList.splice(index, 1);
  }

  const maxPage = Math.ceil(tasksList.length / pageSize) - 1;
  if (currentPage > maxPage && currentPage > 0) {
    currentPage = maxPage;
  }

  updateView();
}

function addTask() {
  if (newTaskText.trim() === "") return;

  // Generate a unique ID (max ID + 1)
  const newId =
    tasksList.length > 0 ? Math.max(...tasksList.map((t) => t.id)) + 1 : 1;

  tasksList.push({
    id: newId,
    text: newTaskText,
    doneDate: null,
    responsible: newTaskResponsible || "Unassigned",
  });

  newTaskText = "";
  newTaskResponsible = "";
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
    buttonsHtml += `<button data-text="${i + 1}" onclick="changePage(${i})">${i + 1}</button>`;
  }
  return buttonsHtml;
}

function changePage(pageNumber) {
  currentPage = pageNumber;
  updateView();
}

// This one probably needs expanding on to create more modes, its kind of annoying right now
// Could add sorting by completion date, whether its completed,
// and add inverting order on 2nd click, then reset to default on 3rd click
function setSort(columnName) {
  if (currentSort === columnName) {
    currentSort = null;
  } else {
    currentSort = columnName;
  }
  currentPage = 0;
  updateView();
}

function updateTaskText(id, newText) {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].id === id) {
      tasksList[i].text = newText;
      break;
    }
  }
}

function updateTaskResponsible(id, newResponsible) {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].id === id) {
      tasksList[i].responsible = newResponsible;
      break;
    }
  }
}
