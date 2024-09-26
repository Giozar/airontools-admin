// src/services/subcategoryApiService.ts

import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const deleteSubcategoryService = async (subcategoryId: string) => {
	try {
		await axios.delete(`${API_URL}/subcategories/${subcategoryId}`);
	} catch (error) {
		throw errorHandler(error);
	}
};
