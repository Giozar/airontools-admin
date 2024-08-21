// src/services/familyApiService.ts

import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export const deleteFamilyService = async (familyId: string) => {
	try {
		await axios.delete(`${airontoolsAPI}/families/${familyId}`);
		await axios.delete(`${airontoolsAPI}/categories/family/${familyId}`);
		await axios.delete(`${airontoolsAPI}/subcategories/family/${familyId}`);
	} catch (error) {
		errorHandler(error);
		throw new Error(`Error al eliminar la familia ${familyId}: ${error}`);
	}
};
