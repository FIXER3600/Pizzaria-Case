import { Item, item } from "../../model/Item";
import { BaseDatabase } from "../BaseDatabase";
import { IItemDatabase } from "./IItemDatabase";

export class ItemDatabase extends BaseDatabase implements IItemDatabase{
	private static TABLE_NAME = 'Item'
	async create(item: item): Promise<void> {
	    try {
		await this.getConnection()
		.insert({
			id:item.id,
			pizza_id:item.pizzaId,
			quantity:item.quantity
		}).into(ItemDatabase.TABLE_NAME)
	    } catch (error: any) {
		throw new Error(error.sqlMessage || error.message)
	      }
	}
	async getQuantity(itemId: string): Promise<void> {
	    try {
		const result = await this.getConnection()
		.select("quantity")
		.from(ItemDatabase.TABLE_NAME)
		.where('id',itemId)
		
		const {quantity}=result[0]
		return quantity
	    } catch (error: any) {
		throw new Error(error.sqlMessage || error.message)
	      }
	}
	async getPizzaIdByItem(itemId:string):Promise<string>{
		try {
		const pizzaId=await this.getConnection()
		.select("pizza_id")
		.from(ItemDatabase.TABLE_NAME)
		.where("id",itemId)
		const {pizza_id}=pizzaId[0]
	
		
		return pizza_id
		} catch (error: any) {
			throw new Error(error.sqlMessage || error.message)
		      }
	}
	async deleteItem(itemId: string): Promise<void> {
	    try {
		await this.getConnection()
		.from(ItemDatabase.TABLE_NAME)
		.where('id',itemId)
		.del()
	    } catch (error: any) {
		throw new Error(error.sqlMessage || error.message)
	      }
	}
	async getById(itemId: string): Promise<Item> {
	    try{
		const result = await this.getConnection()
		.select('*')
		.from(ItemDatabase.TABLE_NAME)
		.where('id',itemId)
		return Item.toItemModel(result[0])
	    }catch(error:any){
		throw new Error(error.sqlMessage || error.message)
	    }
	}
}