import { Request, Response } from 'express';
import { Family } from '../entities/Family';
import { FamilyBody } from '../body/FamilysBody';
import { IFamilyData } from '../interfaces/Family';
import { IUserData } from '../interfaces/User';



class FamilyController {
	async create(request: Request, response: Response): Promise<Response> {
		const {name}: IFamilyData = request.body;

		const familybody = new FamilyBody();

		const family2 = await familybody.create({name});
		if (family2){
			//const responseData = cleanFamily(family2);
			return response.json(family2);
		}
		else{
			return response
				   .status(401)
				   .send({ message: 'Family alredy exist' });
		}
		
	}

	async list(request: Request, response: Response): Promise<Response>{
		const familybody = new FamilyBody();
		return response.json(await familybody.listfamily());
	}
   
	async adduser(request: Request, response: Response): Promise<Response>{
		const { user,id } = request.body;
		const familybody = new FamilyBody();
		return response.json(await familybody.addToFamily(id,user));
	}
	async returnfamily(request: Request, response: Response): Promise<Response>{
		const { id } = request.body;
		const familybody = new FamilyBody();
		return response.json(await familybody.returnFamily(id));
	}
}

function cleanFamily(family2: Family) {
	const {name,user} = family2;
	return {name,user};
}

export { FamilyController };