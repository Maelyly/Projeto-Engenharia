import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './Product';


@Entity('promotion')
class Promo {
	@PrimaryColumn()
	id: String;

    @Column({unique: true})
    name: string

	@Column({type: "int"})
	min_num: number;

	@Column({type: "double"})
	promo_perc: number;

	@ManyToOne(()=>Product)
	prod: Product;
    

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Promo };