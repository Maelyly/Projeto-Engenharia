import { getCustomRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { Promo } from '../entities/promo';
import { IPromoData } from '../interfaces/Promo';
import { PromoRepository } from '../repositories/PromoRepository';
import { ProductsBody } from './ProductsBody';

class PromoBody {
    private promoRepository: Repository<Promo>;
    constructor(){
        this.promoRepository = getCustomRepository(PromoRepository)
    }


    async create(ipromoData: IPromoData){
        const { name, min_num, promo_perc, prod } = ipromoData
        const pb = new ProductsBody()
        const p = await pb.findByProductName(prod)

        if(!p) return false
        const promo = this.promoRepository.create({name, min_num, promo_perc, prod:p})
        try {
            await this.promoRepository.save(promo)
        } catch (error) {
            console.log('deu ruim pra salvar erro abaixo')
            console.log(error)
        }
        
        return promo
    }

    async getPromotionByProduct(prod:Product){
        if(!prod) return false
        const promotion = await this.promoRepository.findOne({prod})
        return promotion
    }


    async listP(){
		const ret = await this.promoRepository.query(`SELECT * FROM promotion`);
        console.log(ret)
        return ret
	}

}

export { PromoBody };