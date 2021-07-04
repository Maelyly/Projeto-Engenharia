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
			const accessToken = jwt.sign({ 'user_name' : user.user_name }, process.env.ACCESS_TOKEN_SECRET);
			return accessToken;
		}

		return isCorrectPassword;
    }

	checkToken(token: string){
		var ret: any
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) return "deu erro";
			ret = user
		})
		return ret
	}

} 

export { AuthBody }