// ==========================
//   Variabler & Arrayer
// ==========================

const income = [];
const expenses = [];

const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const balanceDisplay = document.getElementById("balance");

// ==========================
//   Eventlyssnare
// ==========================

incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));

// ==========================
//   Lägg till transaktion
// ==========================

function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Fyll i en beskrivning och ett positivt belopp.");
    return;
  }

  const transaction = {
    description,
    amount,
    type
  };

  if (type === "income") {
    income.push(transaction);
  } else {
    expenses.push(transaction);
  }

  descInput.value = "";
  amountInput.value = "";

  renderTransactions();
  updateBalance();
}

// ==========================
//   Visa transaktioner
// ==========================

function renderTransactions() {
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  for (const item of income) {
    const li = document.createElement("li");
    li.textContent = `${item.description} - ${item.amount} kr (Inkomst)`;
    incomeList.appendChild(li);
  }

  for (const item of expenses) {
    const li = document.createElement("li");
    li.textContent = `${item.description} - ${item.amount} kr (Utgift)`;
    expenseList.appendChild(li);
  }
}

// ==========================
//   Uppdatera saldo
// ==========================

function updateBalance() {
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Testet förväntar sig exakt "1000", inte "1000.00"
  balanceDisplay.textContent = balance.toString();
}
