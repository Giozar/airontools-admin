import { airontoolsAPI } from '@configs/api.config';
import { CreateOrder, UpdateOrder } from '@interfaces/Order.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

// Crear una nueva orden
export async function createOrderService(order: CreateOrder) {
	try {
		const response = await axios.post(`${airontoolsAPI}/orders`, order);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener todas las órdenes
export async function getAllOrdersService() {
	try {
		const response = await axios.get(`${airontoolsAPI}/orders`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener una orden por ID
export async function getOrderByIdService(id: string) {
	try {
		const response = await axios.get(`${airontoolsAPI}/orders/${id}`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Actualizar una orden por ID
export async function updateOrderService(
	id: string,
	updateOrderDto: Partial<UpdateOrder>,
) {
	try {
		const response = await axios.patch(
			`${airontoolsAPI}/orders/${id}`,
			updateOrderDto,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Eliminar una orden por ID
export async function deleteOrderService(id: string) {
	try {
		const response = await axios.delete(`${airontoolsAPI}/orders/${id}`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
