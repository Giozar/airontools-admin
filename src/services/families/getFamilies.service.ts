// services/familyService.ts
import { transformFamilyDataToFrontend } from '@adapters/family.adapter';
import {
	FamilyDataBackend,
	FamilyDataFrontend,
} from '@interfaces/Family.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/families';

export async function getFamiliesService(): Promise<FamilyDataFrontend[]> {
	try {
		const response = await axios.get<FamilyDataBackend[]>(API_URL);
		return response.data.map(transformFamilyDataToFrontend);
	} catch (error) {
		errorHandler(error);
		throw new Error('Failed to fetch families');
	}
}
