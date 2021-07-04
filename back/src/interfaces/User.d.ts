import { Family } from "../entities/Family";

export interface IUserData {
	email: string;
	password: string;
	name: string;
	user_name: string;
	family: Family;
	shoppinglist:ShoppingList;
	shoppingitems: ShoppingItem[];
}