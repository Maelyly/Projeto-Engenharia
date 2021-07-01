import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('product')
class Product {
	@PrimaryColumn()
	id: string;
   
   @Column()
   name: string;

   @Column()
   date_inclusion: Date;

   @Column()
   date_modification: Date;


	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Product };