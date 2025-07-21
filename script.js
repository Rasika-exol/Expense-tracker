document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];

  for (let i = 0; i < expenseList.length; i++) {
    display(expenseList[i]);
  }

  sessionStorage.removeItem("editId");

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
  `;
  ul.appendChild(li);
}

function addData(expenseList, expense) {
  expense.id = Date.now();
  expenseList.push(expense);
  display(expense);
}
