import {
	SpecsBackend,
	transformSpecsData,
} from '@adapters/specifications.adapter';
import axios from 'axios';

export const fetchSpecificationsByCategoryId = async (categoryId: string) => {
	try {
		const response = await axios.get<SpecsBackend[]>(
			import.meta.env.VITE_API_URL + `/specifications/category/${categoryId}`,
		);
		return response.data.map(transformSpecsData);
	} catch (error) {
		console.error('Error al buscar especificaciones por categoria', error);
		throw error;
	}
};
