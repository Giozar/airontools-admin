import { transformSpecDataToFrontend } from '@adapters/specifications.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { SpecDataBackend } from '@interfaces/Specifications.interface';
import axios from 'axios';

export const fetchSpecificationsByCategoryId = async (categoryId: string) => {
	try {
		const response = await axios.get<SpecDataBackend[]>(
			airontoolsAPI + `/specifications/category/${categoryId}`,
		);
		return response.data.map(transformSpecDataToFrontend);
	} catch (error) {
		console.error('Error al buscar especificaciones por categoria', error);
		throw error;
	}
};
