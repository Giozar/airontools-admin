// services/subcategoryService.ts
import { SubcategoryDataToSend } from '@interfaces/subcategory.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatPathName } from '@utils/formatPathName.utils';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/subcategories';

export async function updateSubcategory(
	subcategoryData: SubcategoryDataToSend,
) {
	try {
		const response = await axios.patch(`${API_URL}/${subcategoryData._id}`, {
			...subcategoryData,
			path: formatPathName(subcategoryData.name),
		});
		return response.data;
	} catch (error) {
		errorHandler(error);
	}
}