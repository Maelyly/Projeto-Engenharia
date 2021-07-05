import { getCustomRepository, Repository, TransactionAlreadyStartedError, UsingJoinColumnOnlyOnOneSideAllowedError } from 'typeorm';
import { Family } from '../entities/Family';
import { User } from '../entities/User';
import { IFamilyData } from '../interfaces/Family';
import { FamilyRepository } from '../repositories/FamilysRepository';
import { UsersBody } from './UsersBody';


class FamilyBody {
	private familysRepository: Repository<Family>;
	private usersRepository: Repository<User>;

	constructor() {
		this.familysRepository = getCustomRepository(FamilyRepository);
	}

	

	async create(familyData: IFamilyData) {
		const {  name,user } = familyData;

		const familyExists = await this.findByName(name);
		let p;
		 user.forEach(element => {
			if(!this.findByUser(element.name)){
				p=false;
				return;
			}
			p = true;});

        if(!p) return false

		if (familyExists) return false;
		

		const family = this.familysRepository.create({name,user});

		await this.familysRepository.save(family);

		return family;
	}

	async addToFamily(id:string, user:User){
		const si = await this.familysRepository.findOne({id:id});
		console.log(si);
		console.log(user);
		if(user.family==null){
		  //si.user.push(user);
		  //console.log(si.user);
		  user.family=si;
		  console.log(user.family);
		}else{
			console.log(user.family);
		}
		 
	}

	async listfamily(){
		return await this.familysRepository.query(`SELECT * FROM family`);
	}
	
	async findByName(name: string) {
		return this.familysRepository.findOne(name);
	}

	async findByUser(name_user: string) {
		return this.usersRepository.findOne(name_user);
	}

	
	
} 

export { FamilyBody };