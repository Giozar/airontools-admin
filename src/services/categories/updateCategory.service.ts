import { airontoolsAPI } from '@configs/api.config';
import { CategoryDataToSend } from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function updateCategoryService(
	id: string,
	categoryData: CategoryDataToSend,
) {
	try {
		const response = await axios.patch(airontoolsAPI + `/categories/${id}`, {
			...categoryData,
		});
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
