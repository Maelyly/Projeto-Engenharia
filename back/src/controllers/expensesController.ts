import { Request, Response } from 'express';
import { IExpenseData } from '../interfaces/Expense';
import { ExpenseBody } from '../body/ExpenseBody';
import { Expense } from '../entities/Expense';


class ExpenseController {
	async create(request: Request, response: Response): Promise<Response> {
		const {value_expenses_family,value_expenses_user,goal_expenses_user,goal_expenses_famiy }: IExpenseData = request.body;

		const expensebody = new ExpenseBody();

		const product = await expensebody.create({value_expenses_family,value_expenses_user,goal_expenses_user,goal_expenses_famiy });
		if (product){
			const responseData = cleanProduct(product);
			return response.json(responseData);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'Product already exist' });
		}
		
	}

	async list(request: Request, response: Response): Promise<Response>{
		const expensebody = new ExpenseBody();
		return response.json(await expensebody.listItems());
	}

	
}

function cleanProduct(product: Expense) {
	const {value_expenses_family,value_expenses_user,goal_expenses_user,goal_expenses_famiy} = product;
	return {value_expenses_family,value_expenses_user,goal_expenses_user,goal_expenses_famiy};
}

export { ExpenseController };