import { getCustomRepository, Repository } from 'typeorm';
import { Item } from '../entities/Item';
import { ShoppingItem } from '../entities/ShoppingItem';
import { IShoppingItemData } from '../interfaces/ShoppingItem';
import { ShoppingItemRepository } from '../repositories/ShoppingItemRepository';
import { ItemsBody } from './ItemsBody';
import { ShoppingListBody } from './ShoppingListBody';


class ShoppingItemBody {
	private shoppingItemRepository: Repository<ShoppingItem>;


	constructor() {
		this.shoppingItemRepository = getCustomRepository(ShoppingItemRepository);
	}


	async create(itemData: IShoppingItemData){
		const { value_total_shop,value_total,admin,editor } = itemData;
		const item = this.shoppingItemRepository.create({value_total_shop,value_total,admin,editor});
		await this.shoppingItemRepository.save(item);
		return item;
		
	}

	async addToSI(id:string, itemId:string){
		const ib = new ItemsBody()
		const item = await ib.findById(id)
		if(!item) return false
		const si = await this.shoppingItemRepository.findOne({id:id})
		si.items.push(item)
	}


	async listSI(){
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingitem`);
	}

	
}

export { ShoppingItemBody };