import { airontoolsAPI } from '@configs/api.config';
import { RoleDataSend } from '@interfaces/Role.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function createRoleService(role: RoleDataSend) {
	try {
		const response = await axios.post(airontoolsAPI + '/roles/create', {
			...role,
		});
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
