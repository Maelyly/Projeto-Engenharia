import { getCustomRepository, Repository } from "typeorm";
import { User } from '../entities/User'
import { UsersRepository } from '../repositories/UsersRepository';
import { compareSync } from 'bcrypt';
import *  as jwt from 'jsonwebtoken';
import { json } from 'express';



class AuthBody {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)
    }

    async authenticate(user_name: string, password: string) {
        const user = await this.usersRepository.findOne({ user_name });

		if (!user) return false;

		const hash = user.passwordHash;

		const isCorrectPassword = compareSync(password, hash);

		if (isCorrectPassword) {
			console.log(process.env.ACCESS_TOKEN_SECRET);
			const accessToken = jwt.sign({ "username": user.user_name }, process.env.ACCESS_TOKEN_SECRET);
			return accessToken;
		}

		return isCorrectPassword;
    }

} 

export { AuthBody }