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
		const Subcategory = response.data;
		return Subcategory.map(product =>
			transformSubcategoryDataToFrontend(product),
		);
	} catch (error) {
		console.error('Error al buscar subcategoria por familia', error);
		throw errorHandler(error);
	}
};

export const getSubcategoryBySubcategoryIdService = async (
	SubcategoryId: string,
): Promise<SubcategoryDataFrontend[]> => {
	try {
		const response = await axios.get<SubcategoryDataBackend[]>(
			airontoolsAPI + `/subcategories/category/${SubcategoryId}`,
		);
		const Subcategory = response.data;
		return Subcategory.map(product =>
			transformSubcategoryDataToFrontend(product),
		);
	} catch (error) {
		console.error('Error al buscar subcategoria por categoría', error);
		throw errorHandler(error);
	}
};
