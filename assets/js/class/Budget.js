class Budget {
	constructor () {
		this.budget = 0
		this.expenses = []
	}

	addBudget (amount) {
		this.budget += amount
	}

	addExpense (expense) {
		let balance = this.balance() - expense.amount
		balance <= 0
			? alert(`No hay saldo suficiente. Saldo disponbile: ${this.balance()}, el total del gasto es de: ${expense.amount}`)
			: this.expenses.push(expense)
	}

	// DONT WORK
	removeExpense (expense) {
		this.expense = this.expense.filter(item => item !== expense.id)
	}

	balance () {
		return this.budget - this.totalExpenses()
	}

	totalExpenses () {
		let totalExpenses = 0
		this.expenses.forEach((expense) => {
			totalExpenses += expense.amount
		})
		return totalExpenses
	}
}

export default Budget