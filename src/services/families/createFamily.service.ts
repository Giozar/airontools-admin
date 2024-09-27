// src/services/familyService.ts

import { airontoolsAPI } from '@configs/api.config';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatPathName } from '@utils/formatPathName.utils';
import axios from 'axios';

export const createFamilyService = async (familyData: FamilyDataToSend) => {
	try {
		const response = await axios.post(`${airontoolsAPI}/families`, {
			...familyData,
			path: formatPathName(familyData.name || ''),
		});
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
};
