import { Request, Response } from 'express';
import { AuthBody } from '../body/AuthBody';
import { ShoppingListBody } from '../body/ShoppingListBody';
import { ShoppingList } from '../entities/ShoppingList';
import { IShoppingListData } from '../interfaces/ShoppingList';



class ShoppingListController {
	async create(request: Request, response: Response): Promise<Response> {
		const { owner }: IShoppingListData = request.body;

		const slb = new ShoppingListBody();

		const sl = await slb.create({ owner });
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

	async loadSL(request: Request, response: Response): Promise<Response> {
		let ldata = request.body
		const slb = new ShoppingListBody()
		ldata = ldata.slid
		let ret = await slb.loadSL(ldata)
		return response.json(ret)
	}

	async list(request: Request, response: Response): Promise<Response> {
		const slb = new ShoppingListBody();
		return response.json(await slb.listSL());
	}


	async showOwner(request: Request, response: Response): Promise<Response> {
		const { owner }: IShoppingListData = request.body;
		const slb = new ShoppingListBody()
		return response.json(slb.showOwnner(owner))
	}
	
}

function cleanProduct(product: ShoppingList) {
	const { total_expenses,owner,month,year,shoppingitems} = product;
	return { total_expenses,owner,month,year,shoppingitems};
}

export { ShoppingListController };