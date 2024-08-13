// src/services/familyService.ts

import { FamilyDataToSend } from '@interfaces/Family.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatString } from '@utils/formatString.utils';
import axios from 'axios';

interface ValidationError {
	message: string[];
}

const API_URL = import.meta.env.VITE_API_URL + '/families';

export const createFamilyService = async (familyData: FamilyDataToSend) => {
	try {
		const response = await axios.post(API_URL, {
			...familyData,
			path: formatString(familyData.name),
		});
		return response.data;
	} catch (error) {
		errorHandler(error);
		if (!axios.isAxiosError<ValidationError>(error)) {
			console.error('Request failed', error);
			throw error;
		}
		if (!error.response) {
			throw new Error('No response from server');
		}
		const errorMessage = error.response.data.message;
		const message = Array.isArray(errorMessage)
			? errorMessage.join(', ')
			: errorMessage;
		throw new Error(message);
	}
};
