import { Request, Response } from 'express';
import { ShoppingListBody } from '../body/ShoppingListBody';
import { ShoppingList } from '../entities/ShoppingList';
import { IShoppingListData } from '../interfaces/ShoppingList';



class ShoppingListController {
	async create(request: Request, response: Response): Promise<Response> {
		const { total_expenses,owner,month,year,shoppingitems}: IShoppingListData = request.body;

		const productsbody = new ShoppingListBody();

		const product = await productsbody.create({ total_expenses,owner,month,year,shoppingitems });
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
		const productsbody = new ShoppingListBody();
		return response.json(await productsbody.listItems());
	}

	
}

function cleanProduct(product: ShoppingList) {
	const { total_expenses,owner,month,year,shoppingitems} = product;
	return { total_expenses,owner,month,year,shoppingitems};
}

export { ShoppingListController };