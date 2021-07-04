import { EntityRepository, Repository } from 'typeorm';
import { ShoppingList } from '../entities/ShoppingList';


@EntityRepository(ShoppingList)
class ShoppingListRepository extends Repository<ShoppingList> {}

export { ShoppingListRepository };