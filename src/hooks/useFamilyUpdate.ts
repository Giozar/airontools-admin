import axios from 'axios';

import {
	FamilyFrontend,
	transformFamilyDataBack,
} from '@src/adapters/family.adapter';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './useErrorHandling';
import useSuccessHandling from './useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useFamilyUpdate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const updateFamily = async (familyData: FamilyFrontend) => {
		try {
			await axios.patch(
				`http://localhost:4000/families/${familyData.id}`,
				transformFamilyDataBack({
					...familyData,
					path: cleanNameURL(familyData.name),
				}),
			);
			showSuccess('Familia Actualizada Con Éxito');
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
	return { errorLog, successLog, updateFamily };
};

export default useFamilyUpdate;
