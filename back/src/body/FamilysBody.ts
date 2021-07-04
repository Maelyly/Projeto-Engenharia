import { getCustomRepository, Repository } from 'typeorm';
import { Family } from '../entities/Family';
import { IFamilyData } from '../interfaces/family';
import { FamilyRepository } from '../repositories/FamilysRepository';






class FamilyBody {
	private familysRepository: Repository<Family>;
	

	constructor() {
		this.familysRepository = getCustomRepository(FamilyRepository);
	}

	

	async create(familyData: IFamilyData) {
		const {  name, family_owner } = familyData;

		const familyExists = await this.findByName(name);
		

		if (familyExists) return false;
		

		const item = this.familysRepository.create({name, family_owner});

		await this.familysRepository.save(item);

		return item;
	}

	async listItems(){
		return await this.familysRepository.query(`SELECT * FROM family`);
	}

	async findByName(name: string) {
		return this.familysRepository.findOne(name);
	}
	
}

export { FamilyBody };