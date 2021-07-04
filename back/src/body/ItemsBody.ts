import { getCustomRepository, Repository } from 'typeorm';
import { Item } from '../entities/Item';
import { ItemRepository } from '../repositories/ItemsRepository';
import { IItemData } from '../interfaces/Item';
import { ProductRepository } from '../repositories/ProductsRepository';




class ItemsBody {
	private itemsRepository: Repository<Item>;
	productsRepository = getCustomRepository(ProductRepository);

	constructor() {
		this.itemsRepository = getCustomRepository(ItemRepository);
	}

	

	async create(itemData: IItemData) {
		const {  name, quant,id_product,total_price } = itemData;

		const itemExists = await this.findByItemName(name);
		const productExist = await this.findByProductName(name);

		if (itemExists) return false;
		//if (productExist) return true;

		const item = this.itemsRepository.create({name,quant,id_product,total_price});

		await this.itemsRepository.save(item);

		return item;
	}

	async listItems(){
		return await this.itemsRepository.query(`SELECT * FROM items`);
	}

	async findByItemName(itemname: string) {
		return this.itemsRepository.findOne(itemname);
	}
	async findByProductName(productname: string) {
		return this.productsRepository.findOne(productname);
	}
}

export { ItemsBody };