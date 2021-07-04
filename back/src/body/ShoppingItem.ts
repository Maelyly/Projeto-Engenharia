import { getCustomRepository, Repository } from 'typeorm';
import { ShoppingItem } from '../entities/ShoppingItem';
import { IShoppingItemData } from '../interfaces/Shoppingitem';
import { ShoppingItemRepository } from '../repositories/ShoppingItem';


class ShoppingItemBody {
	private shoppingItemRepository: Repository<ShoppingItem>;


	constructor() {
		this.shoppingItemRepository = getCustomRepository(ShoppingItemRepository);
	}

	

	async create(itemData: IShoppingItemData) {
		const { value_total_shop,value_total,admin,editor } = itemData;
		
		const item = this.shoppingItemRepository.create({value_total_shop,value_total,admin,editor});

		await this.shoppingItemRepository.save(item);

		return item;
	}

	async listItems(){
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingitem`);
	}

	
}

export { ShoppingItemBody };