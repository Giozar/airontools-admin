import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function deleteCategoryService(id: string) {
	try {
		await axios.delete(airontoolsAPI + `/categories/${id}`);
	} catch (error) {
		throw errorHandler(error);
	}
}
