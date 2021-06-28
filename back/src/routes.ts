import { Router } from 'express';
import { UsersController } from './controllers/usersController';

import './database';

const routes = Router();

const usersController = new UsersController();

routes.get('/', (request, response) => {
	return response.json({
		message: 'Hello World from SERVER!',
	});
});

routes.post('/users', usersController.create);
routes.get('/users', usersController.list);


export { routes };
