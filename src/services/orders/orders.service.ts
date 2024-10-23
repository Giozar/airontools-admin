import { airontoolsAPI } from '@configs/api.config';
import { CreateOrder, Order, UpdateOrder } from '@interfaces/Order.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

// Crear una nueva orden
export async function createOrderService(order: CreateOrder) {
	// Hacer una copia del objeto para evitar mutaciones no deseadas
	const orderData = { ...order };

	// Si la propiedad `company` es null o undefined, la eliminamos del objeto
	if (!orderData.company) {
		// `== null` cubre ambos casos: null y undefined
		delete orderData.company;
	}

	try {
		const response = await axios.post(`${airontoolsAPI}/orders`, orderData);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener todas las órdenes
export async function getAllOrdersService() {
	try {
		const response = await axios.get<Order[]>(`${airontoolsAPI}/orders`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Búsqueda de ordenes
// Order search service
export const searchOrdersServices = async (
	searchTerm: string,
	limit: number = 10,
	offset: number = 0,
): Promise<Order[]> => {
	try {
		const response = await axios.post<Order[]>(
			`${airontoolsAPI}/orders/search?limit=${limit}&offset=${offset}`,
			{
				keywords: searchTerm,
			},
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
};

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

export async function uploadOrderUrlImagesService({
	orderId,
	imageUrl,
}: {
	orderId: string;
	imageUrl: string;
}) {
	try {
		const orderUpdated = await axios.patch(
			airontoolsAPI + '/orders/' + orderId,
			{
				imageUrl,
			},
		);
		return orderUpdated;
	} catch (error) {
		errorHandler(error);
	}
}
