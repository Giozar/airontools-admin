import axios from 'axios';

import {
	FamilyFrontend,
	transformFamilyDataBack,
} from '@adapters/family.adapter';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './common/useErrorHandling';
import useSuccessHandling from './common/useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useFamilyUpdate = () => {
	const { errorLog: errorLogFamily, showError: showErrorFamily } =
		useErrorHandling();
	const { successLog: successLogFamily, showSuccess: showSuccessFamily } =
		useSuccessHandling();

	const updateFamily = async (familyData: FamilyFrontend) => {
		try {
			await axios.patch(
				import.meta.env.VITE_API_URL + `/families/${familyData.id}`,
				transformFamilyDataBack({
					...familyData,
					path: cleanNameURL(familyData.name),
				}),
			);
			showSuccessFamily('Familia Actualizada Con Éxito');
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
			showErrorFamily(message);
		}
	};
	return { errorLogFamily, successLogFamily, updateFamily };
};

export default useFamilyUpdate;
