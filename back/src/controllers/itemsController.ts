import { Request, Response } from 'express';
import { IItemData } from '../interfaces/Item';
import { Item } from '../entities/Item';
import { ItemsBody } from '../body/ItemsBody';


class ItemsController {
	async create(request: Request, response: Response): Promise<Response> {
		const {quant,products,total_price}: IItemData = request.body;

		const itemsbody = new ItemsBody();

		const item = await itemsbody.create({quant,products,total_price});
		if (item){
			const responseData = cleanItem(item);
			return response.json(responseData);
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

	
}

function cleanItem(item: Item) {
	const {quant,products,total_price} = item;
	return {quant,products,total_price};
}

export { ItemsController };