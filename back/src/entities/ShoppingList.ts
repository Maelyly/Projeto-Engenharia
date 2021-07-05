import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ShoppingItem } from './ShoppingItem';
import { User } from './User';

@Entity('shoppingList')
class ShoppingList {
	@PrimaryColumn()
	id: String;
		
	@Column({type: "double"})
	total_expenses: number;

	@OneToOne(()=>User)
	@JoinColumn()
	owner: User;

	@Column({type: "int"})
	month: number;

	@Column({type: "int"})
	year: number;

	@OneToMany(()=>ShoppingItem, shopitem => shopitem.shoppinglist)
	shoppingitems: ShoppingItem[];
    
	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { ShoppingList };