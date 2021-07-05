import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './Product';

@Entity('items')
class Item {
	@PrimaryColumn()
	id: string;

    @ManyToOne(()=>Product, product => product)
    products: Product;

	@Column({type: "int"})
	quant: number;

    @CreateDateColumn()
	data_incl: Date;

	@Column({type: "double"})
    total_price: number;


	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Item };