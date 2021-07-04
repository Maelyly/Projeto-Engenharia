import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('expense')
class Expense {
	@PrimaryColumn()
	id: String;

	@Column({type: "double"})
	valor_gasto_usuario: number;

	@Column({type: "double"})
	valor_gasto_familiar: number;

	@Column()
	meta_gastos_usuario: Date;

	@Column()
	meta_gastos_familiar: String;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Expense };