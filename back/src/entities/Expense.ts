import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('expense')
class Expense {
	@PrimaryColumn()
	id: String;

	@Column({type: "double"})
	value_expenses_user: number;

	@Column({type: "double"})
	value_expenses_family: number;

	@Column({type: "double"})
	goal_expenses_user: number;

	@Column({type: "double"})
	goal_expenses_famiy: number;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Expense };