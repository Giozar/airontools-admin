import { FamilyDataToSend } from '@interfaces/Family.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { formatString } from '@utils/formatString.utils';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const updateFamilyService = async (familyData: FamilyDataToSend) => {
	try {
		await axios.patch(`${API_URL}/families/${familyData._id}`, {
			...familyData,
			path: formatString(familyData.name),
		});
	} catch (error) {
		errorHandler(error);
		throw new Error(
			`Error al actualizar la familia ${familyData._id}: ${error}`,
		);
	}
};
