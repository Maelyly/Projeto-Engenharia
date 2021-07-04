import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('shoppingList')
class ShoppingList {
	@PrimaryColumn()
	id: String;
		
	@Column({type: "double"})
	total_expenses: number;

	@ManyToOne(()=>User, user => user.id)
	owner: String;

	@Column({type: "int"})
	month: number;

	@Column({type: "int"})
	year: number;
    
	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { ShoppingList };