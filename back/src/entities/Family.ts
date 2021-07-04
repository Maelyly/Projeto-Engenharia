import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('family')
class Family {
	@PrimaryColumn()
	id: String;

	@Column()
	nome: String;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Family };