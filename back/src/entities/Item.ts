import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './Product';

@Entity('items')
class Item {
	@PrimaryColumn()
	   id: string;

       @ManyToOne(()=>Product, product => product.id)
       id_product: string;
       @ManyToOne(()=>Product, product => product.name)
	   name: string;

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