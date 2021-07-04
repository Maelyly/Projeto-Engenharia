import { Router } from 'express';
import { UsersController } from './controllers/usersController';
import { AuthController } from './controllers/AuthController';
import { ItemsController } from './controllers/itemsController';
import { ProductsController } from './controllers/productsController';
import './database';
import { ShoppingListController } from './controllers/ShoppingListController';
import { ShoppingItemController } from './controllers/ShoppingItemController';

const routes = Router();

const usersController = new UsersController();
const authController = new AuthController();
const itemsController = new ItemsController();
const productsController = new ProductsController();
const shoppinglistController = new ShoppingListController();
const shoppingitemController = new ShoppingItemController();

routes.get('/', (request, response) => {
	return response.json({
		message: 'Hello World from SERVER!',
	});
});

routes.post('/create/user', usersController.create);
routes.get('/users', usersController.list);
routes.post('/auth/login', authController.login);
routes.post('/items', itemsController.create);
routes.get('/items', itemsController.list);
routes.post('/products', productsController.create);
routes.get('/products', productsController.list);
routes.post('/shoppinglist', shoppinglistController.create);
routes.get('/shoppinglist', shoppinglistController.list);
routes.post('/shoppingitem', shoppingitemController.create);
routes.get('/shoppingitem', shoppingitemController.list);
export { routes };
