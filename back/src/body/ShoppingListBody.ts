import { getConnection, getCustomRepository, Repository } from 'typeorm';
import { ShoppingItem } from '../entities/ShoppingItem';
import { ShoppingList } from '../entities/ShoppingList';
import { User } from '../entities/User';
import { IShoppingListData } from '../interfaces/ShoppingList';
import { ShoppingListRepository } from '../repositories/ShoppingListRepository';
import { AuthBody } from './AuthBody';
import { ShoppingItemBody } from './ShoppingItemBody';
import { UsersBody } from './UsersBody';

class ShoppingListBody {
	private shoppingListRepository: Repository<ShoppingList>;
	constructor() {
		this.shoppingListRepository = getCustomRepository(ShoppingListRepository);
	}

	async create(itemData: IShoppingListData) {
		const { owner } = itemData;
		const today = new Date()
		const ub = new UsersBody()
		const user = await ub.findByUser_name(owner)
		console.log(user)
		console.log(await this.exists(user))
		if(await this.exists(user)) return false
		let shoppingitems: ShoppingItem[]
		const item = this.shoppingListRepository.create({total_expenses:0,owner:user ,month: today.getMonth(), year:today.getFullYear(),shoppingitems});
		await this.shoppingListRepository.save(item);

		return item;
	}

	

	/*async createWithoutSaving(itemData: IShoppingListData) {
		const { total_expenses,owner,,shoppingitems } = itemData;
		
		const item = this.shoppingListRepository.create({total_expenses,owner,month,year,shoppingitems});

		return item;
	}*/


	async exists(user:User){
		if(await this.shoppingListRepository.findOne({owner:user})) return true
		return false
	}

	async showOwnner(id:string){
		const sl = await this.shoppingListRepository.findOne({id:id},{relations:["owner"]})
		console.log(sl)
		console.log(sl.owner)
		return sl
	}

	async listSL(){
		return await this.shoppingListRepository.query(`SELECT * FROM shoppingList`);
	}

	async loadSL(id:string){
		console.log(id)
		const ret = await getConnection()
		.createQueryBuilder()
		.relation(ShoppingList, "shoppingitems")
		.of({id})
		.loadMany() 
		console.log(ret)
		return ret
	}

	async addSI(id:string,si:ShoppingItem){
		await getConnection()
			.createQueryBuilder()
			.relation(ShoppingItem, "items")
			.of({id:id})
			.add(si)
	}

	async findById(idsl:String){
		return this.shoppingListRepository.findOne({id:idsl})
	}

	async findByIdWithdUser(id:string){
		return await this.shoppingListRepository.findOne({id:id},{relations:["owner"]})
	}

	async update(sl:ShoppingList){
		let vt = 0
		for(let i of sl.shoppingitems){
			vt += i.value_total
		}
		this.shoppingListRepository.update({id:sl.id}, {total_expenses:vt})
	}

	async getList(token: string){
		const ab = new AuthBody()
		console.log('entrando no checktoken')
		let user = await ab.checkToken(token)
		console.log('saindo, user logo abaixo')
		console.log(user.user_name)
		user = user.user_name
		if (!user.shoppingList){
			await this.create({ owner: user})
		}
		const ub = new UsersBody()
		const objuser = await ub.findByUser_name(user)
		return await this.shoppingListRepository.findOne({owner:objuser},{relations:["shoppingitems"]})
	}

	
}
export { ShoppingListBody };