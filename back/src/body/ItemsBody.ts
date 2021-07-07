import { getCustomRepository, Repository } from 'typeorm';
import { Item } from '../entities/Item';
import { ItemRepository } from '../repositories/ItemsRepository';
import { IItemData } from '../interfaces/Item';
import { ProductRepository } from '../repositories/ProductsRepository';
import { Product } from '../entities/Product';
import { ProductsBody } from './ProductsBody';


class ItemsBody {
	private itemsRepository: Repository<Item>;
	productsRepository = getCustomRepository(ProductRepository);

	constructor() {
		this.itemsRepository = getCustomRepository(ItemRepository);
	}

	

	async create(itemData: IItemData) {
		const {  products,quant } = itemData;
		const pb = new ProductsBody();
		const p = await pb.findByProductName(products)
		const itemExists = await this.findByItem(p, quant);
		
		console.log(`log do products em itemsbody ${products}`)
		
		console.log(`log do p ${p}`)
		if (!p) return false
		if (itemExists) return false;
		//if (productExist) return true;
		const total_price = p.price*quant
		const item = this.itemsRepository.create({products:p,quant,total_price});

		await this.itemsRepository.save(item);

		return item;
	}

	async listItems(){
		return await this.itemsRepository.query(`SELECT * FROM items`);
	}

	async findByItem(product: Product,quant: number) {
		return this.itemsRepository.findOne({products: product, quant: quant});
	}
	async findById(id: string) {
		return this.itemsRepository.findOne({id: id});
	}

	async findByProductName(productname: string) {
		return this.productsRepository.findOne(productname);
	}

	async getOrCreate(productname: string, quant: number){
		const pb = new ProductsBody()
		const product = await pb.findByProductName(productname)
		let item = await this.findByItem(product, quant)
		const data ={
			products: productname,
			quant: quant
		}
		if(!item){  
			let tItem = await this.create(data)
			return tItem
			
		}
		else{
			return item
		}
		

	}
}

export { ItemsBody };