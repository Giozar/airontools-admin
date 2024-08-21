import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function deleteCategory(id: string) {
	try {
		await axios
			.delete(airontoolsAPI + `/categories/${id}`)
			.then(
				await axios.delete(airontoolsAPI + `/subcategories/category/${id}`),
			);
		// console.log(`${id} eliminado correctamente.`);
	} catch (error) {
		errorHandler(error);
	}
}
