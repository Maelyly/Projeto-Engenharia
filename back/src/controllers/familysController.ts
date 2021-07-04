import { Request, Response } from 'express';
import { Family } from '../entities/Family';
import { FamilyBody } from '../body/FamilysBody';
import { IFamilyData } from '../interfaces/family';


class FamilyController {
	async create(request: Request, response: Response): Promise<Response> {
		const {name,family}: IFamilyData = request.body;

		const familybody = new FamilyBody();

		const family2 = await familybody.create({name,family});
		if (family2){
			const responseData = cleanFamily(family2);
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

function cleanFamily(family2: Family) {
	const {name,family} = family2;
	return {name,family};
}

export { FamilyController };