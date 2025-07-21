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
  addData(expenseList, expense);
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
