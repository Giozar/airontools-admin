import axios from 'axios';

import {
	FamilyFrontend,
	transformFamilyDataBack,
} from '@adapters/family.adapter';
import { useState } from 'react';
import { cleanNameURL } from './cleanNameUtil';
import useErrorHandling from './useErrorHandling';
import useSuccessHandling from './useSuccessHandling';

interface ValidationError {
	message: string[];
}

const useFamilyCreate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();
	const [familyId, setFamilyId] = useState<string>('');

	const createFamily = async (familyData: FamilyFrontend) => {
		try {
			const response = await axios.post(
				'http://localhost:4000/families',
				transformFamilyDataBack({
					...familyData,
					path: cleanNameURL(familyData.name),
				}),
			);
			setFamilyId(response.data._id);
			showSuccess('Familia Creada Con Éxito');
			return response.data._id;
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
	return { errorLog, successLog, createFamily, familyId };
};

export default useFamilyCreate;
