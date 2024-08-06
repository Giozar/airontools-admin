import { transformSpecDataToFrontend } from '@adapters/specifications.adapter';
import { SpecDataBackend } from '@interfaces/Specifications.interface';
import axios from 'axios';

export const fetchSpecificationsByCategoryId = async (categoryId: string) => {
	try {
		const response = await axios.get<SpecDataBackend[]>(
			import.meta.env.VITE_API_URL + `/specifications/category/${categoryId}`,
		);
		return response.data.map(transformSpecDataToFrontend);
	} catch (error) {
		console.error('Error al buscar especificaciones por categoria', error);
		throw error;
	}
};
