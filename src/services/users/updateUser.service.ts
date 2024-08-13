// src/services/userApiService.ts

import { UserDataSend } from '@interfaces/User.interface';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const updateUserService = async (
	userId: string,
	userData: UserDataSend,
) => {
	try {
		const response = await axios.patch(`${API_URL}/auth/${userId}`, userData);
		return response.data;
	} catch (error) {
		throw new Error('Error al actualizar el usuario: ' + error);
	}
};
