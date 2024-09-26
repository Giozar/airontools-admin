import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const deleteUserService = async (userId: string) => {
	try {
		await axios.delete(`${API_URL}/auth/${userId}`);
	} catch (error) {
		throw errorHandler(error);
	}
};
