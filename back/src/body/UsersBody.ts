import { getConnection, getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import { IUserData } from '../interfaces/User';
import { hashSync, genSaltSync } from 'bcrypt';
import { ShoppingListBody } from './ShoppingListBody';
import { ShoppingItemBody } from './ShoppingItemBody';
import { ShoppingItem } from '../entities/ShoppingItem';


class UsersBody {
	private usersRepository: Repository<User>;

	constructor() {
		this.usersRepository = getCustomRepository(UsersRepository);
	}

	private hashPassword(password: string) {
		const salt = genSaltSync();
		const hashedPassword = hashSync(password, salt);
		return hashedPassword;
	}

	async create(userData: IUserData) {
		const { email, name, password, user_name } = userData;
		let family = null
		const userExists = await this.findByUser_name(user_name);

		if (userExists) return false;
		let shoppingitems: ShoppingItem[] = []
		const user = this.usersRepository.create({email,name,passwordHash: this.hashPassword(password),user_name,family,shoppingitems:null});

		await this.usersRepository.save(user);

		return user;
	}

	async addSI(user_name:string,si:ShoppingItem){
		await getConnection()
			.createQueryBuilder()
			.relation(ShoppingItem, "items")
			.of({user_name})
			.add(si)
	}
	
	async update(user_name:string, id:string){
		//this.usersRepository.update({user_name:username}, update)
		this.usersRepository.query(`UPDATE users SET familyId = "${id}" WHERE user_name = "${user_name}"`);
	}

	async listUsers(){
		return await this.usersRepository.query(`SELECT * FROM users`);
	}
	async findbyfamily(id:string){
		return await this.usersRepository.query(`SELECT * FROM users WHERE familyId = "${id}"`);
	}

	async findByUser_name(user_name: string) {
		return this.usersRepository.findOne({
			user_name,
		});
	}

	async findByUser_nameWithSl(user_name: string) {
		return this.usersRepository.findOne({user_name},{relations:[]});
	}
}

export { UsersBody };