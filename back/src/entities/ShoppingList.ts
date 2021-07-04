import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('shoppingList')
class ShoppingList {
	@PrimaryColumn()
	id: String;

	@Column({type: "double"})
	total_de_gastos: number;

	@Column()
	dono: String;

	@Column({type: "int"})
	mes: number;

	@Column({type: "int"})
	ano: number;
    
	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { ShoppingList };