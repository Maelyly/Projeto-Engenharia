import { EntityRepository, Repository } from 'typeorm';
import { Promo } from '../entities/promo';

@EntityRepository(Promo)
class PromoRepository extends Repository<Promo> {}

export { PromoRepository };