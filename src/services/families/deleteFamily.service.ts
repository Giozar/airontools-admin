// src/services/familyApiService.ts

import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export const deleteFamilyService = async (familyId: string) => {
	try {
		await axios.delete(`${airontoolsAPI}/families/${familyId}`);
	} catch (error) {
		throw errorHandler(error);
	}
};
