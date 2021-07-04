export interface IShoppingListData {
	total_expenses: number;
    owner: User;
    month: number;
    year: number;
    shoppingitems: ShoppingItem[];
}