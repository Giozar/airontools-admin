// src/services/subcategoryApiService.ts

import { transformSubcategoryDataToFrontend } from '@adapters/subcategory.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	SubcategoryDataBackend,
	SubcategoryDataFrontend,
} from '@interfaces/subcategory.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const getSubcategoriesService = async (): Promise<
	SubcategoryDataFrontend[]
> => {
	try {
		const response = await axios.get<SubcategoryDataBackend[]>(
			`${API_URL}/subcategories`,
		);
		return response.data.map(transformSubcategoryDataToFrontend);
	} catch (error) {
		throw errorHandler(error);
	}
};
