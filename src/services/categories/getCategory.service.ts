import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { CategoryDataBackend } from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getCategoryService(id: string) {
	try {
		const response = await axios.get<CategoryDataBackend>(
			`${airontoolsAPI}/categories/${id}`,
		);
		return transformCategoryDataToFrontend(response.data);
	} catch (error) {
		throw errorHandler(error);
	}
}
