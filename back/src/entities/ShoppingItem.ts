import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ShoppingList } from './ShoppingList';
import { User } from './User';

@Entity('shoppingItem')
class ShoppingItem {
	@PrimaryColumn()
	id: String;

	@Column({type: "double"})
	value_total_shop: number;

	@Column({type: "double"})
	value_total: number;

	@CreateDateColumn()
	date_shop: Date;

	@ManyToOne(()=>User, user => user.shoppingitems)
	admin: User;
    
	@Column()
	editor:boolean;

	@ManyToOne(()=>ShoppingList, list => list.shoppingitems)
	shoppinglist: ShoppingList;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { ShoppingItem };