import axios from 'axios';
import useErrorHandling from './useErrorHandling';
import useSuccessHandling from './useSuccessHandling';
interface FamilyData {
	name: string;
	description: string;
	createdBy: string;
}

interface ValidationError {
	message: string[];
}

const useFamilyCreate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const createFamily = async (familyData: FamilyData) => {
		try {
			await axios.post('http://localhost:4000/families', familyData);
			showSuccess('Familia Creada Con Éxito');
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
	return { errorLog, successLog, createFamily };
};

export default useFamilyCreate;
