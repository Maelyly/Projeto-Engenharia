import { getCustomRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';
import { IProductData } from '../interfaces/Product';



class ProductsBody {
	private productsRepository: Repository<Product>;

	constructor() {
		this.productsRepository = getCustomRepository(ProductRepository);
	}

	

	async create(productData: IProductData) {
		const {  name,date_inclusion,date_modification } = productData;

		const productExists = await this.findByProductName(name);

		if (productExists) return false;

		const product = this.productsRepository.create({name,date_inclusion,date_modification});

		await this.productsRepository.save(product);

		return product;
	}

	async listProducts(){
		return await this.productsRepository.query(`SELECT * FROM items`);
	}

	async findByProductName(productname: string) {
		return this.productsRepository.findOne(productname);
	}
}

export { ProductsBody };