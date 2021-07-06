import { getConnection, getCustomRepository, Repository } from 'typeorm';
import { Item } from '../entities/Item';
import { Promo } from '../entities/promo';
import { ShoppingItem } from '../entities/ShoppingItem';
import { PromoRepository } from '../repositories/PromoRepository';
import { ShoppingItemRepository } from '../repositories/ShoppingItemRepository';
import { ItemsBody } from './ItemsBody';
import { ShoppingListBody } from './ShoppingListBody';
import { UsersBody } from './UsersBody';

class PromoBody {
    private promoRepository: Repository<Promo>;
    constructor(){
        this.promoRepository = getCustomRepository(PromoRepository)
    }





}