import { airontoolsAPI } from '@configs/api.config';
import { CategoryDataBackend } from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getCategoriesService() {
	try {
		const response = await axios.get<CategoryDataBackend[]>(
			airontoolsAPI + '/categories',
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
