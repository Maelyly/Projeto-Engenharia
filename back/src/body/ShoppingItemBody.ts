import { getCustomRepository, Repository } from 'typeorm';
import { Item } from '../entities/Item';
import { ShoppingItem } from '../entities/ShoppingItem';
import { IShoppingItemData } from '../interfaces/ShoppingItem';
import { ShoppingItemRepository } from '../repositories/ShoppingItemRepository';
import {getConnection} from "typeorm";


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

	async addToSI(id:string, item:Item){
		const si = await this.shoppingItemRepository.findOne({id:id});
		si.items.push(item);
	}


	async listSI(){
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingItem`);
	}

	async listbyyear(year:String){ 
		let date1 = new Date(year+"-01-01");
		console.log(date1)
		let date2 = new Date(year+"-12-31");
		//return (await getConnection().createQueryBuilder().select("*").from(ShoppingItem, "shoppingitem").where("shoppingitem.date_shop < :date", { date: date1 }).andWhere("shoppingitem.date_shop >= :date", { date: date2 }));
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingItem WHERE date_shop BETWEEN "${date1}" AND "${date2}"`);
	}
	async listbymonth(month:String){ 
		console.log(month)
		let date1 = new Date("2021-"+month+"-01");
		console.log("2021-"+month+"-01")
        let date2 = new Date("2021-"+month+"-31");
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingItem WHERE date_shop BETWEEN "${date1}" AND "${date2}"`);
	
	}
	
}

export { ShoppingItemBody };