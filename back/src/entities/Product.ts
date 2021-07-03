import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('product')
class Product {
	@PrimaryColumn()
	id: string;
   
   @Column()
   name: string;

   @CreateDateColumn()
   date_inclusion: Date;

   @UpdateDateColumn()
   date_modification: Date;


	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Product };