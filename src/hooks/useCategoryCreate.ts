import axios from 'axios';

import {
	CategoryFrontend,
	transformCategoryDataBack,
} from '@adapters/category.adapter';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './useErrorHandling';
import useSuccessHandling from './useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useCategoryCreate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const createCategory = async (categoryData: CategoryFrontend) => {
		try {
			const response = await axios.post(
				'http://localhost:4000/categories',
				transformCategoryDataBack({
					...categoryData,
					path: cleanNameURL(categoryData.name),
				}),
			);
			showSuccess('Categoria Creada Con Éxito');
			return response.data;
		} catch (error) {
			if (!axios.isAxiosError<ValidationError>(error)) {
				console.error('Registration failed', error);
				throw error;
			}
			if (!error.response) return;
			console.log(error);
			const errorMessage = error.response.data.message;
			const message = Array.isArray(errorMessage)
				? errorMessage.join(', ')
				: errorMessage;
			showError(message);
		}
	};
	return { errorLog, successLog, createCategory };
};

export default useCategoryCreate;
