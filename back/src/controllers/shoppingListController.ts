import { Request, Response } from 'express';
import { AuthBody } from '../body/AuthBody';
import { ShoppingListBody } from '../body/ShoppingListBody';
import { ShoppingList } from '../entities/ShoppingList';
import { IShoppingListData } from '../interfaces/ShoppingList';



class ShoppingListController {
	async create(request: Request, response: Response): Promise<Response> {
		const { total_expenses,owner,shoppingitems }: IShoppingListData = request.body;

		const slb = new ShoppingListBody();

		const sl = await slb.create({ total_expenses,owner,shoppingitems });
		if (sl){
			const responseData = cleanProduct(sl);
			return response.json(responseData);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'Product already exist' });
		}
		
	}

	

	async list(request: Request, response: Response): Promise<Response> {
		const { token } = request.body;
		const slb = new ShoppingListBody();
		return response.json(await slb.getList(token));
	}



	
}

function cleanProduct(product: ShoppingList) {
	const { total_expenses,owner,month,year,shoppingitems} = product;
	return { total_expenses,owner,month,year,shoppingitems};
}

export { ShoppingListController };