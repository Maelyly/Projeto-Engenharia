import { Router } from 'express';
import { UsersController } from './controllers/usersController';
import { AuthController } from './controllers/AuthController';
import { ItemsController } from './controllers/itemsController';
import { ProductsController } from './controllers/productsController';
import './database';
import { ShoppingListController } from './controllers/shoppingListController';
import { ShoppingItemController } from './controllers/shoppingItemController';
import { FamilyController } from './controllers/familysController';

const routes = Router();

const usersController = new UsersController();
const authController = new AuthController();
const itemsController = new ItemsController();
const productsController = new ProductsController();
const shoppingitem = new ShoppingItemController()
const family = new FamilyController();

routes.get('/', (request, response) => {
	return response.json({
		message: 'Hello World from SERVER!',
	});
});

routes.post('/create/user', usersController.create);
routes.get('/users', usersController.list);
routes.post('/token', authController.check);
routes.post('/auth/login', authController.login);
routes.post('/items', itemsController.create);
routes.get('/items', itemsController.list);
routes.post('/products', productsController.create);
routes.get('/products', productsController.list);
routes.get('/listbyyear',shoppingitem.listbyyear);
routes.get('/listbymonth',shoppingitem.listbymonth);
routes.get('/family',family.list)
routes.post('/family',family.create)
routes.post('/family/adduser',family.adduser)


export { routes };
