import axios from 'axios';

import {
	CategoryFrontend,
	transformCategoryDataBack,
} from '@src/adapters/category.adapter';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './useErrorHandling';
import useSuccessHandling from './useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useCategoryUpdate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const updateCategory = async (categoryData: CategoryFrontend) => {
		try {
			await axios.patch(
				`http://localhost:4000/categories/${categoryData.id}`,
				transformCategoryDataBack({
					...categoryData,
					path: cleanNameURL(categoryData.name),
				}),
			);
			showSuccess('Categoria actualizada Con Éxito');
		} catch (error) {
			if (!axios.isAxiosError<ValidationError>(error)) {
				console.error('Registration failed', error);
				return;
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
	return { errorLog, successLog, updateCategory };
};

export default useCategoryUpdate;
