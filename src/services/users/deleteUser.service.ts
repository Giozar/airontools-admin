import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const deleteUserService = async (userId: string) => {
	try {
		await axios.delete(`${API_URL}/auth/${userId}`);
	} catch (error) {
		throw new Error('Error al eliminar el usuario: ' + error);
	}
};
