import { transformUserDataFront } from '@adapters/user.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { UserDataBackend, UserDataFrontend } from '@interfaces/User.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getUsers(): Promise<UserDataFrontend[]> {
	try {
		const response = await axios.get<UserDataBackend[]>(
			`${airontoolsAPI}/auth`,
		);
		const transformedUsers = response.data.map(user =>
			transformUserDataFront(user),
		);
		return transformedUsers;
	} catch (error) {
		errorHandler(error);
		return [];
	}
}
