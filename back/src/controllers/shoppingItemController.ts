import { Request, Response } from 'express';
import { ShoppingItemBody } from '../body/ShoppingItem';
import { ShoppingItem } from '../entities/ShoppingItem';
import { IShoppingItemData } from '../interfaces/Shoppingitem';



class ShoppingItemController {
	async create(request: Request, response: Response): Promise<Response> {
		const {value_total_shop,value_total,admin,editor}: IShoppingItemData = request.body;

		const productsbody = new ShoppingItemBody();

		const product = await productsbody.create({value_total_shop,value_total,admin,editor});
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
		const productsbody = new ShoppingItemBody();
		return response.json(await productsbody.listItems());
	}

	
}

function cleanProduct(product: ShoppingItem) {
	const {value_total_shop,value_total,admin,editor} = product;
	return {value_total_shop,value_total,admin,editor};
}

export { ShoppingItemController };