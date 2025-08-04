let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const errorMsg = document.getElementById("error-msg");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    if (task.completed) taskText.classList.add("completed");
    taskText.innerText = task.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleComplete(index);

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.innerHTML = `
      <span class="priority-${task.priority}">Priority: ${task.priority}</span> |
      <span>Due: ${task.dueDate || "N/A"}</span> |
      <span>Category: ${task.category}</span>
    `;

    const editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.onclick = () => deleteTask(index);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "task-buttons";
    buttonsDiv.append(editBtn, deleteBtn);

    const taskInfo = document.createElement("div");
    taskInfo.style.flex = "1";
    taskInfo.append(taskText, meta);

    li.append(checkbox, taskInfo, buttonsDiv);
    taskList.appendChild(li);
  });
}
 

function addTask() {
  const text = taskInput.value.trim();
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;
  const category = document.getElementById("category").value;

  if (text === "") {
    errorMsg.innerText = "Task cannot be empty!";
    return;
  }

  errorMsg.innerText = "";

  tasks.push({
    text,
    completed: false,
    priority,
    dueDate,
    category,
  });

  taskInput.value = "";
  document.getElementById("dueDate").value = "";
  saveTasks();
  renderTasks();
}


function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  const newText = prompt("Edit task:", task.text);
  if (newText === null || newText.trim() === "") return;

  const newPriority = prompt("Edit priority (High, Medium, Low):", task.priority) || task.priority;
  const newDueDate = prompt("Edit due date (YYYY-MM-DD):", task.dueDate) || task.dueDate;
  const newCategory = prompt("Edit category (e.g., Work, Personal):", task.category) || task.category;

  tasks[index] = {
    ...task,
    text: newText.trim(),
    priority: newPriority,
    dueDate: newDueDate,
    category: newCategory
  };

  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  const listItem = taskList.children[index];
  listItem.style.transition = "all 0.4s ease";
  listItem.style.opacity = "0";
  listItem.style.transform = "translateX(20px)";

  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }, 400);
}


renderTasks();
