import { airontoolsAPI } from '@configs/api.config';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import axios from 'axios';

export const fetchSpecificationsByCategoryId = async (categoryId: string) => {
	try {
		const response = await axios.get<SpecDataToSend[]>(
			airontoolsAPI + `/specifications/category/${categoryId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error al buscar especificaciones por categoria', error);
		throw error;
	}
};
