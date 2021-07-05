import { getCustomRepository, Repository } from 'typeorm';
import { ShoppingItem } from '../entities/ShoppingItem';
import { IShoppingItemData } from '../interfaces/ShoppingItem';
import { ShoppingItemRepository } from '../repositories/ShoppingItemRepository';
import { ShoppingListBody } from './ShoppingListBody';


class ShoppingItemBody {
	private shoppingItemRepository: Repository<ShoppingItem>;


	constructor() {
		this.shoppingItemRepository = getCustomRepository(ShoppingItemRepository);
	}

	

	async createWithoutSaving(itemData: IShoppingItemData) {
		const { value_total_shop,value_total,admin,editor } = itemData;
		
		const item = this.shoppingItemRepository.create({value_total_shop,value_total,admin,editor});

		return item;
	}

	async createSaving(itemData: IShoppingItemData){
		const { value_total_shop,value_total,admin,editor } = itemData;
		
		const item = this.shoppingItemRepository.create({value_total_shop,value_total,admin,editor});
		await this.shoppingItemRepository.save(item);
		return item;
		
	}

	async listSI(){
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingitem`);
	}

	
}

export { ShoppingItemBody };