import { Request, Response } from 'express';
import { IUserData } from '../interfaces/User';
import { User } from '../entities/User';
import { UsersBody } from '../body/UsersBody';


class UsersController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, user_name, email, password }: IUserData = request.body;

		const usersbody = new UsersBody();

		const user = await usersbody.create({ email, name, password, user_name });
		if (user){
			const responseData = cleanUser(user);
			return response.json(responseData);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'username already taken' });
		}
		
	}

	async list(request: Request, response: Response): Promise<Response>{
		const usersbody = new UsersBody();
		return response.json(await usersbody.listUsers());
	}

	
}

function cleanUser(user: User) {
	const { email, name,user_name, createdAt,family,shoppingitems } = user;
	return { email, name,user_name, createdAt,family,shoppingitems };
}

export { UsersController };