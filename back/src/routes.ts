import { Router } from 'express';
import { ItemsController } from './controllers/itemsController';
import { ProductsController } from './controllers/productsController copy';
import { UsersController } from './controllers/usersController';

import './database';

const routes = Router();

const usersController = new UsersController();
const itemsController = new ItemsController();
const productsController = new ProductsController();

routes.get('/', (request, response) => {
	return response.json({
		message: 'Hello World from SERVER!',
	});
});

routes.post('/users', usersController.create);
routes.get('/users', usersController.list);

routes.post('/items', itemsController.create);
routes.get('/items', itemsController.list);

routes.post('/products', productsController.create);
routes.get('/products', productsController.list);

export { routes };
