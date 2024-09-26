import { transformUserDataFront } from '@adapters/user.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { UserDataBackend } from '@interfaces/User.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getUserService(id: string) {
	try {
		const response = await axios.get<UserDataBackend>(
			`${airontoolsAPI}/auth/${id}`,
		);
		return transformUserDataFront(response.data);
	} catch (error) {
		throw errorHandler(error);
	}
}
