import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('shoppingItem')
class ShoppingItem {
	@PrimaryColumn()
	id: String;

	@Column({type: "double"})
	valor_total_compra: number;

	@Column({type: "double"})
	valor_total: number;

	@Column()
	date_compra: Date;

	@Column()
	admin: String;
    
	@Column()
	editores: String;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { ShoppingItem };