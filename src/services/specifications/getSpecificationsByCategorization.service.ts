import { transformSpecDataToFrontend } from '@adapters/specifications.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	SpecDataBackend,
	SpecDataFrontend,
} from '@interfaces/Specifications.interface';
import axios from 'axios';

export const getSpecificationsByFamilyId = async (
	familyId: string,
): Promise<SpecDataFrontend[]> => {
	try {
		const response = await axios.get<SpecDataBackend[]>(
			airontoolsAPI + `/specifications/family/${familyId}`,
		);
		const specifications = response.data;
		return specifications.map(specification =>
			transformSpecDataToFrontend(specification),
		);
	} catch (error) {
		console.error('Error al buscar especificaciones por familia', error);
		throw error;
	}
};

export const getSpecificationsByCategoryId = async (
	categoryId: string,
): Promise<SpecDataFrontend[]> => {
	try {
		const response = await axios.get<SpecDataBackend[]>(
			airontoolsAPI + `/specifications/category/${categoryId}`,
		);
		const specifications = response.data;
		return specifications.map(specification =>
			transformSpecDataToFrontend(specification),
		);
	} catch (error) {
		console.error('Error al buscar especificaciones por categoría', error);
		throw error;
	}
};

export const getSpecificationsBySubcategoryId = async (
	subcategoryId: string,
): Promise<SpecDataFrontend[]> => {
	try {
		const response = await axios.get<SpecDataBackend[]>(
			airontoolsAPI + `/specifications/subcategory/${subcategoryId}`,
		);
		const specifications = response.data;
		return specifications.map(specification =>
			transformSpecDataToFrontend(specification),
		);
	} catch (error) {
		console.error('Error al buscar especificaciones por subcategoría', error);
		throw error;
	}
};
