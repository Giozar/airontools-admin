import { airontoolsAPI } from '@configs/api.config';
import { CategoryDataToSend } from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatPathName } from '@utils/formatPathName.utils';
import axios from 'axios';

export async function updateCategoryRequest(
	id: string,
	categoryData: CategoryDataToSend,
) {
	try {
		await axios.patch(airontoolsAPI + `/categories/${id}`, {
			...categoryData,
			path: formatPathName(categoryData.name),
		});
	} catch (error) {
		errorHandler(error);
	}
}
