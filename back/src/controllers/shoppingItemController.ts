import { Request, Response } from 'express';
import { ShoppingItemBody } from '../body/ShoppingItemBody';
import { ShoppingItem } from '../entities/ShoppingItem';
import { IShoppingItemData } from '../interfaces/ShoppingItem';



class ShoppingItemController {
	async create(request: Request, response: Response): Promise<Response> {
		const { editor,slid }: IShoppingItemData = request.body;

		const productsbody = new ShoppingItemBody();

		const product = await productsbody.create({ editor,slid });
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
		const sib = new ShoppingItemBody();
		return response.json(await sib.listSI());
	}

	async loadSI(request: Request, response: Response): Promise<Response> {
		let ldata = request.body
		const slb = new ShoppingItemBody()
		ldata = ldata.slid
		let ret = await slb.loadSI(ldata)
		return response.json(ret)
	}

	async addItem(request: Request, response: Response): Promise<Response>{
		const sib = new ShoppingItemBody()
		let requi = request.body
		const ret = await sib.addItemToSI(requi.siid, requi.itemid)
		return response.json(ret)
	}

    async listbyyear(request: Request, response: Response): Promise<Response>{
		const sib = new ShoppingItemBody();
		return response.json(await sib.listbyyear(request.body));
	}

	async listbymonth(request: Request, response: Response): Promise<Response>{
		const sib = new ShoppingItemBody();
		return response.json(await sib.listbymonth(request.body));
	}
	
}

function cleanProduct(product: ShoppingItem) {
	const {admin,editor} = product;
	return {admin,editor};
}

export { ShoppingItemController };