import { CategoryDataBackend } from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getCategories() {
	try {
		const response = await axios.get<CategoryDataBackend[]>(
			import.meta.env.VITE_API_URL + '/categories',
		);
		return response.data;
	} catch (error) {
		errorHandler(error);
	}
}
