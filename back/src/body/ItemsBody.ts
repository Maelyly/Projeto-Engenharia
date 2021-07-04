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
		const { quant,products,total_price } = itemData;


		const item = this.itemsRepository.create({quant,products,total_price});

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