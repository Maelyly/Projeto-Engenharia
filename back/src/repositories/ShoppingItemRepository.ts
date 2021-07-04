import { EntityRepository, Repository } from 'typeorm';
import { ShoppingItem } from '../entities/ShoppingItem';

@EntityRepository(ShoppingItem)
class ShoppingItemRepository extends Repository<ShoppingItem> {}

export { ShoppingItemRepository };