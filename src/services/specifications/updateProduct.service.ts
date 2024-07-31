import axios from 'axios';

export const updateProduct = async (productId: string) => {
	try {
		const response = await axios.patch(
			import.meta.env.VITE_API_URL + `/products/${productId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error al buscar especificaciones por categoria', error);
		throw error;
	}
};
