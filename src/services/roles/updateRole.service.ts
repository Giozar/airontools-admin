import { airontoolsAPI } from '@configs/api.config';
import { RegisterResponse } from '@interfaces/User.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function updateRoleService(id: string, role: string) {
	try {
		const response = await axios.patch<RegisterResponse>(
			airontoolsAPI + `/auth/${id}`,
			{
				role,
			},
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
