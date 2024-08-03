import { transformUserData } from '@adapters/user.adapter';
import { UserDataBackend, UserDataFrontend } from '@interfaces/User.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getUsers(): Promise<UserDataFrontend[]> {
	try {
		const response = await axios.get<UserDataBackend[]>(
			`${import.meta.env.VITE_API_URL}/auth`,
		);
		const transformedUsers = response.data.map(user => transformUserData(user));
		return transformedUsers;
	} catch (error) {
		errorHandler(error);
		return [];
	}
}
