import { airontoolsAPI } from '@configs/api.config';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const deleteProductService = async (product: ProductDataFrontend) => {
	try {
		await axios.delete(`${API_URL}/products/${product.id}`);
		return `El producto ${product.name} (${product.id}) ha sido eliminado correctamente.`;
	} catch (error) {
		throw errorHandler(error);
	}
};
