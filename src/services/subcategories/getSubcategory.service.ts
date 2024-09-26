import { transformSubcategoryDataToFrontend } from '@adapters/subcategory.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const getSubcategoryService = async (subcategoryId: string) => {
	try {
		const response = await axios.get(
			`${API_URL}/subcategories/${subcategoryId}`,
		);

		return transformSubcategoryDataToFrontend(response.data);
	} catch (error) {
		console.log(`${API_URL}/subcategories/${subcategoryId}`);
		errorHandler(error);
	}
};
