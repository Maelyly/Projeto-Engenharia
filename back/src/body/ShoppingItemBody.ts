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
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingitem`);
	}

	async listbyyear(year:String){ 
		let d = (year+"-01-01");
		let date1 = new Date(d);
        let date2 = new Date((year+"-12-31"));
		//return (await getConnection().createQueryBuilder().select("*").from(ShoppingItem, "shoppingitem").where("shoppingitem.date_shop < :date", { date: date1 }).andWhere("shoppingitem.date_shop >= :date", { date: date2 }));
		return await this.shoppingItemRepository.query(`SELECT * FROM shoppingitem WHERE date_shop <= ${date1} AND WHERE date_shop >= ${date2}`);
	}
	async listbymonth(month:String){ 
		let date1 = new Date("01/"+month+"/2021");
        let date2 = new Date("31/"+month+"/2021");
		return await getConnection().createQueryBuilder().select("*").from(ShoppingItem, "shoppingitem").where("shoppingitem.date_shop < :date", { date: date1 }).andWhere("shoppingitem.date_shop >= :date", { date: date2 });
		//return await this.shoppingItemRepository.query(`SELECT * FROM shoppingitem WHERE date_shop IN ()`);
	}
	
}

export { ShoppingItemBody };