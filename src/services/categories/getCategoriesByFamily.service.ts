// src/services/categoryApiService.ts

import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { CategoryDataBackend } from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const getCategoriesByFamilyIdService = async (familyId: string) => {
	try {
		const response = await axios.get<CategoryDataBackend[]>(
			`${API_URL}/categories?family=${familyId}`,
		);
		const categories = response.data;
		return categories.map(category =>
			transformCategoryDataToFrontend(category),
		);
	} catch (error) {
		throw errorHandler(error);
	}
};
