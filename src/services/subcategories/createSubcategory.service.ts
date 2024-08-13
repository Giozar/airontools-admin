// services/subcategoryService.ts
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatString } from '@utils/formatString.utils';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/subcategories';

export async function createSubcategoryService(
	subcategoryData: SubcategoryDataToSend,
) {
	try {
		const response = await axios.post(API_URL, {
			...subcategoryData,
			path: formatString(subcategoryData.name),
		});
		return response.data;
	} catch (error) {
		errorHandler(error);
	}
}
