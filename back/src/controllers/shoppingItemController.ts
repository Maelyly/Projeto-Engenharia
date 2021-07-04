import { Request, Response } from 'express';
import { ShoppingItemBody } from '../body/ShoppingItemBody';
import { ShoppingItem } from '../entities/ShoppingItem';
import { IShoppingItemData } from '../interfaces/ShoppingItem';



class ShoppingItemController {
	async create(request: Request, response: Response): Promise<Response> {
		const {value_total_shop,value_total,admin,editor, shoppinglist}: IShoppingItemData = request.body;

		const productsbody = new ShoppingItemBody();

		const product = await productsbody.create({ value_total_shop,value_total,admin,editor, shoppinglist });
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