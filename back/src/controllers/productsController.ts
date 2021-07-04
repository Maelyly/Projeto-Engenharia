import { Request, Response } from 'express';
import { IProductData } from '../interfaces/Product';
import { Product } from '../entities/Product';
import { ProductsBody } from '../body/ProductsBody';


class ProductsController {
	async create(request: Request, response: Response): Promise<Response> {
		const {name,category,price}: IProductData = request.body;

		const productsbody = new ProductsBody();

		const product = await productsbody.create({name,category,price});
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
		const productsbody = new ProductsBody();
		return response.json(await productsbody.listProducts());
	}

	
}

function cleanProduct(product: Product) {
	const {name,date_inclusion,date_modification} = product;
	return {name,date_inclusion,date_modification};
}

export { ProductsController };