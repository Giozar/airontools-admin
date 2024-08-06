import { CategoryDataToSend } from '@interfaces/Category.interface';
import axios from 'axios';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './common/useErrorHandling';
import useSuccessHandling from './common/useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useCategoryUpdate = () => {
	const { errorLog: errorLogCategory, showError: showErrorCategory } =
		useErrorHandling();
	const { successLog: successLogCategory, showSuccess: showSuccessCategory } =
		useSuccessHandling();

	const updateCategory = async (categoryData: CategoryDataToSend) => {
		try {
			await axios.patch(
				import.meta.env.VITE_API_URL + `/categories/${categoryData._id}`,
				{
					...categoryData,
					path: cleanNameURL(categoryData.name),
				},
			);
			showSuccessCategory('Categoria actualizada Con Éxito');
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
			showErrorCategory(message);
		}
	};
	return { errorLogCategory, successLogCategory, updateCategory };
};

export default useCategoryUpdate;
