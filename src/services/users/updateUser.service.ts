// src/services/userApiService.ts

import { airontoolsAPI } from '@configs/api.config';
import { UserDataSend } from '@interfaces/User.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const updateUserService = async (
	userId: string,
	userData: UserDataSend,
) => {
	try {
		const response = await axios.patch(`${API_URL}/auth/${userId}`, userData);
		return response.data;
	} catch (error) {
		errorHandler(error);
	}
};
