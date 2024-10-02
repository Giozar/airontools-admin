import { transformSubcategoryDataToFrontend } from '@adapters/subcategory.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	SubcategoryDataBackend,
	SubcategoryDataFrontend,
} from '@interfaces/subcategory.interface';
import { errorHandler } from '@utils/errorHandler.util';

import axios from 'axios';

export const getSubcategoryByFamilyIdService = async (
	familyId: string,
): Promise<SubcategoryDataFrontend[]> => {
	try {
		const response = await axios.get<SubcategoryDataBackend[]>(
			airontoolsAPI + `/subcategories/family/${familyId}`,
		);
		const subcategories = response.data;
		return subcategories.map(subcategory =>
			transformSubcategoryDataToFrontend(subcategory),
		);
	} catch (error) {
		console.error('Error al buscar subcategoria por familia', error);
		throw errorHandler(error);
	}
};

export const getSubcategoryByCategoryIdService = async (
	categoryId: string,
): Promise<SubcategoryDataFrontend[]> => {
	try {
		const response = await axios.get<SubcategoryDataBackend[]>(
			airontoolsAPI + `/subcategories/category/${categoryId}`,
		);
		const subcategories = response.data;
		return subcategories.map(subcategory =>
			transformSubcategoryDataToFrontend(subcategory),
		);
	} catch (error) {
		console.error('Error al buscar subcategoria por categoría', error);
		throw errorHandler(error);
	}
};
