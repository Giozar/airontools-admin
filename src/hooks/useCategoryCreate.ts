import axios from 'axios';

import {
	CategoryFrontend,
	transformCategoryDataBack,
} from '@adapters/category.adapter';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './common/useErrorHandling';
import useSuccessHandling from './common/useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useCategoryCreate = () => {
	const {
		errorLog: errorLogCategoryCreate,
		showError: showErrorCategoryCreate,
	} = useErrorHandling();
	const {
		successLog: successLogCategoryCreate,
		showSuccess: showSuccessCategoryCreate,
	} = useSuccessHandling();

	const createCategory = async (categoryData: CategoryFrontend) => {
		try {
			const response = await axios.post(
				import.meta.env.VITE_API_URL + '/categories',
				transformCategoryDataBack({
					...categoryData,
					path: cleanNameURL(categoryData.name),
				}),
			);
			showSuccessCategoryCreate('Categoria Creada Con Éxito');
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
			showErrorCategoryCreate(message);
			console.log(message);
		}
	};
	return { errorLogCategoryCreate, successLogCategoryCreate, createCategory };
};

export default useCategoryCreate;
