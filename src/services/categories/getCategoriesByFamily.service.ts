// src/services/categoryApiService.ts

import { airontoolsAPI } from '@configs/api.config';
import { CategoryDataBackend } from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const getCategoriesFromFamilyService = async (familyId: string) => {
	try {
		const response = await axios.get<CategoryDataBackend[]>(
			`${API_URL}/categories?family=${familyId}`,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
};
