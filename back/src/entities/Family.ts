import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('family')
class Family {
	@PrimaryColumn()
	id: String;

	@Column()
	name: String;
    
	@ManyToOne(()=>User, user => user.id)
	family_owner:String;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Family };