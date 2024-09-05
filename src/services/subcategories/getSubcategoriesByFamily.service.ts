// src/services/subcategoryApiService.ts

import { airontoolsAPI } from '@configs/api.config';
import { SubcategoryDataBackend } from '@interfaces/subcategory.interface';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const getSubcategoriesByFamilyService = async (categoryId: string) => {
	try {
		const response = await axios.get<SubcategoryDataBackend[]>(
			`${API_URL}/subcategories?category=${categoryId}`,
		);
		return response.data;
	} catch (error) {
		throw new Error('Error al cargar las subcategorías: ' + error);
	}
};
