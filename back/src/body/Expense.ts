import { getCustomRepository, Repository } from 'typeorm';
import { Expense } from '../entities/Expense';
import { ExpenseRepository } from '../repositories/ExpensesRepository';
import { IExpenseData } from '../interfaces/Expense';


class ExpenseBody {
	private expenseRepository: Repository<Expense>;
	

	constructor() {
		this.expenseRepository = getCustomRepository(ExpenseRepository);
	}

	

	async create(expenseData: IExpenseData) {
		const { value_expenses_family,value_expenses_user,goal_expenses_user,goal_expenses_famiy  } = expenseData;

		const expense = this.expenseRepository.create({value_expenses_family,value_expenses_user,goal_expenses_user,goal_expenses_famiy});

		await this.expenseRepository.save(expense);

		return expense;
	}

	async listItems(){
		return await this.expenseRepository.query(`SELECT * FROM expense`);
	}

	
}

export { ExpenseBody };