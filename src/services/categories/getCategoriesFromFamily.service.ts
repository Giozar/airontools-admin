// src/services/categoryApiService.ts

import { CategoryDataBackend } from '@interfaces/Category.interface';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getCategoriesFromFamilyService = async (familyId: string) => {
	try {
		const response = await axios.get<CategoryDataBackend[]>(
			`${API_URL}/categories?family=${familyId}`,
		);
		return response.data;
	} catch (error) {
		throw new Error('Error al cargar las categorías: ' + error);
	}
};
