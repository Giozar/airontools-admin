import { transformSubcategoryDataToFrontend } from '@adapters/subcategory.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	SubcategoryDataBackend,
	SubcategoryDataFrontend,
} from '@interfaces/subcategory.interface';

import axios from 'axios';

export const getSubcategoryByFamilyId = async (
	familyId: string,
): Promise<SubcategoryDataFrontend[]> => {
	try {
		const response = await axios.get<SubcategoryDataBackend[]>(
			airontoolsAPI + `/Subcategory/family/${familyId}`,
		);
		const Subcategory = response.data;
		return Subcategory.map(product =>
			transformSubcategoryDataToFrontend(product),
		);
	} catch (error) {
		console.error('Error al buscar subcategoria por familia', error);
		throw error;
	}
};

export const getSubcategoryBySubcategoryId = async (
	SubcategoryId: string,
): Promise<SubcategoryDataFrontend[]> => {
	try {
		const response = await axios.get<SubcategoryDataBackend[]>(
			airontoolsAPI + `/Subcategory/Subcategory/${SubcategoryId}`,
		);
		const Subcategory = response.data;
		return Subcategory.map(product =>
			transformSubcategoryDataToFrontend(product),
		);
	} catch (error) {
		console.error('Error al buscar subcategoria por categoría', error);
		throw error;
	}
};
