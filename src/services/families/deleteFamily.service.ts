// src/services/familyApiService.ts

import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const deleteFamilyService = async (familyId: string) => {
	try {
		await axios.delete(`${API_URL}/families/${familyId}`);
		await axios.delete(`${API_URL}/categories/family/${familyId}`);
		await axios.delete(`${API_URL}/subcategories/family/${familyId}`);
	} catch (error) {
		errorHandler(error);
		throw new Error(`Error al eliminar la familia ${familyId}: ${error}`);
	}
};
