import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import { IUserData } from '../interfaces/User';
import { hashSync, genSaltSync } from 'bcrypt';
import { ShoppingListBody } from './ShoppingListBody';
import { ShoppingItemBody } from './ShoppingItemBody';


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
		let shoppinglist = null
		let shoppingitems = null
		const userExists = await this.findByUser_name(user_name);

		if (userExists) return false;

		const user = this.usersRepository.create({email,name,passwordHash: this.hashPassword(password),user_name,family,shoppingitems});

		await this.usersRepository.save(user);

		return user;
	}
	
	async update(username:string, update:any){
		this.usersRepository.update({user_name:username}, update)
	}

	async listUsers(){
		return await this.usersRepository.query(`SELECT * FROM users`);
	}

	async findByUser_name(user_name: string) {
		return this.usersRepository.findOne({
			user_name,
		});
	}
}

export { UsersBody };