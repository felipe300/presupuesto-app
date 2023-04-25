import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
import Budget from './class/Budget.js'
import Expenses from './class/Expenses.js'

const formBudget = document.getElementById('formBudget')
const formExpenses = document.getElementById('formExpenses')

let budget = new Budget()
let arr = []

function addExpense (id, name, amount) {
	let gasto = new Expenses(id, name, amount)
	budget.addExpense(gasto)
}

const addBudgetDom = (e) => {
	e.preventDefault()
	let newBudgetInput = parseInt(document.getElementById('budgetInput').value)

	let budgetElement = document.getElementById('budget')
	let balanceElement = document.getElementById('balance')

	budget.addBudget(newBudgetInput)

	budgetElement.innerHTML = parseInt(budgetElement.innerText) + newBudgetInput
	balanceElement.innerHTML = parseInt(balanceElement.innerText) + newBudgetInput

	document.getElementById('budgetInput').value = ""
}

const addExpenses = (e) => {
	e.preventDefault()
	let expensesInputName = document.getElementById('expensesInputName')
	let expensesInputValue = document.getElementById('expensesInputValue')
	let random = uuidv4().slice(0, 8)

	if (budget.balance() - parseInt(expensesInputValue.value) <= 0) {
		alert(`No hay saldo suficiente. Saldo disponbile: $${budget.balance()}, el total del gasto es de: $${parseInt(expensesInputValue.value)}`)
	} else {
		addExpense(
			random,
			expensesInputName.value,
			parseInt(expensesInputValue.value))

		document.getElementById("expensesList").innerHTML += `
			<ul class="row list item" id=${random}>
				<li class="col">
					${expensesInputName.value}
				</li>
				<li class="col">
					${parseInt(expensesInputValue.value)}
				</li>
				<li class="col">
					<button data-id="${random}" onclick="deleteItem('${random}')">
						Eliminar
					</button>
				</li>
			</ul>
	`
		let expenses = document.getElementById('expenses')
		let balance = document.getElementById('balance')
		expenses.innerHTML = budget.totalExpenses()
		balance.innerHTML = budget.balance()
	}

	expensesInputName.value = ""
	expensesInputValue.value = ""

	arr.push(budget.expenses[0])
}

window.deleteItem = (id) => {
	const child = document.querySelector(`[data-id='${id}']`)
	let filtered = budget.expenses.filter((item) => item.id === id)

	// DONT WORK
	//budget.removeExpense(filtered)

	child.parentElement.parentElement.remove()
}

formBudget.addEventListener('submit', addBudgetDom)
formExpenses.addEventListener("submit", addExpenses)
