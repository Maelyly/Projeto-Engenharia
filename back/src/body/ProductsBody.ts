import { getCustomRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductsRepository';
import { IProductData } from '../interfaces/Product';



class ProductsBody {
	private productsRepository: Repository<Product>;

	constructor() {
		this.productsRepository = getCustomRepository(ProductRepository);
	}

	

	async create(productData: IProductData) {
		const {  name,category,price } = productData;

		const productExists = await this.findByProductName(name);

		if (productExists) return false;

		const product = this.productsRepository.create({name,category,price});

		await this.productsRepository.save(product);

		return product;
	}

	async listProducts(){
		return await this.productsRepository.query(`SELECT * FROM product`);
	}

	async findByProductName(name: string) {
		const p = await this.productsRepository.findOne({name: name});
		return p
	}
	async findByProductId(id: string) {
		const p = await this.productsRepository.findOne({id});
		return p
	}
}

export { ProductsBody };