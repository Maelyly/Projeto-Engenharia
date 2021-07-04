import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Family } from './Family';
import { ShoppingItem } from './ShoppingItem';
import { ShoppingList } from './ShoppingList';

@Entity('users')
class User {
	@PrimaryColumn()
	id: string;

	@Column()
	email: string;

	@Column()
	passwordHash: string;

	@Column()
	name: string;

	@Column()
	user_name: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(()=>Family, family => family.user)
	family:Family;
	
	@OneToOne(()=>ShoppingList, shoppinglisty => shoppinglisty.owner)
	shoppinglist:ShoppingList;

	@OneToMany(()=>ShoppingItem, shop => shop.admin)
	shoppingitems: ShoppingItem[];

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { User };