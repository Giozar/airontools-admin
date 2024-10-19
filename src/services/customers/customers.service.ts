import { airontoolsAPI } from '@configs/api.config';
import {
	CreateCustomer,
	Customer,
	UpdateCustomer,
} from '@interfaces/Customer.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

// Crear un nuevo cliente
export async function createCustomerService(customer: CreateCustomer) {
	try {
		const response = await axios.post(`${airontoolsAPI}/customers`, customer);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener todos los clientes
export async function getAllCustomersService() {
	try {
		const response = await axios.get(`${airontoolsAPI}/customers`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener clientes por ID de empresa
export async function getCustomersByCustomerIdService(companyId: string) {
	try {
		const response = await axios.get(
			`${airontoolsAPI}/customers/company/${companyId}`,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

export async function searchCustomersService(
	searchTerm: string,
	limit: number = 10,
	offset: number = 0,
): Promise<Customer[]> {
	try {
		const response = await axios.post<Customer[]>(
			`${airontoolsAPI}/customers/search?limit=${limit}&offset=${offset}`,
			{
				keywords: searchTerm,
			},
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener un cliente por ID
export async function getCustomerByIdService(id: string) {
	try {
		const response = await axios.get(`${airontoolsAPI}/customers/${id}`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Actualizar un cliente por ID
export async function updateCustomerService(
	id: string,
	updateCustomerDto: Partial<UpdateCustomer>,
) {
	try {
		const response = await axios.patch(
			`${airontoolsAPI}/customers/${id}`,
			updateCustomerDto,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Eliminar un cliente por ID
export async function deleteCustomerService(id: string) {
	try {
		const response = await axios.delete(`${airontoolsAPI}/customers/${id}`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
