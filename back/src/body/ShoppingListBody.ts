import { getCustomRepository, Repository } from 'typeorm';
import { ShoppingList } from '../entities/ShoppingList';
import { User } from '../entities/User';
import { IShoppingListData } from '../interfaces/ShoppingList';
import { ShoppingListRepository } from '../repositories/ShoppingListRepository';
import { UsersBody } from './UsersBody';

class ShoppingListBody {
	private shoppingListRepository: Repository<ShoppingList>;
	constructor() {
		this.shoppingListRepository = getCustomRepository(ShoppingListRepository);
	}

	async create(itemData: IShoppingListData) {
		const { total_expenses,owner,shoppingitems } = itemData;
		const today = new Date()
		const item = this.shoppingListRepository.create({total_expenses,owner,month: today.getMonth(), year:today.getFullYear(),shoppingitems});		
		await this.shoppingListRepository.save(item);

		const ub = new UsersBody()
		await ub.update(owner.user_name, {shoppingList: item})

		return item;
	}

	/*async createWithoutSaving(itemData: IShoppingListData) {
		const { total_expenses,owner,,shoppingitems } = itemData;
		
		const item = this.shoppingListRepository.create({total_expenses,owner,month,year,shoppingitems});

		return item;
	}*/

	async listItems(){
		return await this.shoppingListRepository.query(`SELECT * FROM shoppinglist`);
	}

	async exists(user:User){
		if(await this.shoppingListRepository.findOne(user)) return true
		return false
	}
}
export { ShoppingListBody };