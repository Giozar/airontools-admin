import { transformProductDataToFrontend } from '@adapters/products.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	ProductDataBackend,
	ProductDataFrontend,
} from '@interfaces/Product.interface';
import { errorHandler } from '@utils/errorHandler.util';

import axios from 'axios';

export const getproductsByFamilyIdService = async (
	familyId: string,
): Promise<ProductDataFrontend[]> => {
	try {
		const response = await axios.get<ProductDataBackend[]>(
			airontoolsAPI + `/products/family/${familyId}`,
		);
		const products = response.data;
		return products.map(product => transformProductDataToFrontend(product));
	} catch (error) {
		console.error('Error al buscar productos por familia', error);
		throw errorHandler(error);
	}
};

export const getproductsByCategoryIdService = async (
	categoryId: string,
): Promise<ProductDataFrontend[]> => {
	try {
		const response = await axios.get<ProductDataBackend[]>(
			airontoolsAPI + `/products/category/${categoryId}`,
		);
		const products = response.data;
		return products.map(product => transformProductDataToFrontend(product));
	} catch (error) {
		console.error('Error al buscar productos por categoría', error);
		throw errorHandler(error);
	}
};

export const getproductsBySubcategoryIdService = async (
	subcategoryId: string,
): Promise<ProductDataFrontend[]> => {
	try {
		const response = await axios.get<ProductDataBackend[]>(
			airontoolsAPI + `/products/subcategory/${subcategoryId}`,
		);
		const products = response.data;
		return products.map(product => transformProductDataToFrontend(product));
	} catch (error) {
		console.error('Error al buscar productos por subcategoría', error);
		throw errorHandler(error);
	}
};
