import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('family')
class Family {
	@PrimaryColumn()
	id: String;

	@Column()
	name: String;
    
	@OneToMany(()=>User, user => user.family)
	user:User[];

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Family };