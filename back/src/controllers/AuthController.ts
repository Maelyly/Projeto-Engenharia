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
				.send({ message: 'Incorrect user_name or password' });
		}

		return response.json({ token });
	}

	async check(request: Request, response: Response): Promise<Response> {
		const { token } = request.body;
		const authBody = new AuthBody();
		let user = await authBody.checkToken(token);
		if (user === null) return response.status(403)
		user = user.user_name
		return response.json({ user })
	}
}

export { AuthController };