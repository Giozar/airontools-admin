import { airontoolsAPI } from '@configs/api.config';
import axios from 'axios';

export const updateProduct = async (productId: string) => {
	try {
		const response = await axios.patch(
			airontoolsAPI + `/products/${productId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error al buscar especificaciones por categoria', error);
		throw error;
	}
};
