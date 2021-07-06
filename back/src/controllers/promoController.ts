import { Request, response, Response } from 'express';
import { PromoBody } from '../body/PromoBody';
import { Promo } from '../entities/promo';
import { IPromoData } from '../interfaces/Promo';

class PromoController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, min_num, promo_perc, prod }: IPromoData = request.body;

        const pb = new PromoBody()

		const pro = await pb.create({ name, min_num, promo_perc, prod });
		if (pro){
			const responseData = cleanPromo(pro);
			return response.json(responseData);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'Promo already exist' });
		}
    }

    async list(request: Request, response: Response): Promise<Response> {
        const pb = new PromoBody()
        return response.json(await pb.listP())
    }

    
}

function cleanPromo(product: Promo) {
	const { name, min_num, promo_perc, prod } = product;
	return { name, min_num, promo_perc, prod };
}
export { PromoController }