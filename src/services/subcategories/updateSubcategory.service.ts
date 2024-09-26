// services/subcategoryService.ts
import { airontoolsAPI } from '@configs/api.config';
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatPathName } from '@utils/formatPathName.utils';
import axios from 'axios';

const API_URL = airontoolsAPI + '/subcategories';

export async function updateSubcategoryService(
	id: string,
	subcategoryData: SubcategoryDataToSend,
) {
	try {
		const response = await axios.patch(`${API_URL}/${id}`, {
			...subcategoryData,
			path: formatPathName(subcategoryData.name || ''),
		});
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
