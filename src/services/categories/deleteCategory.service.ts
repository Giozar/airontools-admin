import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function deleteCategory(id: string) {
	try {
		await axios
			.delete(import.meta.env.VITE_API_URL + `/categories/${id}`)
			.then(
				await axios.delete(
					import.meta.env.VITE_API_URL + `/subcategories/category/${id}`,
				),
			);
		// console.log(`${id} eliminado correctamente.`);
	} catch (error) {
		errorHandler(error);
	}
}
