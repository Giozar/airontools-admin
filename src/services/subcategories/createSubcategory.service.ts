// services/subcategoryService.ts
import { airontoolsAPI } from '@configs/api.config';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatPathName } from '@utils/formatPathName.utils';
import axios from 'axios';

const API_URL = airontoolsAPI + '/subcategories';

export async function createSubcategoryService(
	subcategoryData: SubcategoryDataToSend,
) {
	try {
		const response = await axios.post(API_URL, {
			...subcategoryData,
			path: formatPathName(subcategoryData.name || ''),
		});
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
