import { Request, Response } from 'express';
import { Family } from '../entities/Family';
import { FamilyBody } from '../body/FamilysBody';
import { IFamilyData } from '../interfaces/family';


class FamilyController {
	async create(request: Request, response: Response): Promise<Response> {
		const {name,user}: IFamilyData = request.body;

		const familybody = new FamilyBody();

		const family2 = await familybody.create({name,user});
		if (family2){
			const responseData = cleanFamily(family2);
			return response.json(responseData);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'Family alredy exist' });
		}
		
	}

	async list(request: Request, response: Response): Promise<Response>{
		const familybody = new FamilyBody();
		return response.json(await familybody.listItems());
	}

	
}

function cleanFamily(family2: Family) {
	const {name,user} = family2;
	return {name,user};
}

export { FamilyController };