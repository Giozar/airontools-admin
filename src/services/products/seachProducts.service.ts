// Product search service
import { airontoolsAPI } from '@configs/api.config';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export const searchProductsService = async (
	searchTerm: string,
	limit: number = 10,
	offset: number = 0,
): Promise<ProductDataFrontend[]> => {
	try {
		const response = await axios.post<ProductDataFrontend[]>(
			`${airontoolsAPI}/products/search?limit=${limit}&offset=${offset}`,
			{
				keywords: searchTerm,
			},
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
};
