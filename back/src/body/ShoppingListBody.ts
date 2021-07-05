import { getCustomRepository, Repository } from 'typeorm';
import { ShoppingList } from '../entities/ShoppingList';
import { User } from '../entities/User';
import { IShoppingListData } from '../interfaces/ShoppingList';
import { ShoppingListRepository } from '../repositories/ShoppingListRepository';
import { AuthBody } from './AuthBody';
import { UsersBody } from './UsersBody';

class ShoppingListBody {
	private shoppingListRepository: Repository<ShoppingList>;
	constructor() {
		this.shoppingListRepository = getCustomRepository(ShoppingListRepository);
	}

	async create(itemData: IShoppingListData) {
		const { total_expenses,owner,shoppingitems } = itemData;
		const today = new Date()
		const ub = new UsersBody()
		const user = await ub.findByUser_name(owner)
		if(this.exists(user)) return false
		const item = this.shoppingListRepository.create({total_expenses,owner:user ,month: today.getMonth(), year:today.getFullYear(),shoppingitems});
		await this.shoppingListRepository.save(item);


		await ub.update(user.user_name, {shoppingList: item})

		return item;
	}

	/*async createWithoutSaving(itemData: IShoppingListData) {
		const { total_expenses,owner,,shoppingitems } = itemData;
		
		const item = this.shoppingListRepository.create({total_expenses,owner,month,year,shoppingitems});

		return item;
	}*/

	private async listItems(){
		return await this.shoppingListRepository.query(`SELECT * FROM shoppinglist`);
	}

	async exists(user:User){
		if(await this.shoppingListRepository.findOne({owner:user})) return true
		return false
	}

	async getList(token: string){
		const ab = new AuthBody()
		const slb = new ShoppingListBody();
		const user = ab.checkToken(token)
		if (!user){
			this.create({ total_expenses: 0, owner: user, shoppingitems:null })
		}
		return this.shoppingListRepository.findOne(user)
	}

	
}
export { ShoppingListBody };