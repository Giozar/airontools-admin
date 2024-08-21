// src/services/familyService.ts

import { airontoolsAPI } from '@configs/api.config';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatPathName } from '@utils/formatPathName.utils';
import axios from 'axios';

interface ValidationError {
	message: string[];
}

const API_URL = airontoolsAPI + '/families';

export const createFamilyService = async (familyData: FamilyDataToSend) => {
	try {
		const response = await axios.post(API_URL, {
			...familyData,
			path: formatPathName(familyData.name),
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
