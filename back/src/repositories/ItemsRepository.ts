import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../entities/Item';

@EntityRepository(Item)
class ItemRepository extends Repository<Item> {}

export { ItemRepository };