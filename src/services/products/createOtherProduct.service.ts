import { airontoolsAPI } from '@configs/api.config';
import { OtherProduct } from '@interfaces/OtherProduct.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

// Crear un "other-product"
export async function createOtherProductService(otherProduct: OtherProduct) {
	try {
		const response = await axios.post(
			`${airontoolsAPI}/products/other-product`,
			otherProduct,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
