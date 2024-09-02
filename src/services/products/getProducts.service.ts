import { transformProductDataToFrontend } from '@adapters/products.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	ProductDataBackend,
	ProductDataFrontend,
} from '@interfaces/Product.interface';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const getProductsService = async (): Promise<ProductDataFrontend[]> => {
	try {
		const response = await axios.get<ProductDataBackend[]>(
			`${API_URL}/products`,
		);
		return response.data.map(transformProductDataToFrontend);
	} catch (error) {
		throw new Error('Error al cargar los productos: ' + error);
	}
};
