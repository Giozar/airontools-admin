import { transformProductDataToFrontend } from '@adapters/products.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	ProductDataBackend,
	ProductDataFrontend,
} from '@interfaces/Product.interface';
import { Search } from '@interfaces/Search.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const searchProductsService = async (
	search: Search,
	limit: number = 10,
	offset: number = 0,
): Promise<ProductDataFrontend[]> => {
	try {
		const response = await axios.post<ProductDataBackend[]>(
			`${API_URL}/products/search?limit=${limit}&offset=${offset}`,
			{ keywords: search },
		);
		return response.data.map(transformProductDataToFrontend);
	} catch (error) {
		throw errorHandler(error);
	}
};
