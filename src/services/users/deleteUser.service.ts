import { airontoolsAPI } from '@configs/api.config';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const deleteUserService = async (userId: string) => {
	try {
		await axios.delete(`${API_URL}/auth/${userId}`);
	} catch (error) {
		throw new Error('Error al eliminar el usuario: ' + error);
	}
};
