import { transformUserDataFront } from '@adapters/user.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	RegisterResponse,
	UserDataFrontend,
	UserDataSend,
} from '@interfaces/User.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export default async function createUserService(
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
		throw errorHandler(error);
	}
}
