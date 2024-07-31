import axios from 'axios';

export const fetchSpecificationsByCategoryId = async (categoryId: string) => {
	try {
		const response = await axios.get(
			import.meta.env.VITE_API_URL + `/specifications/category/${categoryId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error al buscar especificaciones por categoria', error);
		throw error;
	}
};
