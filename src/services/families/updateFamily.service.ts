import { airontoolsAPI } from '@configs/api.config';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatPathName } from '@utils/formatPathName.utils';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const updateFamilyService = async (familyData: FamilyDataToSend) => {
	try {
		await axios.patch(`${API_URL}/families/${familyData._id}`, {
			...familyData,
			path: formatPathName(familyData.name),
		});
	} catch (error) {
		errorHandler(error);
		throw new Error(
			`Error al actualizar la familia ${familyData._id}: ${error}`,
		);
	}
};
