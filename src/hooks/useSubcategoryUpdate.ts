import axios from 'axios';

import {
	SubcategoryFrontend,
	transformSubategoryDataBack,
} from '@src/adapters/subcategory.adapter';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './useErrorHandling';
import useSuccessHandling from './useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useSubcategoryUpdate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const updateSubategory = async (subcategoryData: SubcategoryFrontend) => {
		try {
			const response = await axios.post(
				`http://localhost:4000/categories/${subcategoryData.id}`,
				transformSubategoryDataBack({
					...subcategoryData,
					path: cleanNameURL(subcategoryData.name),
				}),
			);
			showSuccess('Subcategoria actualizada Con Éxito');
			return response.data;
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
	return { errorLog, successLog, updateSubategory };
};

export default useSubcategoryUpdate;
