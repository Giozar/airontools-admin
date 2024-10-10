import { airontoolsAPI } from '@configs/api.config';
import {
	CreateOtherProduct,
	OtherProduct,
	UpdateOtherProduct,
} from '@interfaces/OtherProduct.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

// Crear un "other-product"
export async function createOtherProductService(
	otherProduct: CreateOtherProduct,
) {
	try {
		const response = await axios.post(
			`${airontoolsAPI}/other-products`,
			otherProduct,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener todos los "other-products"
export async function getAllOtherProductsService() {
	try {
		const response = await axios.get(`${airontoolsAPI}/other-products`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener un "other-product" por ID
export async function getOtherProductByIdService(id: string) {
	try {
		const response = await axios.get(`${airontoolsAPI}/other-products/${id}`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Actualizar un "other-product" por ID
export async function updateOtherProductService(
	id: string,
	updateOtherProductDto: UpdateOtherProduct,
) {
	try {
		const response = await axios.patch(
			`${airontoolsAPI}/other-products/${id}`,
			updateOtherProductDto,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Eliminar un "other-product" por ID
export async function deleteOtherProductService(id: string) {
	try {
		const response = await axios.delete(
			`${airontoolsAPI}/other-products/${id}`,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener todos los "other-products" por marca (brand)
export async function getOtherProductsByBrandService(brand: string) {
	try {
		const response = await axios.get<OtherProduct[]>(
			`${airontoolsAPI}/other-products/brand/${brand}`,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
