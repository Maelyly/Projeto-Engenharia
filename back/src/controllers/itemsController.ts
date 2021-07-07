import { Request, Response } from 'express';
import { IItemData } from '../interfaces/Item';
import { Item } from '../entities/Item';
import { ItemsBody } from '../body/ItemsBody';
import { ProductsBody } from '../body/ProductsBody';


class ItemsController {
	async create(request: Request, response: Response): Promise<Response> {
		const {products,quant}: IItemData = request.body;

		const itemsbody = new ItemsBody();
		console.log(products)
		const item = await itemsbody.create({products,quant});
		if (item){
			//const responseData = cleanItem(item);
			return response.json(item);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'Item alredy exist' });
		}
		
	}

	async list(request: Request, response: Response): Promise<Response>{
		const itemsbody = new ItemsBody();
		return response.json(await itemsbody.listItems());
	}

	async goc(request: Request, response: Response): Promise<Response>{
		const {products,quant}: IItemData = request.body;

		const itemsbody = new ItemsBody();
		const ret = await itemsbody.getOrCreate(products,quant)
		return response.json(ret)

	}

	
}

function cleanItem(item: Item) {
	const {products,quant} = item;
	return {products,quant};
}

export { ItemsController };