import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UserRepository';
import { IUserData } from '../interfaces/User';
import { hashSync, genSaltSync } from 'bcrypt';


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

		const userExists = await this.findByEmail(email);

		if (userExists) return false;

		const user = this.usersRepository.create({
			email,
			name,
			passwordHash: this.hashPassword(password),
			user_name,
		});

		await this.usersRepository.save(user);

		return user;
	}

	async listUsers(){
		return await this.usersRepository.query(`SELECT * FROM users`);
	}

	async findByEmail(email: string) {
		return this.usersRepository.findOne({
			email,
		});
	}
}

export { UsersBody };