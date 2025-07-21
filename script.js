document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];

  for (let i = 0; i < expenseList.length; i++) {
    display(expenseList[i]);
  }

  const form = document.querySelector("#expenseForm");
  form.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  const expense = {
    amount,
    description,
    category,
  };

  const expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];
  const editId = sessionStorage.getItem("editId");

  if (editId) {
    expense.id = Number(editId);
    update(expenseList, editId, expense);
    sessionStorage.removeItem("editId");
  } else {
    addData(expenseList, expense);
  }

  localStorage.setItem("expenseList", JSON.stringify(expenseList));
  event.target.reset();
  const submitBtn = document.querySelector("button[type=submit]");
  submitBtn.textContent = "Add Expense";
}

function display(data) {
  const ul = document.querySelector("#expenseList");
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.id = data.id;

  li.innerHTML = `
    <span>${data.amount} - ${data.category} - ${data.description}</span>
    <div>
      <button class="btn btn-sm btn-danger me-2">Delete</button>
      <button class="btn btn-sm btn-secondary">Edit</button>
    </div>
  `;
  const deleteBtn = li.querySelector(".btn-danger");
  deleteBtn.addEventListener("click", () => deleteData(data.id, li));

  const editBtn = li.querySelector(".btn-secondary");
  editBtn.addEventListener("click", () => editData(data));

  ul.appendChild(li);
}

function addData(expenseList, expense) {
  expense.id = Date.now();
  expenseList.push(expense);
  display(expense);
}

function deleteData(id, li) {
  const expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];
  const updatedList = expenseList.filter((item) => item.id != id);

  localStorage.setItem("expenseList", JSON.stringify(updatedList));
  li.remove();
}

function editData(data) {
  document.getElementById("amount").value = data.amount;
  document.getElementById("description").value = data.description;
  document.getElementById("category").value = data.category;

  sessionStorage.setItem("editId", data.id);

  const submitBtn = document.querySelector("button[type=submit]");
  submitBtn.textContent = "Update Expense";
}

function update(expenseList, editId, updatedData) {
  for (let i = 0; i < expenseList.length; i++) {
    if (expenseList[i].id == editId) {
      expenseList[i] = updatedData;
    }
  }

  const li = document.getElementById(editId);
  li.querySelector(
    "span"
  ).textContent = `${updatedData.amount} - ${updatedData.category} - ${updatedData.description}`;
}
