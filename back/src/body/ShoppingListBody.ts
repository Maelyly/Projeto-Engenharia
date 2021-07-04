import { getCustomRepository, Repository } from 'typeorm';
import { ShoppingList } from '../entities/ShoppingList';
import { IShoppingListData } from '../interfaces/ShoppingList';
import { ShoppingListRepository } from '../repositories/ShoppingListRepository';

class ShoppingListBody {
	private shoppingListRepository: Repository<ShoppingList>;
	constructor() {
		this.shoppingListRepository = getCustomRepository(ShoppingListRepository);
	}
	async create(itemData: IShoppingListData) {
		const { total_expenses,owner,month,year,shoppingitems } = itemData;
		
		const item = this.shoppingListRepository.create({total_expenses,owner,month,year,shoppingitems});

		await this.shoppingListRepository.save(item);

		return item;
	}

	async listItems(){
		return await this.shoppingListRepository.query(`SELECT * FROM shoppinglist`);
	}
}
export { ShoppingListBody };