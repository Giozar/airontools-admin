import { airontoolsAPI } from '@configs/api.config';
import { CategoryDataBackend } from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getCategories(id: string) {
	try {
		const response = await axios.get<CategoryDataBackend>(
			// ``
			`${airontoolsAPI}/categories/${id}`,
		);
		return response.data;
	} catch (error) {
		errorHandler(error);
	}
}
