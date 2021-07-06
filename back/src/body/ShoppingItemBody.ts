import { getConnection, getCustomRepository, Repository } from 'typeorm';
import { Item } from '../entities/Item';
import { ShoppingItem } from '../entities/ShoppingItem';
import { IShoppingItemData } from '../interfaces/ShoppingItem';
import { ShoppingItemRepository } from '../repositories/ShoppingItemRepository';
import { ItemsBody } from './ItemsBody';
import { ShoppingListBody } from './ShoppingListBody';
import { UsersBody } from './UsersBody';


class ShoppingItemBody {
	private shoppingItemRepository: Repository<ShoppingItem>;


	constructor() {
		this.shoppingItemRepository = getCustomRepository(ShoppingItemRepository);
	}


	async create(itemData: IShoppingItemData){
		const { editor,slid } = itemData;
		const slb = new ShoppingListBody()
		const shoppinglist = (await slb.findByIdWithdUser(slid))
		console.log(shoppinglist)
		if(!shoppinglist) return false
		const ub = new UsersBody()
		const user = shoppinglist.owner
		console.log(user)
		if(!user) return false
		console.log(user)
		console.log(shoppinglist)
		const items: Item[] = []
		const item = this.shoppingItemRepository.create({value_total_shop:0,value_total:0,admin:user,editor,shoppinglist,items});
		console.log(item)
		//slb.addSI(slid,item)
		//ub.addSI(user.user_name,item)
		await this.shoppingItemRepository.save(item);
		return item;
	}

	async update(id:string){
		const si = await this.shoppingItemRepository.findOne({id}, {relations:["items"]})
		let vt = 0
		for(let i of si.items){
			vt += i.total_price
		}
		this.shoppingItemRepository.update({id:si.id}, {value_total:vt})
	}

	async addItemToSI(id:string, itemId:string){
		const ib = new ItemsBody()
		const item = await ib.findById(itemId)
		if(!item) return false
		await getConnection()
			.createQueryBuilder()
			.relation(ShoppingItem, "items")
			.of({id:id})
			.add(item)
		await this.update(id)
		return true
	}

	async linkSIToSL(idSI:string, idSL:string){
		const slb = new ShoppingListBody()
		//const si = this.findById(idSI)
		const sl = await slb.findById(idSL)
		if(!sl) return false
		await this.shoppingItemRepository.update({id:idSI},{shoppinglist:sl})
		
		return true 
	}

	async loadSI(id:string){
		console.log(id)
		const ret = await getConnection()
		.createQueryBuilder()
		.relation(ShoppingItem, "items")
		.of({id})
		.loadMany() 
		console.log(ret)
		return ret
	}


	async listSI(){
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingItem`);
	}

	async findById(id:String){
		return this.shoppingItemRepository.findOne({id})
	}

	
}

export { ShoppingItemBody };