import { transformUserData } from '@adapters/user.adapter';
import {
	RegisterResponse,
	sendingUserData,
	UserDataFrontend,
} from '@interfaces/User.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export default async function createUser(
	userData: sendingUserData,
): Promise<UserDataFrontend> {
	try {
		const response = await axios.post<RegisterResponse>(
			`${import.meta.env.VITE_API_URL}/auth`,
			userData,
		);
		const userCreated = transformUserData(response.data.user);
		return userCreated;
	} catch (error) {
		errorHandler(error);
		// Lanzamos un error para asegurar que la función siempre devuelve un valor.
		throw new Error('Failed to create user');
	}
}
