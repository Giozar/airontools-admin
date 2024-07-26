import axios from 'axios';

import {
	SubcategoryFrontend,
	transformSubategoryDataBack,
} from '@adapters/subcategory.adapter';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './common/useErrorHandling';
import useSuccessHandling from './common/useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useSubcategoryCreate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const createSubategory = async (subcategoryData: SubcategoryFrontend) => {
		try {
			const response = await axios.post(
				import.meta.env.VITE_API_URL + '/subcategories',
				transformSubategoryDataBack({
					...subcategoryData,
					path: cleanNameURL(subcategoryData.name),
				}),
			);
			showSuccess('Subcategoria Creada Con Éxito');
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
	return { errorLog, successLog, createSubategory };
};

export default useSubcategoryCreate;
