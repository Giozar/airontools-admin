import { airontoolsAPI } from '@configs/api.config';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const updateFamilyService = async (
	id: string | undefined,
	familyData: FamilyDataToSend,
) => {
	try {
		if (!id) throw new Error('No hay familia válida que editar');

		await axios.patch(`${API_URL}/families/${id}`, {
			...familyData,
		});
	} catch (error) {
		throw errorHandler(error);
	}
};
