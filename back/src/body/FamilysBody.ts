import { getCustomRepository, Repository } from 'typeorm';
import { Family } from '../entities/Family';
import { IFamilyData } from '../interfaces/Family';
import { FamilyRepository } from '../repositories/FamilysRepository';


class FamilyBody {
	private familysRepository: Repository<Family>;
	

	constructor() {
		this.familysRepository = getCustomRepository(FamilyRepository);
	}

	

	async create(familyData: IFamilyData) {
		const {  name,user } = familyData;

		const familyExists = await this.findByName(name);
		

		if (familyExists) return false;
		

		const family = this.familysRepository.create({name,user});

		await this.familysRepository.save(family);

		return family;
	}

	async listItems(){
		return await this.familysRepository.query(`SELECT * FROM family`);
	}

	async findByName(name: string) {
		return this.familysRepository.findOne(name);
	}
	
}

export { FamilyBody };