import { CategoryDataToSend } from '@interfaces/Category.interface';
import { ValidationError } from '@interfaces/User.interface';
import { formatString } from '@utils/formatString.utils';
import axios from 'axios';

export async function createCategoryRequest(categoryData: CategoryDataToSend) {
	try {
		const response = await axios.post(
			import.meta.env.VITE_API_URL + '/categories',
			{
				...categoryData,
				path: formatString(categoryData.name),
			},
		);
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

		console.log(message);
	}
}
