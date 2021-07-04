import { Request, Response } from 'express';
import { Family } from '../entities/Family';
import { FamilyBody } from '../body/FamilysBody';
import { IFamilyData } from '../interfaces/family';


class FamilyController {
	async create(request: Request, response: Response): Promise<Response> {
		const {name,family_owner}: IFamilyData = request.body;

		const familybody = new FamilyBody();

		const family = await familybody.create({name,family_owner});
		if (family){
			const responseData = cleanFamily(family);
			return response.json(responseData);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'Item alredy exist' });
		}
		
	}

	async list(request: Request, response: Response): Promise<Response>{
		const familybody = new FamilyBody();
		return response.json(await familybody.listItems());
	}

	
}

function cleanFamily(family: Family) {
	const {name,family_owner} = family;
	return {name,family_owner};
}

export { FamilyController };