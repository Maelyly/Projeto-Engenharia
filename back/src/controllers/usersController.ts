import { Request, Response } from 'express';
import { IUserData } from '../interfaces/User';
import { User } from '../entities/User';
import { UsersBody } from '../body/usersBody';


class UsersController {
	async create(request: Request, response: Response): Promise<Response> {
		const { email, name, password, user_name }: IUserData = request.body;

		const usersbody = new UsersBody();

		const user = await usersbody.create({ email, name, password, user_name });
		if (user){
			const responseData = cleanUser(user);
			return response.json(responseData);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'Email already taken' });
		}
		
	}

	
}

function cleanUser(user: User) {
	const { email, name,user_name, createdAt } = user;
	return { email, name,user_name, createdAt };
}

export { UsersController };