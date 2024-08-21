import { transformUserDataFront } from '@adapters/user.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	RegisterResponse,
	UserDataFrontend,
	UserDataSend,
} from '@interfaces/User.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export default async function createUser(
	userData: UserDataSend,
): Promise<UserDataFrontend> {
	try {
		const response = await axios.post<RegisterResponse>(
			`${airontoolsAPI}/auth`,
			userData,
		);
		const userCreated = transformUserDataFront(response.data.user);
		return userCreated;
	} catch (error) {
		errorHandler(error);
		// Lanzamos un error para asegurar que la función siempre devuelve un valor.
		throw new Error('Failed to create user');
	}
}
