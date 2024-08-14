// src/services/subcategoryApiService.ts

import { transformSubcategoryDataToFrontend } from '@adapters/subcategory.adapter';
import {
	SubcategoryDataBackend,
	SubcategoryDataFrontend,
} from '@interfaces/subcategory.interface';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getSubcategoriesService = async (): Promise<
	SubcategoryDataFrontend[]
> => {
	try {
		const response = await axios.get<SubcategoryDataBackend[]>(
			`${API_URL}/subcategories`,
		);
		return response.data.map(transformSubcategoryDataToFrontend);
	} catch (error) {
		throw new Error('Error al cargar las subcategorías: ' + error);
	}
};
