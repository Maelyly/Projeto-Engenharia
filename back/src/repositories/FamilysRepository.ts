import { EntityRepository, Repository } from 'typeorm';
import { Family } from '../entities/Family';

@EntityRepository(Family)
class FamilyRepository extends Repository<Family> {}

export { FamilyRepository };