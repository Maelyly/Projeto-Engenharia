import { Request, Response } from 'express';
import { AuthBody } from '../body/AuthBody';

class AuthController {
	async login(request: Request, response: Response): Promise<Response> {
		const { user_name, password } = request.body;

		const authBody = new AuthBody();

		const token = await authBody.authenticate(user_name, password);

		if (!token) {
			return response
				.status(403)
				.send({ message: 'Incorrect email or password' });
		}

		return response.json({ token });
	}
}

export { AuthController };