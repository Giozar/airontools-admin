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

const useSubcategoryUpdate = () => {
	const { errorLog: errorLogSubcategory, showError: showErrorSubcategory } =
		useErrorHandling();
	const {
		successLog: successLogSubcategory,
		showSuccess: showSuccessSubcategory,
	} = useSuccessHandling();

	const updateSubategory = async (subcategoryData: SubcategoryFrontend) => {
		try {
			const response = await axios.patch(
				import.meta.env.VITE_API_URL + `/subcategories/${subcategoryData.id}`,
				transformSubategoryDataBack({
					...subcategoryData,
					path: cleanNameURL(subcategoryData.name),
				}),
			);
			showSuccessSubcategory('Subcategoria actualizada Con Éxito');
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
			showErrorSubcategory(message);
		}
	};
	return { errorLogSubcategory, successLogSubcategory, updateSubategory };
};

export default useSubcategoryUpdate;
