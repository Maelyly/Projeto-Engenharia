import { Router } from 'express';
import { UsersController } from './controllers/usersController';
import { AuthController } from './controllers/AuthController';
import { ItemsController } from './controllers/itemsController';
import { ProductsController } from './controllers/productsController';
import './database';
import { ShoppingListController } from './controllers/shoppingListController';
import { ShoppingItemController } from './controllers/shoppingItemController';
import { PromoController } from './controllers/promoController';

const routes = Router();

const usersController = new UsersController();
const authController = new AuthController();
const itemsController = new ItemsController();
const productsController = new ProductsController();
const slc = new ShoppingListController()
const sic = new ShoppingItemController()
const pc = new PromoController()

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
routes.post('/getproducts', productsController.getProduct);
routes.get('/sl', slc.list)
routes.post('/sl', slc.create)
routes.post('/getsl',slc.getList)
routes.get('/silist', sic.list)
routes.post('/si', sic.create)
routes.post('/slo', slc.showOwner)
routes.post('/loadsl',slc.loadSL)
routes.post('/loadsi',sic.loadSI)
routes.post('/additem', sic.addItem)
routes.post('/getsl', slc.getList)
routes.post('/create/promo', pc.create)
routes.get('/promo',pc.list)
routes.post('/getItem',itemsController.goc)
routes.post('/removesi',sic.removeById)
routes.post('/removei',sic.removeItem)


export { routes };
