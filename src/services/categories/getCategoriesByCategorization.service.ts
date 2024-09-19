import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	CategoryDataBackend,
	CategoryDataFrontend,
} from '@interfaces/Category.interface';

import axios from 'axios';

export const getcategoryByFamilyId = async (
	familyId: string,
): Promise<CategoryDataFrontend[]> => {
	try {
		const response = await axios.get<CategoryDataBackend[]>(
			airontoolsAPI + `/categories/family/${familyId}`,
		);
		const category = response.data;
		return category.map(product => transformCategoryDataToFrontend(product));
	} catch (error) {
		console.error('Error al buscar categorias por familia', error);
		throw error;
	}
};
