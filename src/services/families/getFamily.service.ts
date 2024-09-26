import { transformFamilyDataToFrontend } from '@adapters/family.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { FamilyDataBackend } from '@interfaces/Family.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getFamilyService(id: string) {
	try {
		const response = await axios.get<FamilyDataBackend>(
			`${airontoolsAPI}/families/${id}`,
		);
		return transformFamilyDataToFrontend(response.data);
	} catch (error) {
		errorHandler(error);
	}
}
