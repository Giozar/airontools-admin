import { transformProductDataToFrontend } from '@adapters/products.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	ProductDataBackend,
	ProductDataFrontend,
} from '@interfaces/Product.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const getProductService = async ({
	id,
}: {
	id: string;
}): Promise<ProductDataFrontend> => {
	try {
		const response = await axios.get<ProductDataBackend>(
			`${API_URL}/products/${id}`,
		);
		return transformProductDataToFrontend(response.data);
	} catch (error) {
		errorHandler(error);
		throw new Error('Error al cargar el producto: ' + error);
	}
};