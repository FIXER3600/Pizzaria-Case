import { order } from './../../model/Order';
import { OrderDatabase } from "../../data/Order/OrderDatabase";
import { PizzaDatabase } from "../../data/Pizza/PizzaDatabase";
import { CustomError } from "../../error/CustomError";
import { Order, OrderInputDTO } from "../../model/Order";
import { Authenticator } from "../../services/Authenticator";
import { OrderRepository } from "./OrderRepository";
import { ItemDatabase } from '../../data/Item/ItemDatabase';

export class OrderBusiness implements OrderRepository{
	constructor(
		private orderDatabase: OrderDatabase,
		private pizzaDatabase:PizzaDatabase,
		private itemDatabase: ItemDatabase,
		private authenticator: Authenticator,
	      ) {}

	async create(input: OrderInputDTO,token:string): Promise<void> {
		try {
			if (!token) {
				throw new CustomError(401,"Por favor, passe o token no header da requisição");
			}
			const {itemId}=input
			if(!itemId){
				throw new CustomError(400,"Por favor, é necessário que se tenha o item para criar um pedido");
			}
			
			const userId=this.authenticator.getData(token)
			const pizzaId= await this.itemDatabase.getPizzaIdByItem(itemId)
			const price= await this.pizzaDatabase.getPriceByItem(pizzaId)	
			const quantity=await this.itemDatabase.getQuantity(itemId)
			const id=await this.itemDatabase.getOrderId()
			
			const{order_id}=id
			
			
			const createdAt=new Date()
			const order:order={
				id:order_id,
				userId:userId.id,
				itemId,
				total:Number(price) * Number(quantity),
				createdAt
			}
			
			await this.orderDatabase.create(order)
		}catch (error: any) {
			throw new Error(error.sqlMessage || error.message)
		      }
	}
	async getAll(token:string): Promise<Order[] | []> {
	    try {
		if (!token) {
			throw new CustomError(401,"Por favor, passe o token no header da requisição");
		}
		const orders=await this.orderDatabase.getAll()
		if (!orders) {
				throw new CustomError(404,"Sem pedidos realizados por enquanto...");
		}
		return orders
	    } catch (error: any) {
		throw new Error(error.sqlMessage || error.message)
	      }
	}
	async getById(id: string,token:string): Promise<Order> {
	    try {
		if (!token) {
			throw new CustomError(401,"Por favor, passe o token no header da requisição");
		}
		const order=await this.orderDatabase.getById(id)
		if (!order) {
			throw new CustomError(404,"Id inválido ou Pedido não encontrado");
			
		}
		return order
	    } catch (error: any) {
		throw new Error(error.sqlMessage || error.message)
	      }
	}
}